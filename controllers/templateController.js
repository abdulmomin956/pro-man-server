const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.js40z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const getTemplates = async (req, res) => {
  try {
    await client.connect();
    const templateCollection = client.db("pro-man").collection("template");
    const result = await templateCollection.find({}).toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const getCategoryWiseTemplates = async (req, res) => {
  const category = await req.params.category;
  try {
    await client.connect();
    const templateCollection = client.db("pro-man").collection("template");
    const query = { category: category };
    const result = await templateCollection.find(query).toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const getEachTemplate = async (req, res) => {
  const id = await req.params.id;
  try {
    await client.connect();
    const templateCollection = client.db("pro-man").collection("template");
    const query = { _id: ObjectId(id) };
    const result = await templateCollection.findOne(query);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

module.exports = {
  getTemplates,
  getCategoryWiseTemplates,
  getEachTemplate,
};
