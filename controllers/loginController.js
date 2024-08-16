const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.js40z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const handleLogin = async (req, res) => {
    const data = req.body;
    const { email, verified } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email is required.' });

    if (!verified) {
        try {
            await client.connect()
            const userCollection = client.db("pro-man").collection("user");

            const usersDB = await userCollection.findOne({ email: email })
            // console.log(usersDB);

            if (!usersDB) return res.sendStatus(401); //Unauthorized

            // create JWTs
            const accessToken = jwt.sign(
                { "email": usersDB.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                { "email": usersDB.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );

            // const result = await userCollection.updateOne({ email: email }, { $set: { refreshToken: refreshToken } })
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
            res.json({ usersDB, accessToken, ttl: 24 * 60 * 60 * 1000 });
        }
        catch {
            res.sendStatus(401);
        }
    }
    else {
        try {
            await client.connect()
            const userCollection = client.db("pro-man").collection("user");

            await userCollection.updateOne({ email: email }, { $set: data }, { upsert: true })
            const usersDB = await userCollection.findOne({ email: email })
            const accessToken = jwt.sign(
                { "email": usersDB.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                { "email": usersDB.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );

            // const result = await userCollection.updateOne({ email: email }, { $set: { refreshToken: refreshToken } })
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
            res.json({ usersDB, accessToken, ttl: 24 * 60 * 60 * 1000 });
        } catch {
            res.sendStatus(401);
        }
    }
    // console.log(email);
}

module.exports = { handleLogin }
