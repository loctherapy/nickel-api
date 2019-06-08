const User = require("../user/user.service");
const security = require("./../security");

module.exports.signIn = function(req, res, next) {
    const email = req.swagger.params.body.value.email;
    const password = req.swagger.params.body.value.password;
    User.signIn(email, password)
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            return next(err);
        });
};

module.exports.validateToken = async function(req, res, next) {
    try {
        return res.status(200).json(await security.validateToken(req));
    } catch (err) {
        return next(err);
    }
};

module.exports.getProfile = async function(req, res, next) {
    try {
        const user = await security.validateSecurity(req);
        user.permissions = await security.getAllUserPermissions({
            request: req
        });
        return res.json(user);
    } catch (err) {
        return next(err);
    }
};

module.exports.validateRecoverPwdToken = async function(req, res, next) {
    try {
        const rpt = req.swagger.params.body.value.recoverPwdToken;
        const result = await User.validateRecoveryPwdToken(rpt);
        return res.json(result);
    } catch (err) {
        return next(err);
    }
};

module.exports.setPassword = async function(req, res, next) {
    try {
        const rpt = req.swagger.params.body.value.recoverPwdToken;
        const password = req.swagger.params.body.value.password;
        const result = await User.setPassword(rpt, password);
        return res.json(result);
    } catch (err) {
        return next(err);
    }
};

module.exports.get = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [security.PERMISSIONS.USERS_GET]);

        return res.json(await User.get(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
};

module.exports.getAllUsers = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.USERS_GET_ALL
        ]);

        return res.json(await User.getAllUsers());
    } catch (err) {
        return next(err);
    }
};

module.exports.getActiveUsers = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.USERS_GET_ALL
        ]);

        return res.json(await User.getActiveUsers());
    } catch (err) {
        return next(err);
    }
};

module.exports.getArchivedUsers = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.USERS_GET_ALL
        ]);

        return res.json(await User.getArchivedUsers());
    } catch (err) {
        return next(err);
    }
};

module.exports.getAllAvailableUserRoles = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.USERS_GET_ALL_AVAILABLE_USER_ROLES
        ]);

        return res.json(await User.getAllAvailableUserRoles());
    } catch (err) {
        return next(err);
    }
};

module.exports.activate = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.USERS_ACTIVATE
        ]);

        return res.json(await User.activate(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
};

module.exports.archive = async function(req, res, next) {
    try {
        const user = await security.validateSecurity(
            req,
            [security.PERMISSIONS.USERS_ARCHIVE],
            true
        );
        const userToArchiveId = req.swagger.params.id.value;

        if (user._id.toString() === userToArchiveId) {
            throw Error(`User can't archive oneself`);
        }

        return res.json(await User.archive(userToArchiveId));
    } catch (err) {
        return next(err);
    }
};

module.exports.add = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [security.PERMISSIONS.USERS_ADD]);

        return res.json(await User.add(req.swagger.params.body.value));
    } catch (err) {
        return next(err);
    }
};

module.exports.update = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.USERS_UPDATE
        ]);

        return res.json(
            await User.update(
                req.swagger.params.id.value,
                req.swagger.params.body.value
            )
        );
    } catch (err) {
        return next(err);
    }
};

module.exports.delete = async function(req, res, next) {
    try {
        const user = await security.validateSecurity(
            req,
            [security.PERMISSIONS.USERS_DELETE],
            true
        );
        const userToArchiveId = req.swagger.params.id.value;

        if (user._id.toString() === userToArchiveId) {
            throw Error(`User can't delete oneself`);
        }

        return res.json(await User.delete(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
};
