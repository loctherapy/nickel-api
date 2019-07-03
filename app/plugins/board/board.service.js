let Board;

async function add(board) {
    const brd = new Board(board);
    brd.closed = false;

    return await brd.save();
}

async function open(id) {
    return await Board.findOneAndUpdate(
        { _id: id },
        { $set: { closed: false } },
        { new: true }
    );
}

async function close(id) {
    return await Board.findOneAndUpdate(
        { _id: id },
        { $set: { closed: true } },
        { new: true }
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

module.exports = boardModel => {
    Board = boardModel;

    return {
        add,
        open,
        close,
        update,
        delete: del,
        get,
        getAll,
        getAllOpen,
        getAllClosed
    };
};
