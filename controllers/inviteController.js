const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.js40z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const Conversation = require("../models/Conversation");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleInviteToken = async (req, res) => {
  const { email, workspaceId } = req.body;
  // console.log(email, workspaceId);
  const token = jwt.sign(
    { email: email, workspaceId: workspaceId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );
  res.send({ token });
};



const handleVerifyToken = async (req, res) => {
  const { userEmail, token } = req.body;
  // console.log(userEmail, token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const { email, workspaceId } = decoded;
    // console.log("email => ", email, ", userEmail => ", userEmail);
    if (userEmail == email) {
      // console.log(decoded);
      res.send(decoded);

    } else {
      return res.status(403).send({ message: 'Forbidden access' });
    }

  })
}



const memberArray = {
  members: null,
  setMembers: function (data) {
    this.members = data;
  }
};
const handleUpdateMember = async (req, res) => {
  const { workspaceId, userId } = req.body;
  // console.log(userId);
  try {
    await client.connect()
    const workspaceCollection = client.db("pro-man").collection("workspace");
    const workspace = await workspaceCollection.findOne({ _id: ObjectId(workspaceId) })
    // console.log(workspace);
    if (!workspace?.members) {
      memberArray.setMembers([])
      // console.log(memberArray.members);
    } else {
      memberArray.setMembers(workspace.members);
    }

    const check = memberArray.members?.find(e => e === userId);
    // console.log(check);
    if (check) {
      return res.status(409).send({ message: 'User already added.' });
    } else {
      memberArray.setMembers([...memberArray.members, userId])

      const filter = { _id: ObjectId(workspaceId) };
      const updateDoc = {
        $set: { members: memberArray.members },
      };

      // await client.db("pro-man").collection("workspace").updateOne({ workspaceId }, { $push: { members: email } })

      const conversationCollection = client.db("social").collection("conversations");
      await conversationCollection.updateOne({ nameId: [workspaceId] }, {
        $push: { members: userId },
      });
      const result = await workspaceCollection.updateOne(filter, updateDoc);
      res.send(result);
    }
  }
  catch (err) {
    console.error(err);
  }
  finally {
    // await client.close();
  }
}

module.exports = { handleInviteToken, handleVerifyToken, handleUpdateMember };
