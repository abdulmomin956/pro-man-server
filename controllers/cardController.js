const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const addCard = async (req, res) => {
    try {
        await client.connect()
        const cardCollection = client.db("pro-man").collection("card");
        const data = req.body;
        const result = await cardCollection.insertOne(data);
        res.send(result);

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


const getCards = async (req, res) => {
    try {
        await client.connect()
        const cardCollection = client.db("pro-man").collection("card");
        const result = await cardCollection.find({}).toArray()
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const getCard = async (req, res) => {
    try {
        await client.connect()
        const cardCollection = client.db("pro-man").collection("card");
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        const result = await cardCollection.findOne(filter)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const updateCard = async (req, res) => {
    try {
        await client.connect()
        const cardCollection = client.db("pro-man").collection("card");
        const id = req.params.id;
        const document = req.body;
        const filter = { _id: ObjectId(id) }
        const upDoc = {
            $set: document
        }
        const result = await cardCollection.updateOne(filter, upDoc)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const deleteCard = async (req, res) => {
    try {
        await client.connect()
        const cardCollection = client.db("pro-man").collection("card");
        const id = req.params.id;
        console.log(id)
        const filter = { _id: ObjectId(id) }
        const result = await cardCollection.deleteOne(filter)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


module.exports = { addCard, getCards, getCard, updateCard, deleteCard }