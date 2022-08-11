const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const addList = async (req, res) => {
  try {
    await client.connect();
    const listCollection = client.db("pro-man").collection("list");
    const data = req.body;
    const result = await listCollection.insertOne(data);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const getLists = async (req, res) => {
  const { boardID } = req.params;
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

// const getList = async (req, res) => {
//   try {
//     await client.connect();
//     const listCollection = client.db("pro-man").collection("board");
//     const id = req.params.id;
//     const filter = { _id: ObjectId(id) };
//     const result = await listCollection.findOne(filter);
//     res.send(result);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     // await client.close();
//   }
// };

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

module.exports = { addList, getLists, updateList, deleteList };
