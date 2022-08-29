const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const usePages = {
  pages: 1,
  setPages: function (data) { this.pages = data },
  filter: {},
  setFilter: function (data) { this.filter = data }
}

const getUsers = async (req, res) => {
  const { page, limit } = req.query;
  const { isAdmin, keyword } = req.body;
  // console.log(isAdmin, keyword);
  if ((isAdmin === "Admin") && keyword) {
    usePages.setFilter({
      "email": { $regex: keyword },
      role: "Admin"
    }
    )
  }
  if ((isAdmin === "Admin") && !keyword) {
    usePages.setFilter({
      role: "Admin"
    }
    )
  }
  if ((isAdmin !== "Admin") && keyword) {
    usePages.setFilter({ "email": { $regex: keyword } })
  }
  if ((isAdmin !== "Admin") && !keyword) {
    usePages.setFilter({})
  }
  usePages.setPages(page)
  try {
    await client.connect();
    const userCollection = client.db("pro-man").collection("user");
    const data = await userCollection.find(usePages.filter).toArray();
    const totalItemsNumber = data.length;
    const num_pages = Math.ceil(totalItemsNumber / limit);
    if (usePages.pages > num_pages) {
      usePages.setPages(num_pages)
    }
    const lowerLimit = usePages.pages * limit - limit;
    const upperLimit = usePages.pages * limit;
    const items = data.slice(lowerLimit, upperLimit)
    res.send({
      "list": items,
      "num_pages": num_pages,
      "page": parseInt(usePages.pages),
      "limit": parseInt(limit),
      "isAdmin": isAdmin
    }
    )
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
};

const allUsers = async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("pro-man").collection("user");
    const result = await userCollection.find({}).toArray();
    res.send(result)
  } catch (err) {
    console.error(err);
  } finally {
    // await client.close();
  }
}

const addUser = async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("pro-man").collection("user");
    const user = req.body;
    // console.log(user);
    const result = await userCollection.insertOne(user);
    // res.send(result);
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

module.exports = { getUsers, allUsers, addUser, makeAdmin };
