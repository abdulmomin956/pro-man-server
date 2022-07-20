const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        await client.connect()
        const userCollection = client.db("pro-man").collection("user");
        const workspaceCollection = client.db("pro-man").collection("workspace");
        const boardCollection = client.db("pro-man").collection("board");


        //registration api
        app.put('/api/reg', async (req, res) => {
            const { email } = req.body;
            if (!email) return res.status(400).json({ 'message': 'Email is required.' });
            // console.log(email);
            try {
                const filter = { email: email };
                const options = { upsert: true };
                const result = await userCollection.updateOne(filter, { $set: { email: email } }, options)
                if (result.matchedCount === 1) {
                    return res.status(409).json({ 'message': 'This email is already exited' });
                }
                else {
                    res.status(201).json(result);
                }
            }
            catch (err) {
                res.status(500).json({ 'message': err.message });
            }
        })

        //login api
        app.post('/api/login', async (req, res) => {
            const { email } = req.body;
            if (!email) return res.status(400).json({ 'message': 'Email is required.' });
            // console.log(email);
            try {
                const usersDB = await userCollection.find({}).toArray();
                const foundUser = usersDB.find(person => person.email === email);

                if (!foundUser) return res.sendStatus(401); //Unauthorized

                // create JWTs
                const accessToken = jwt.sign(
                    { "username": foundUser.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                const refreshToken = jwt.sign(
                    { "username": foundUser.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );

                userCollection.updateOne({ email: email }, { $set: { refreshToken: refreshToken } })
                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({ accessToken });
            }
            catch {
                res.sendStatus(401);
            }
        })


        //workspace
        app.get('/workspace', async (req, res) => {
            res.send({ message: "need api update" })
        })
        app.post('/workspace', async (req, res) => {
            res.send({ message: "need api update" })
        })
        app.patch('/workspace', async (req, res) => {
            res.send({ message: "need api update" })
        })
        app.delete('/workspace/:id', async (req, res) => {
            res.send({ message: "need api update" })
        })

        // board
        app.get('/board', async (req, res) => {
            res.send({ message: "need api update" })
        })
        app.post('/board', async (req, res) => {
            res.send({ message: "need api update" })
        })
        app.patch('/board', async (req, res) => {
            res.send({ message: "need api update" })
        })
        app.delete('/board/:id', async (req, res) => {
            res.send({ message: "need api update" })
        })

        //for mongodb check
        app.get('/users', async (req, res) => {
            const result = await userCollection.find({}).toArray();
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