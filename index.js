const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y5l2t.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const loginCollection = client.db('pro_man').collection('login');
       app.get('/login', async (req, res) => {
           const login = await loginCollection.find().toArray();
            res.send(login);
          });

    }
    finally{

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send({ message: 'success' })
})


app.listen(port, () => {
    console.log('running the server with port ' + port);
})