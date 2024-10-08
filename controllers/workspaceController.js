const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.js40z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const Conversation = require("../models/Conversation");

const generateShortName = async name => {
    const str = name.replace(/\s/g, '').toLowerCase();
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const result = await workspaceCollection.find({}).project({ shortname: 1, _id: 0 }).toArray();
        const filtered = result.filter(item => Object.hasOwn(item, 'shortname'))
        // console.log(filtered);
        const found = filtered.filter(element => element?.shortname?.includes(str))
        if (found.length > 0) {
            // console.log(found);
            let num = found[found.length - 1]?.shortname?.match(/\d+/g);
            // console.log(num);
            if (num === null) {
                return str + '1'
            }
            else {
                return `${str}${parseInt(num[0]) + 1}`
            }
        }
        else {
            return str
        }
    }
    catch (err) {
        console.error(err);
    }
}

const addWorkspace = async (req, res) => {
    const { title, type, description, email, userId, profileBg } = req.body;
    if (!title || !type || !email) return res.sendStatus(401);
    const shortname = await generateShortName(title)
    if (shortname === undefined || shortname === null) {
        return res.sendStatus(401);
    }
    const data = { title, type, description, email, visibility: "private", shortname: shortname, profileBg }
    // console.log(data);
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const result = await workspaceCollection.insertOne(data);
        const newConversation = new Conversation({
            type: "workspace",
            nameId: [result.insertedId.toString()],
            members: [userId],
        });

        try {
            await newConversation.save();
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
        // res.send("result");
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


const getWorkspaces = async (req, res) => {
    const { email } = req.params;
    // console.log(email);
    if (!email) return res.sendStatus(401);
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const result = await workspaceCollection.find({ email: email }).toArray()
        res.send(result)
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}

// Find the workspaces where user as a member.
const memberArray = {
    members: [],
    setMembers: function (data) {
        this.members = data;
    }
};
const getMembersWorkspaces = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        await client.connect()
        const workspaceCollection = client.db("pro-man").collection("workspace");
        // console.log(userId);
        const result = await workspaceCollection.find().toArray()
        if (result) {
            memberArray.members = []
            result.map(user => {
                const filter2 = user?.members?.find(e => {
                    if (e === userId) {
                        memberArray.members?.push(user);
                    }
                })
            })
        }
        // console.log(memberArray.members)
        res.send(memberArray.members)
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}




module.exports = { addWorkspace, getWorkspaces, getMembersWorkspaces }
