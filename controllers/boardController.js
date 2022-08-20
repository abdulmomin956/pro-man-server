const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const addBoard = async (req, res) => {
    try {
        await client.connect()
        const boardCollection = client.db("pro-man").collection("board");
        const data = req.body;
        const result = await boardCollection.insertOne(data);
        res.send(result);

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


const getBoards = async (req, res) => {
    const { workspaceID } = req.params;
    try {
        await client.connect()
        const boardCollection = client.db("pro-man").collection("board");
        const result = await boardCollection.find({ workspaceID: workspaceID }).toArray()
        res.send(result)
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const getBoard = async (req, res) => {
    try {
        await client.connect()
        const boardCollection = client.db("pro-man").collection("board");
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        const result = await boardCollection.findOne(filter)
        res.send(result)
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const updateBoard = async (req, res) => {
    try {
        await client.connect()
        const boardCollection = client.db("pro-man").collection("board");
        const id = req.params.id;
        const document = req.body;
        const filter = { _id: ObjectId(id) }
        const upDoc = {
            $set: document
        }
        const result = await boardCollection.updateOne(filter, upDoc)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const deleteBoard = async (req, res) => {
    try {
        await client.connect()
        const boardCollection = client.db("pro-man").collection("board");
        const id = req.params.id;
        console.log(id)
        const filter = { _id: ObjectId(id) }
        const result = await boardCollection.deleteOne(filter)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


module.exports = { addBoard, getBoards, getBoard, updateBoard, deleteBoard }