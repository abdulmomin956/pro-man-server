const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const addWorkspace = async (req, res) => {
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const { title, type, description, email } = req.body;
        if (!title || !type || !email) return res.sendStatus(401);
        const result = await workspaceCollection.insertOne({ title, type, description, email });
        res.send(result);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


const getWorkspaces = async (req, res) => {
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const result = await workspaceCollection.find({}).toArray()
        res.send(result)
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const getWorkspace = async (req, res) => {
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        const result = await workspaceCollection.findOne(filter)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const updateWorkspace = async (req, res) => {
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const id = req.params.id;
        const document = req.body;
        const filter = { _id: ObjectId(id) }
        const upDoc = {
            $set: document
        }
        const result = await workspaceCollection.updateOne(filter, upDoc)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const deleteWorkspace = async (req, res) => {
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const id = req.params.id;
        console.log(id)
        const filter = { _id: ObjectId(id) }
        const result = await workspaceCollection.deleteOne(filter)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


module.exports = { addWorkspace, getWorkspaces, getWorkspace, updateWorkspace, deleteWorkspace }
