const express = require("express");
const cors = require("cors");
const http = require("http");
var cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const server = http.createServer(app);

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

// Invite Workspace member
app.use("/invite", require("./routes/invite"));
// socket.io 

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://pro-man-4cb6f.web.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("user disconnect", socket.id)
  });
});



// app.listen(port, () => {
//   console.log("running the server with port " + port);
// });

server.listen(port, () => {
  console.log("server is running");
})
