const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const getUsers = async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("pro-man").collection("user");
    const result = await userCollection.find({}).toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const addUser = async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("pro-man").collection("user");
    const user = req.body;
    console.log(user);
    const result = await userCollection.insertOne(user);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

// update role to make admin   add jwt
const makeAdmin = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const updatedItem = req.body;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: {
      role: updatedItem.role,
    },
  };
  try {
    await client.connect();
    const userCollection = client.db("pro-man").collection("user");
    const result = await userCollection.updateOne(
      filter,
      updatedDoc,
      options
    );
    res.send(result)
  }
  catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }

};

module.exports = { getUsers, addUser, makeAdmin };
