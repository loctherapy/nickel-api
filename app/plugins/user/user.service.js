const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

let User,
    SecuritySettings,
    SecurityService,
    PasswordSecret,
    PredefinedRoles,
    ResponseMessages;

function signIn(email, password) {
    return new Promise((resolve, reject) => {
        // Check arguments
        if (!email) {
            return reject(ResponseMessages.argumentShouldNotBeEmpty("email"));
        }

        if (!password) {
            return reject(
                ResponseMessages.argumentShouldNotBeEmpty("password")
            );
        }

        User.findOne(
            {
                email: email
            },
            function(err, user) {
                if (err) throw err;

                if (!user) {
                    return reject(
                        ResponseMessages.authenticationFailed(
                            `user with email ${email} not found`
                        )
                    );
                }

                if (!user.isActive) {
                    return reject(
                        ResponseMessages.authenticationFailed(
                            `user with email ${email} is archived`
                        )
                    );
                }

                // check if password matches
                user.comparePassword(password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        let expires = SecurityService.getExpirationDate();
                        let token = jwt.encode(
                            {
                                email: user.email,
                                expires: expires.toISOString(),
                                _id: user._id
                            },
                            PasswordSecret
                        );
                        // return the information including token as JSON
                        return resolve({
                            token: "JWT " + token,
                            expires: expires,
                            roles: user.roles
                        });
                    } else {
                        return reject(
                            ResponseMessages.authenticationFailed(
                                `wrong password`
                            )
                        );
                    }
                });
            }
        );
    });
}

function validateRecoveryPasswordToken(token) {
    return new Promise((resolve, reject) => {
        try {
            const tokenDecoded = jwt.decode(token, PasswordSecret);
            const email = tokenDecoded.email;
            const expires = tokenDecoded.expires;
            const expiresParsed = Date.parse(expires);

            // Validate email and expires - if they are empty
            if (!email || !expires || isNaN(expiresParsed)) {
                return reject(ResponseMessages.tokenIsNotValid());
            }

            // Validate if the token is expired
            if (new Date() > expiresParsed) {
                return reject(
                    ResponseMessages.tokenIsExpired(new Date(expiresParsed))
                );
            }

            return resolve({
                email: email,
                expires: expiresParsed,
                message: "Token is valid"
            });
        } catch (e) {
            return reject(ResponseMessages.tokenIsNotValid());
        }
    });
}

function validateRecoveryPwdToken(recoverPwdToken) {
    return new Promise((resolve, reject) => {
        validateRecoveryPasswordToken(recoverPwdToken)
            .then(res => {
                // Ok then, let's verify the token by email

                User.findOne({ email: res.email })
                    .lean()
                    .exec((err, user) => {
                        if (err || !user) {
                            return reject(ResponseMessages.tokenIsNotValid());
                        }

                        delete user.password;

                        return resolve(user);
                    });
            })
            .catch(err => {
                return reject(err);
            });
    });
}

function generatePasswordHash(email, password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return reject(ResponseMessages.cannotResetPassword(email));
            }

            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    return reject(ResponseMessages.cannotResetPassword(email));
                }

                return resolve(hash);
            });
        });
    });
}

function setPassword(token, password) {
    return new Promise((resolve, reject) => {
        validateRecoveryPasswordToken(token)
            .then(res => {
                User.findOne({ email: res.email }).exec(async (err, user) => {
                    if (err || !user) {
                        return reject(
                            ResponseMessages.cannotResetPassword(res.email)
                        );
                    }

                    const passwordHash = await generatePasswordHash(
                        res.email,
                        password
                    );

                    User.findOneAndUpdate(
                        { email: user.email },
                        { $set: { password: passwordHash } },
                        err3 => {
                            if (err3) {
                                return reject(
                                    ResponseMessages.cannotResetPassword(
                                        res.email
                                    )
                                );
                            }

                            return resolve(true);
                        }
                    );
                });
            })
            .catch(err => {
                return reject(err);
            });
    });
}

function get(id) {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id })
            .lean()
            .exec((err, user) => {
                if (err) {
                    return reject(err);
                }
                // remove password
                delete user.password;
                return resolve(user);
            });
    });
}

function getUsers(query) {
    return new Promise((resolve, reject) => {
        User.find(query)
            .sort({ name: 1 })
            .lean()
            .exec((err, users) => {
                if (err) {
                    return reject(err);
                }
                // Alright, we have to erase passwords before returning it
                for (let i = 0; i < users.length; i++) {
                    delete users[i].password;
                }

                return resolve(users);
            });
    });
}

function getAllUsers() {
    return getUsers({});
}

function getActiveUsers() {
    return getUsers({ isActive: true });
}

function getArchivedUsers() {
    return getUsers({ isActive: false });
}

function getAllAvailableUserRoles() {
    return new Promise(resolve => {
        let allAvailableRoles = [];

        for (let property in SecuritySettings.ROLES) {
            if (SecuritySettings.ROLES.hasOwnProperty(property)) {
                allAvailableRoles.push(property);
            }
        }

        resolve(allAvailableRoles);
    });
}

function activate(id) {
    return User.findOneAndUpdate(
        { _id: id },
        { $set: { isActive: true } },
        { new: true }
    );
}

function performIfTheEmailIsInTheListOfPredefinedAdmins(email) {
    if (PredefinedRoles.admins.map(a => a.email).includes(email)) {
        throw Error(`Can't archive predefined admins`);
    }
}

async function archive(id) {
    const user = await User.findOne({ _id: id });

    performIfTheEmailIsInTheListOfPredefinedAdmins(user.email);

    return User.findOneAndUpdate(
        { _id: id },
        { $set: { isActive: false } },
        { new: true }
    );
}

async function add(obj) {
    // Patching isActive property
    obj.isActive = true;

    const user = new User(obj);
    return await user.save();
}

async function update(id, obj) {
    if (obj.password) {
        obj.password = await generatePasswordHash(obj.email, obj.password);
    }

    return await User.findOneAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
    );
}

async function del(id) {
    const user = await User.findOne({ _id: id });

    performIfTheEmailIsInTheListOfPredefinedAdmins(user.email);

    return User.deleteOne({ _id: id });
}

module.exports = (
    userModel,
    securitySettings,
    securityService,
    passwordSecret,
    predefinedRoles,
    responseMessages
) => {
    User = userModel;
    SecuritySettings = securitySettings;
    SecurityService = securityService;
    PasswordSecret = passwordSecret;
    PredefinedRoles = predefinedRoles;
    ResponseMessages = responseMessages;

    return {
        signIn,
        validateRecoveryPwdToken,
        setPassword,
        get,
        getUsers,
        getAllUsers,
        getActiveUsers,
        getArchivedUsers,
        getAllAvailableUserRoles,
        activate,
        archive,
        add,
        update,
        delete: del
    };
};
