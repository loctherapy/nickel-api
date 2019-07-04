const jwt = require("jwt-simple");
let User,
    PasswordSecret,
    ResponseMessages,
    SecuritySettings,
    AuthTokenExpiresInMinutes;

function getToken(headers) {
    if (
        headers &&
        headers.authorization &&
        headers.authorization.includes("JWT ")
    ) {
        let parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function getExpirationDate() {
    let now = new Date();
    now.setMinutes(now.getMinutes() + AuthTokenExpiresInMinutes);
    return now;
}

function validateToken(req, skipRejectionOnArchivedUsers = false) {
    return (
        (function basicTokenValidation(req) {
            let token = getToken(req.headers);

            // Local function to verify if the token is expired
            function isTokenExpired(decodedToken) {
                return new Date() >= Date.parse(decodedToken.expires);
            }

            return new Promise((resolve, reject) => {
                // Ok, now let's verify the token
                if (!token) {
                    reject(ResponseMessages.tokenIsNotProvided());
                    return;
                }

                try {
                    let decoded = jwt.decode(token, PasswordSecret);

                    if (isTokenExpired(decoded)) {
                        let tokenExpires = new Date(decoded.expires);
                        reject(ResponseMessages.tokenIsExpired(tokenExpires));
                        return;
                    }

                    resolve({
                        _id: decoded._id,
                        email: decoded.email,
                        expires: decoded.expires
                    });
                } catch (err) {
                    reject(ResponseMessages.tokenIsNotValid());
                }
            });
        })(req)
            // End of Basic validation
            // Now let's verify if that user exists in the DB
            .then(token => {
                return new Promise((resolve, reject) => {
                    User.findOne(
                        {
                            email: token.email
                        },
                        function(err, user) {
                            if (!user || err) {
                                return reject(
                                    ResponseMessages.authenticationFailed(
                                        `user ${token.email} not found`
                                    )
                                );
                            }

                            if (!skipRejectionOnArchivedUsers) {
                                if (!user.isActive) {
                                    return reject(
                                        ResponseMessages.authenticationFailed(
                                            `user ${token.email} is archived`
                                        )
                                    );
                                }
                            }

                            resolve({
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                roles: user.roles,
                                isActive: user.isActive
                            });
                        }
                    );
                });
            })
            .then(user => {
                return new Promise(resolve => {
                    //TODO: lookup company and adjust user to return - user.company._id, user.company.name
                    resolve(user);
                });
            })
    );
}

function getAllRolesIncludingInherited(userRole) {
    let i,
        allRoles = [],
        roleInPermissionsTree;

    roleInPermissionsTree = SecuritySettings.ROLES_PERMISSIONS_MAP.find(
        element => {
            return element.role === userRole;
        }
    );

    if (roleInPermissionsTree) {
        allRoles.push(roleInPermissionsTree.role);

        if (
            roleInPermissionsTree.inherits &&
            roleInPermissionsTree.inherits.length > 0
        ) {
            for (i = 0; i < roleInPermissionsTree.inherits.length; i++) {
                allRoles = allRoles.concat(
                    getAllRolesIncludingInherited(
                        roleInPermissionsTree.inherits[i]
                    )
                );
            }
        }
    }

    return allRoles;
}

function getAllUserRolesIncludingInherited(user) {
    return new Promise((resolve, reject) => {
        if (!user || !user.roles) {
            return reject(
                ResponseMessages.argumentShouldNotBeEmpty(user.roles)
            );
        }

        let i,
            j,
            allRoles = [],
            inheritedRoles;

        for (i = 0; i < user.roles.length; i++) {
            inheritedRoles = getAllRolesIncludingInherited(user.roles[i]);
            for (j = 0; j < inheritedRoles.length; j++) {
                if (!allRoles.includes(inheritedRoles[j])) {
                    allRoles.push(inheritedRoles[j]);
                }
            }
        }

        return resolve(allRoles);
    });
}

function getAllUserPermissions(options) {
    const req = options.request;
    const skipRejectionOnArchivedUsers =
        options.skipRejectionOnArchivedUsers || false;
    let i,
        j,
        rolePermissions,
        userPermissions = [];

    return new Promise((resolve, reject) => {
        validateToken(req, skipRejectionOnArchivedUsers)
            .then(user => {
                // First let's collect all the roles
                return getAllUserRolesIncludingInherited(user);
            })
            .then(allRoles => {
                // Now we can collect permissions
                for (i = 0; i < allRoles.length; i++) {
                    rolePermissions = SecuritySettings.ROLES_PERMISSIONS_MAP.find(
                        element => {
                            return element.role === allRoles[i];
                        }
                    ).permissions;
                    for (j = 0; j < rolePermissions.length; j++) {
                        if (!userPermissions.includes(rolePermissions[j])) {
                            userPermissions.push(rolePermissions[j]);
                        }
                    }
                }

                resolve(userPermissions);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function validateSecurity(
    req,
    requestedPermissions,
    skipRejectionOnArchivedUsers = false
) {
    return validateToken(req, skipRejectionOnArchivedUsers).then(user => {
        return new Promise((resolve, reject) => {
            // If no permissions were put (null || undefined || empty array) then access is granted
            if (
                !requestedPermissions ||
                (Array.isArray(requestedPermissions) &&
                    requestedPermissions.length === 0)
            ) {
                resolve(user);
                return;
            }

            // Then if requested permissions is not in the array, then, just access is NOT granted
            if (!Array.isArray(requestedPermissions)) {
                reject(
                    ResponseMessages.argumentShouldHaveAnotherType(
                        "requestedPermissions",
                        "array"
                    )
                );
                return;
            }

            getAllUserPermissions({
                request: req,
                skipRejectionOnArchivedUsers
            })
                .then(userPermissions => {
                    // Now we checked that it's an array and it's not empty. Let's check if the user has the requested permission
                    // Let's check each requested permission
                    for (let i = 0; i < requestedPermissions.length; i++) {
                        if (
                            !userPermissions.includes(requestedPermissions[i])
                        ) {
                            // if requested permission is not found in user roles, then the whole permission security check fails
                            return reject(
                                ResponseMessages.permissionDenied(
                                    requestedPermissions[i]
                                )
                            );
                        }
                    }

                    // If each requested permission was granted, then the whole permission security check passes
                    resolve(user);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    });
}

module.exports = function(
    userModel,
    passwordSecret,
    responseMessages,
    authTokenExpiresInMinutes,
    securitySettings
) {
    User = userModel;
    PasswordSecret = passwordSecret;
    ResponseMessages = responseMessages;
    AuthTokenExpiresInMinutes = authTokenExpiresInMinutes;
    SecuritySettings = securitySettings;

    return {
        getExpirationDate: getExpirationDate,
        validateToken: validateToken,
        validateSecurity: validateSecurity,
        getAllUserPermissions: getAllUserPermissions
    };
};
