const DIContainer = require("appDIContainer");
const Injectables = require("injectables");
const Invoker = DIContainer.get(Injectables.INVOKER);
const BoardService = DIContainer.get(Injectables.BOARD_SERVICE);
const AddBoardCmd = DIContainer.get(Injectables.ADD_BOARD_CMD);
const CloseBoardCmd = DIContainer.get(Injectables.CLOSE_BOARD_CMD);
const OpenBoardCmd = DIContainer.get(Injectables.OPEN_BOARD_CMD);
const DeleteBoardCmd = DIContainer.get(Injectables.DELETE_BOARD_CMD);
const Security = DIContainer.get(Injectables.SECURITY);

async function getAll(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await BoardService.getAll());
    } catch (err) {
        return next(err);
    }
}

async function getAllOpen(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await BoardService.getAllOpen());
    } catch (err) {
        return next(err);
    }
}

async function getAllClosed(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await BoardService.getAllClosed());
    } catch (err) {
        return next(err);
    }
}

async function get(req, res, next) {
    try {
        await Security.validateSecurity(req, [Security.PERMISSIONS.BOARDS_GET]);

        return res.json(await BoardService.get(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
}

async function add(req, res, next) {
    try {
        await Security.validateSecurity(req, [Security.PERMISSIONS.BOARDS_ADD]);

        const cmd = AddBoardCmd(req.swagger.params.body.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function open(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_OPEN
        ]);

        const cmd = OpenBoardCmd(req.swagger.params.id.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function close(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_CLOSE
        ]);

        const cmd = CloseBoardCmd(req.swagger.params.id.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function del(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_DELETE
        ]);

        const cmd = DeleteBoardCmd(req.swagger.params.id.value);
        return res.json(await Invoker.run(cmd));
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_UPDATE
        ]);

        return res.json(
            await BoardService.update({
                board: req.swagger.params.body.value,
                boardId: req.swagger.params.id.value
            })
        );
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
