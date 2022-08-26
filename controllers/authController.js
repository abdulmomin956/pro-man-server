const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
const jwt = require('jsonwebtoken');

const handleAuth = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        const email = { email: decoded.email };
        const fetchData = async () => {
            try {
                await client.connect();
                const userCollection = client.db("pro-man").collection("user");
                console.log(email);
                const result = await userCollection.findOne(email)
                console.log(result);
                res.send(result)
            }
            catch (err) {
                console.error(err);
            } finally {
                // await client.close();
            }
        }
        fetchData();
    })
}

module.exports = { handleAuth }