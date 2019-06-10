const diContainer = require("./../utils/di/app-di-container");
const Injectables = require("./../utils/di/injectables");
const BoardService = diContainer.get(Injectables.BOARD_SERVICE);
const Security = diContainer.get(Injectables.SECURITY);

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

        return res.json(await BoardService.add(req.swagger.params.body.value));
    } catch (err) {
        return next(err);
    }
}

async function open(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_OPEN
        ]);

        return res.json(await BoardService.open(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
}

async function close(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_CLOSE
        ]);

        return res.json(await BoardService.close(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
}

async function del(req, res, next) {
    try {
        await Security.validateSecurity(req, [
            Security.PERMISSIONS.BOARDS_DELETE
        ]);

        return res.json(await BoardService.delete(req.swagger.params.id.value));
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
