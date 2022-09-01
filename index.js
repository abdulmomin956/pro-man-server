const express = require("express");
const cors = require("cors");
const http = require("http");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//routes for messenger api
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const server = http.createServer(app);

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "social" },
  () => {
    console.log("Connected to MongoDB");
  }
);

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

// templates routes
app.use("/template", require("./routes/template"));

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

// Invite Workspace member
app.use("/invite", require("./routes/invite"));

//api for messenger api
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

server.listen(port, () => {
  console.log("server is running");
});
