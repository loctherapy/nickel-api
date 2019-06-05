const Board = require("../dal/models/board");

async function add(board) {
    const brd = new Board(board);
    brd.closed = false;

    return await brd.save();
}

async function activate(id) {
    return await Board.findOneAndUpdate(
        { _id: id },
        { $set: { closed: false } }
    );
}

async function archive(id) {
    return await Board.findOneAndUpdate(
        { _id: id },
        { $set: { closed: true } }
    );
}

async function update(options) {
    const board = options.board;
    const boardId = options.boardId;

    delete board._id;

    return await Board.findOneAndUpdate(
        { _id: boardId },
        { $set: board },
        { new: true }
    );
}

async function del(id) {
    return await Board.deleteOne({ _id: id });
}

async function get(id) {
    return await Board.findOne({ _id: id });
}

async function getAll() {
    return await Board.find();
}

async function getAllOpen() {
    return await Board.find({ closed: false });
}

async function getAllClosed() {
    return await Board.find({ closed: true });
}

module.exports = {
    add,
    activate,
    archive,
    update,
    delete: del,
    get,
    getAll,
    getAllOpen,
    getAllClosed
};
