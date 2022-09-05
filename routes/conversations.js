const router = require("express").Router();
const Conversation = require("../models/Conversation");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//new conv

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        type: "personal",
        nameId: [req.body.senderId, req.body.receiverId],
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//add member to workspace

router.put("/add-member", async (req, res) => {
    try {
        await client.connect()
        const workspaceCollection = client.db("social").collection("conversations");

        const conversation = await workspaceCollection.updateOne({ nameId: ["6314f3906d9f66bd6637afad"] }, {
            $push: { members: "abdul" },
        });
        console.log(conversation);
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});
//get conv of a user

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;