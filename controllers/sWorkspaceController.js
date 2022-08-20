//this controller for single workspace based on :id

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const getWorkspace = async (req, res) => {
    const shortname = req.params.shortname;
    // console.log(id);
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const filter = { shortname: shortname }
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
    const id = req.params.id;
    const filter = { _id: ObjectId(id) }
    const document = req.body;
    const { shortname } = document;
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const isUniqueShortname = await workspaceCollection.findOne({ shortname: shortname })
        if (isUniqueShortname.length > 0) {
            return res.sendStatus(409);
        }
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
    const id = req.params.id;
    // console.log(id)
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        // const findworkspace = await workspaceCollection.find({}).toArray()
        // console.log(findworkspace)
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


module.exports = { getWorkspace, updateWorkspace, deleteWorkspace }
