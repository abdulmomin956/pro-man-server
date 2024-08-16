const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.js40z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const testMongo = async (req, res) => {

    try {
        await client.connect()
        res.send('mongo is running')
    } catch (err) {
        console.log(err);
        res.status(400).json({ "message": err })
    }
}

module.exports = { testMongo };