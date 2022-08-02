const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

// <<<<<<< HEAD

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
// // console.log(uri);
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// async function run() {
//     try {

//         await client.connect()

//         // const cardCollection = client.db("pro-man").collection("card");




//         // app.post('/card', async (req, res) => {

//         //     const cardData = req.body;
//         //     console.log(cardData);
//         //     const result = await cardCollection.insertOne(cardData);
//         //     res.send(result);
//         // })
//         // card update api
//         // app.put('/card/:task', async (req, res) => {
//         //     // console.log(req.body);
//         //     const taskData = await cardCollection.updateOne(
//         //         { task: req.params.task },
//         //         { $set: req.body }
//         //     )
//         //     res.send({ status: "updated" })
//         // })
//         // app.delete('/card/:id', async (req, res) => {
//         //     try {
//         //         const deleteCard = await cardCollection.findOneAndDelete(req.params.id);
//         //         // console.log(deleteCard)
//         //         if (!req.params.id) {
//         //             return res.status(400).send();

//         //         }
//         //         res.send(deleteCard)
//         //     }
//         //     catch (e) {
//         //         res.status(500).send(e);

//         //     }
//         // })
//     }
//     finally {
//         // await client.close();
//     }
// }

// run().catch(console.dir)

//all routes
app.use('/', require('./routes/root'))
app.use('/mongodb', require('./routes/mongo'))
app.use('/api/reg', require('./routes/register'))
app.use('/api/login', require('./routes/login'))
app.use('/users', require('./routes/users'))

//workspace routes
app.use('/workspace', require('./routes/workspaces'))

// board routes
app.use('/board', require('./routes/board'))

// card routes
app.use('/card', require('./routes/card'))


app.listen(port, () => {
    console.log('running the server with port ' + port);
})