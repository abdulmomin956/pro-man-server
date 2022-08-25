const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser')

require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser())

//all routes
app.use("/", require("./routes/root"));
app.use("/mongodb", require("./routes/mongo"));
app.use("/api/reg", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

//workspace routes
app.use("/workspace", require("./routes/workspaces"));
app.use("/sworkspace", require("./routes/sworkspace"));

// board routes
app.use("/board", require("./routes/board"));

// card routes
app.use("/card", require("./routes/card"));

// list routes
app.use("/list", require("./routes/list"));

//user routes
app.use("/users", require("./routes/users"));
// profile routes
app.use("/profile", require("./routes/profile"));

app.listen(port, () => {
  console.log("running the server with port " + port);
});
