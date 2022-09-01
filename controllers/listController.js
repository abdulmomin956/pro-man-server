const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const addList = async (req, res) => {
  const { boardID } = req.params;
  const list = req.body;
  const data = { boardID: boardID, list: list }
  try {
    await client.connect();
    const listCollection = client.db("pro-man").collection("list");
    const result = await listCollection.updateOne({ boardID: boardID }, { $set: data }, { upsert: true });
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const getAllLists = async (req, res) => {
  const { boardID } = req.params;
  // console.log(boardID);
  try {
    await client.connect();
    const listCollection = client.db("pro-man").collection("list");
    const result = await listCollection.find({ boardID: boardID }).toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const getLists = async (req, res) => {
  const { boardID } = req.params;
  // console.log(boardID);
  try {
    await client.connect();
    const listCollection = client.db("pro-man").collection("list");
    const result = await listCollection.findOne({ boardID: boardID })
    // console.log(result);
    if (result === null) {
      return res.send({ boardID: boardID, list: { lists: {}, listIds: [], } })
    }
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};



const updateList = async (req, res) => {
  try {
    await client.connect();
    const listCollection = client.db("pro-man").collection("list");
    const id = req.params.id;
    const document = req.body;
    const filter = { _id: ObjectId(id) };
    const upDoc = {
      $set: document,
    };
    const result = await listCollection.updateOne(filter, upDoc);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const deleteAllList = async (req, res) => {
  const { boardID } = req.params;
  try {
    await client.connect();
    const listCollection = client.db("pro-man").collection("list");
    const result = await listCollection.deleteMany({ boardID: boardID });
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};
const deleteList = async (req, res) => {
  try {
    await client.connect();
    const listCollection = client.db("pro-man").collection("list");
    const id = req.params.id;
    // console.log(id);
    const filter = { _id: ObjectId(id) };
    const result = await listCollection.deleteOne(filter);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

module.exports = { addList, getAllLists, getLists, updateList, deleteAllList, deleteList };
