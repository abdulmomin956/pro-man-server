const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleInviteToken = async (req, res) => {
  const { email, workspaceId } = req.body;
  console.log(email, workspaceId);
  const token = jwt.sign(
    { email: email, workspaceId: workspaceId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );
  res.send({ token });
};

const handleVerifyToken = async (req, res) => {
  const { userEmail, token } = req.body;
  console.log(userEmail, token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const email = decoded.email;
    // console.log("email => ", email, ", userEmail => ", userEmail);
    if (userEmail == email) {
      console.log(decoded);
      res.send(decoded);

    } else {
      return res.status(403).send({ message: 'Forbidden access' });
    }

  })
}

module.exports = { handleInviteToken, handleVerifyToken };
