//this controller for single workspace based on :id

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.js40z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const docs = {
    document: {},
    setDocument: function (data) { this.document = data }
}

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
    const { newShortname, title, type, website, description } = document;
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const isUniqueShortname = await workspaceCollection.findOne({ shortname: newShortname })
        console.log(isUniqueShortname);
        if (isUniqueShortname && Object.keys(isUniqueShortname).length > 0) {
            console.log('yes');
            return res.sendStatus(409);
        }
        if (!newShortname) {
            docs.setDocument({ title: title, type: type, website: website, description: description })
        }
        else {
            docs.setDocument({ title: title, type: type, shortname: newShortname, website: website, description: description })
        }
        // console.log(docs.document);
        const upDoc = {
            $set: docs.document
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

const getWorkspaceById = async (req, res) => {
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const result = await workspaceCollection.findOne({ _id: ObjectId(req.params.id) })
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { getWorkspace, updateWorkspace, deleteWorkspace, getWorkspaceById }
