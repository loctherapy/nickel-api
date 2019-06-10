const diContainer = require("./../utils/di/app-di-container");
const Injectables = require("./../utils/di/injectables");
const UserService = diContainer.get(Injectables.USER_SERVICE);
const Security = diContainer.get(Injectables.SECURITY);

function signIn(req, res, next) {
    const email = req.swagger.params.body.value.email;
    const password = req.swagger.params.body.value.password;
    UserService.signIn(email, password)
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            return next(err);
        });
}

async function validateToken(req, res, next) {
    try {
        return res.status(200).json(await Security.validateToken(req));
    } catch (err) {
        return next(err);
    }
}

async function getProfile(req, res, next) {
    try {
        const user = await Security.validateSecurity(req);
        user.permissions = await Security.getAllUserPermissions({
            request: req
        });
        return res.json(user);
    } catch (err) {
        return next(err);
    }
}

async function validateRecoverPwdToken(req, res, next) {
    try {
        const rpt = req.swagger.params.body.value.recoverPwdToken;
        const result = await UserService.validateRecoveryPwdToken(rpt);
        return res.json(result);
    } catch (err) {
        return next(err);
    }
}

async function setPassword(req, res, next) {
    try {
        const rpt = req.swagger.params.body.value.recoverPwdToken;
        const password = req.swagger.params.body.value.password;
        const result = await UserService.setPassword(rpt, password);
        return res.json(result);
    } catch (err) {
        return next(err);
    }
}

async function get(req, res, next) {
    try {
        await Security.validateSecurity(req, [Security.PERMISSIONS.USERS_GET]);

        return res.json(await UserService.get(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
}

async function getAllUsers(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.USERS_GET_ALL
        ]);

        return res.json(await UserService.getAllUsers());
    } catch (err) {
        return next(err);
    }
}

async function getActiveUsers(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.USERS_GET_ALL
        ]);

        return res.json(await UserService.getActiveUsers());
    } catch (err) {
        return next(err);
    }
}

async function getArchivedUsers(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.USERS_GET_ALL
        ]);

        return res.json(await UserService.getArchivedUsers());
    } catch (err) {
        return next(err);
    }
}

async function getAllAvailableUserRoles(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.USERS_GET_ALL_AVAILABLE_USER_ROLES
        ]);

        return res.json(await UserService.getAllAvailableUserRoles());
    } catch (err) {
        return next(err);
    }
}

async function activate(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.USERS_ACTIVATE
        ]);

        return res.json(
            await UserService.activate(req.swagger.params.id.value)
        );
    } catch (err) {
        return next(err);
    }
}

async function archive(req, res, next) {
    try {
        const user = await Security.validateSecurity(
            req,
            [Security.PERMISSIONS.USERS_ARCHIVE],
            true
        );
        const userToArchiveId = req.swagger.params.id.value;

        if (user._id.toString() === userToArchiveId) {
            throw Error(`User can't archive oneself`);
        }

        return res.json(await UserService.archive(userToArchiveId));
    } catch (err) {
        return next(err);
    }
}

async function add(req, res, next) {
    try {
        await Security.validateSecurity(req, [Security.PERMISSIONS.USERS_ADD]);

        return res.json(await UserService.add(req.swagger.params.body.value));
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.USERS_UPDATE
        ]);

        return res.json(
            await UserService.update(
                req.swagger.params.id.value,
                req.swagger.params.body.value
            )
        );
    } catch (err) {
        return next(err);
    }
}

async function del(req, res, next) {
    try {
        const user = await Security.validateSecurity(
            req,
            [Security.PERMISSIONS.USERS_DELETE],
            true
        );
        const userToArchiveId = req.swagger.params.id.value;

        if (user._id.toString() === userToArchiveId) {
            throw Error(`User can't delete oneself`);
        }

        return res.json(await UserService.delete(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    signIn,
    validateToken,
    getProfile,
    validateRecoverPwdToken,
    setPassword,
    get,
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
