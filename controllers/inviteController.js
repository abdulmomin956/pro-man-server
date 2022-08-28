const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

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
    const email = decoded.email;
    // console.log("email => ", email, ", userEmail => ", userEmail);
    if (userEmail == email) {
      // console.log(decoded);
      res.send(decoded);

    } else {
      return res.status(403).send({ message: 'Forbidden access' });
    }

  })
}




const handleUpdateMember = async (req, res) => {
  try {
    await client.connect()
    const workspaceCollection = client.db("pro-man").collection("workspace");

    const { workspaceId, email } = req.body;
    const data = "test2@gmail.com";
    const workspace = await workspaceCollection.find({ _id: ObjectId(workspaceId) }).toArray()
    console.log(workspace.members);
    const userArray = workspace.members;
    const check = userArray?.find(e => e === data);
    if (check) {
      console.log("Check = true", check);
      return res.status(403).send({ message: 'Forbidden access' });
    } else {
      userArray?.push(data);
      console.log(userArray);
      console.log("Check = false", check);

      const option = { upsert: true };
      const filter = { _id: ObjectId(workspaceId) };
      const updateDoc = {
        $set: { members: userArray },
      };
      const result = await workspaceCollection.updateOne(filter, updateDoc, option);

      console.log("Success.....", result);
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
