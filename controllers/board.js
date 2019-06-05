const Board = require("../services/board");
const security = require("../security");

exports.getAll = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await Board.getAll());
    } catch (err) {
        return next(err);
    }
};

exports.getAllOpen = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await Board.getAllOpen());
    } catch (err) {
        return next(err);
    }
};

exports.getAllClosed = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.BOARDS_GET_ALL
        ]);

        return res.json(await Board.getAllClosed());
    } catch (err) {
        return next(err);
    }
};

exports.get = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [security.PERMISSIONS.BOARDS_GET]);

        return res.json(await Board.get(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
};

exports.add = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [security.PERMISSIONS.BOARDS_ADD]);

        return res.json(await Board.add(req.swagger.params.body.value));
    } catch (err) {
        return next(err);
    }
};

exports.activate = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.BOARDS_ACTIVATE
        ]);

        return res.json(await Board.activate(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
};

exports.archive = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.BOARDS_ARCHIVE
        ]);

        return res.json(await Board.archive(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
};

exports.delete = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.BOARDS_DELETE
        ]);

        return res.json(await Board.delete(req.swagger.params.id.value));
    } catch (err) {
        return next(err);
    }
};

exports.update = async function(req, res, next) {
    try {
        await security.validateSecurity(req, [
            security.PERMISSIONS.BOARDS_UPDATE
        ]);

        return res.json(
            await Board.update({
                board: req.swagger.params.body.value,
                boardId: req.swagger.params.id.value
            })
        );
    } catch (err) {
        return next(err);
    }
};
