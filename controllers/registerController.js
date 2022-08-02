const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const handleRegister = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email is required.' });
    // console.log(email);
    try {
        await client.connect()
        const userCollection = client.db("pro-man").collection("user");

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
}

module.exports = { handleRegister }