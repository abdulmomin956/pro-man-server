const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const getUsers = async (req, res) => {

    try {
        await client.connect()
        const userCollection = client.db("pro-man").collection("user");
        const result = await userCollection.find({}).toArray();
        res.send(result)
    } catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}

module.exports = { getUsers };