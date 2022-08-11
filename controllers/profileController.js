const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const addProfile = async (req, res) => {
    try {
        await client.connect()
        const profileCollection = client.db("pro-man").collection("profile");
        const data = req.body;
        const result = await profileCollection.insertOne(data);
        res.send(result);

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}


const getProfile = async (req, res) => {
    try {
        await client.connect()
        const profileCollection = client.db("pro-man").collection("profile");
        const email = req.params.email;
        const filter = { _id: ObjectId(id) }
        const result = await profileCollection.findOne(filter)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
const updateProfile = async (req, res) => {
    try {
        await client.connect()
        const profileCollection = client.db("pro-man").collection("profile");
        const id = req.params.id;
        const document = req.body;
        const filter = { _id: ObjectId(id) }
        const upDoc = {
            $set: document
        }
        const result = await profileCollection.updateOne(filter, upDoc)
        res.send(result)

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // await client.close();
    }
}
// const deleteCard = async (req, res) => {
//     try {
//         await client.connect()
//         const profileCollection = client.db("pro-man").collection("profile");
//         const id = req.params.id;
//         console.log(id)
//         const filter = { _id: ObjectId(id) }
//         const result = await cardCollection.deleteOne(filter)
//         res.send(result)

//     }
//     catch (err) {
//         console.error(err);
//     }
//     finally {
//         // await client.close();
//     }
// }


module.exports = { addProfile, getProfile, updateProfile }


