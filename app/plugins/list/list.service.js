let List;

async function add(list) {
    const lst = new List(list);
    lst.closed = false;

    return await lst.save();
}

async function open(id) {
    return await List.findOneAndUpdate(
        { _id: id },
        { $set: { closed: false } },
        { new: true }
    );
}

async function close(id) {
    return await List.findOneAndUpdate(
        { _id: id },
        { $set: { closed: true } },
        { new: true }
    );
}

async function update(options) {
    const list = options.list;
    const listId = options.listId;

    delete list._id;

    return await List.findOneAndUpdate(
        { _id: listId },
        { $set: list },
        { new: true }
    );
}

async function del(id) {
    return await List.deleteOne({ _id: id });
}

async function get(id) {
    return await List.findOne({ _id: id });
}

async function getAll() {
    return await List.find();
}

async function getAllOpen() {
    return await List.find({ closed: false });
}

async function getAllClosed() {
    return await List.find({ closed: true });
}

module.exports = listModel => {
    List = listModel;

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
