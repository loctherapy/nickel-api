const DIContainer = require("appDIContainer");
const Injectables = require("injectables");
const Invoker = DIContainer.get(Injectables.INVOKER);
const SecuritySettings = DIContainer.get(Injectables.SECURITY_SETTINGS);
const SECURITY_MODULE_TOKENS = DIContainer.get(Injectables.SECURITY_MODULE)
    .TOKENS;
const SecurityService = DIContainer.get(
    SECURITY_MODULE_TOKENS.SECURITY_SERVICE
);
const LIST_MODULE_TOKENS = DIContainer.get(Injectables.LIST_MODULE).TOKENS;
const ListService = DIContainer.get(LIST_MODULE_TOKENS.LIST_SERVICE);
const AddListCmd = DIContainer.get(LIST_MODULE_TOKENS.ADD_LIST_CMD);
const CloseListCmd = DIContainer.get(LIST_MODULE_TOKENS.CLOSE_LIST_CMD);
const OpenListCmd = DIContainer.get(LIST_MODULE_TOKENS.OPEN_LIST_CMD);
const DeleteListCmd = DIContainer.get(LIST_MODULE_TOKENS.DELETE_LIST_CMD);
const UpdateListCmd = DIContainer.get(LIST_MODULE_TOKENS.UPDATE_LIST_CMD);

async function getAll(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_GET_ALL
        ]);

        return res.json(await ListService.getAll());
    } catch (err) {
        return next(err);
    }
}

async function getAllOpen(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_GET_ALL
        ]);

        return res.json(await ListService.getAllOpen());
    } catch (err) {
        return next(err);
    }
}

async function getAllClosed(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_GET_ALL
        ]);

        return res.json(await ListService.getAllClosed());
    } catch (err) {
        return next(err);
    }
}

async function get(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_GET
        ]);

        return res.json(await ListService.get(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
}

async function add(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_ADD
        ]);

        const cmd = AddListCmd(req.swagger.params.body.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function open(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_OPEN
        ]);

        const cmd = OpenListCmd(req.swagger.params.id.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function close(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_CLOSE
        ]);

        const cmd = CloseListCmd(req.swagger.params.id.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function del(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_DELETE
        ]);

        const cmd = DeleteListCmd(req.swagger.params.id.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.LISTS_UPDATE
        ]);

        const cmd = UpdateListCmd(
            req.swagger.params.body.value,
            req.swagger.params.id.value
        );

        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getAll,
    getAllOpen,
    getAllClosed,
    get,
    add,
    open,
    close,
    delete: del,
    update
};
