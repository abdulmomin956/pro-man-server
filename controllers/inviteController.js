const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleInviteToken = async (req, res) => {
  const { email, workspaceId } = req.body;
//   console.log( email, workspaceId );
  const token = jwt.sign(
    { email: email, workspaceId: workspaceId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );
  res.send({ token });
};

module.exports = { handleInviteToken };
