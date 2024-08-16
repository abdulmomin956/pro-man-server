const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.js40z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const jwt = require('jsonwebtoken');

const handleRegister = async (req, res) => {
    const userDB = req.body;
    const { email } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email is required.' });
    console.log(email);
    try {
        await client.connect()
        const userCollection = client.db("pro-man").collection("user");

        const filter = { email: email };
        const result = await userCollection.findOne(filter)
        // console.log(result);
        if (result) {
            return res.status(409).json({ 'message': 'This email is already exited' });
        }
        else {
            // create JWTs
            const accessToken = jwt.sign(
                { "email": email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                { "email": email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );

            await userCollection.insertOne(userDB)
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
            res.status(201).json({ userDB, accessToken, ttl: 24 * 60 * 60 * 1000 });
        }
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleRegister }