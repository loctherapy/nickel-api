const DIContainer = require("appDIContainer");
const Injectables = require("injectables");
const COMMAND_MODULE_TOKENS = DIContainer.get(Injectables.COMMAND_MODULE)
    .TOKENS;
const CommandInvoker = DIContainer.get(COMMAND_MODULE_TOKENS.COMMAND_INVOKER);
const SecuritySettings = DIContainer.get(Injectables.SECURITY_SETTINGS);
const SECURITY_MODULE_TOKENS = DIContainer.get(Injectables.SECURITY_MODULE)
    .TOKENS;
const SecurityService = DIContainer.get(
    SECURITY_MODULE_TOKENS.SECURITY_SERVICE
);
const BOARD_MODULE_TOKENS = DIContainer.get(Injectables.BOARD_MODULE).TOKENS;
const BoardService = DIContainer.get(BOARD_MODULE_TOKENS.BOARD_SERVICE);
const AddBoardCmd = DIContainer.get(BOARD_MODULE_TOKENS.ADD_BOARD_CMD);
const CloseBoardCmd = DIContainer.get(BOARD_MODULE_TOKENS.CLOSE_BOARD_CMD);
const OpenBoardCmd = DIContainer.get(BOARD_MODULE_TOKENS.OPEN_BOARD_CMD);
const DeleteBoardCmd = DIContainer.get(BOARD_MODULE_TOKENS.DELETE_BOARD_CMD);
const UpdateBoardCmd = DIContainer.get(BOARD_MODULE_TOKENS.UPDATE_BOARD_CMD);

async function getAll(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await BoardService.getAll());
    } catch (err) {
        return next(err);
    }
}

async function getAllOpen(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await BoardService.getAllOpen());
    } catch (err) {
        return next(err);
    }
}

async function getAllClosed(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await BoardService.getAllClosed());
    } catch (err) {
        return next(err);
    }
}

async function get(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_GET
        ]);

        return res.json(await BoardService.get(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
}

async function add(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_ADD
        ]);

        const cmd = AddBoardCmd(req.swagger.params.body.value);
        return res.json(await CommandInvoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function open(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_OPEN
        ]);

        const cmd = OpenBoardCmd(req.swagger.params.id.value);
        return res.json(await CommandInvoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function close(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_CLOSE
        ]);

        const cmd = CloseBoardCmd(req.swagger.params.id.value);
        return res.json(await CommandInvoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function del(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_DELETE
        ]);

        const cmd = DeleteBoardCmd(req.swagger.params.id.value);
        return res.json(await CommandInvoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    try {
        await SecurityService.validateSecurity(req, [
            SecuritySettings.PERMISSIONS.BOARDS_UPDATE
        ]);

        const cmd = UpdateBoardCmd(
            req.swagger.params.body.value,
            req.swagger.params.id.value
        );

        return res.json(await CommandInvoker.run(cmd));
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
