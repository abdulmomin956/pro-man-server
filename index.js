const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())



// user: pro-man
// pass: hMR3lwvWQjhvu12a

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        await client.connect()
        const userCollection = client.db("pro-man").collection("user");

        app.put('/user/:email', async(req, res)=>{
            const email = req.params.email;
            const user = req.body;
            const filter = {email: email};
            const options = {upsert: true};
            const updateDoc =  {
                $set: {user}
            }
            const result = await userCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send({ message: 'success' })
})


app.listen(port, () => {
    console.log('running the server with port ' + port);
})