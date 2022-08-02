const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const handleLogin = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email is required.' });
    // console.log(email);
    try {
        await client.connect()
        const userCollection = client.db("pro-man").collection("user");

        const usersDB = await userCollection.find({ email: email }).toArray();
        console.log(usersDB.length > 0);

        if (usersDB.length === 0) return res.sendStatus(401); //Unauthorized

        // create JWTs
        const accessToken = jwt.sign(
            { "email": usersDB[0].email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "email": usersDB[0].email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        await userCollection.updateOne({ email: email }, { $set: { refreshToken: refreshToken } })
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    }
    catch {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }
