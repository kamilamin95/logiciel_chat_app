const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: [
      "*",
      "http://localhost:3000",
      "http://10.0.12.55",
      "http://10.0.12.55:80",
      "http://10.0.12.55:80:",
      "http://localhost:80",
      "http://localhost",
      "http://10.0.12.55:5000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = 5000;
require("dotenv").config();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000']
  })
);
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Logiciel chat app");
});
app.use("/api", router);

let usersArr = [];
io.on("connection", (socket) => {
  console.log(`New client connection with client ID ${socket.id}`);

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("newUser", (data) => {
    usersArr.push(data);
    io.emit("newUserResponse", usersArr);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("disconnect", () => {
    console.log("A user is disconnected");
    usersArr = usersArr.filter((user) => user.socketID !== socket.id);

    io.emit("newUserResponse", usersArr);
    socket.disconnect();
  });
});

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ejlha13.mongodb.net/mern-auth?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(port);
    console.log("Database Connected! App is listening at 5000 port");
  })
  .catch((error) => console.log(error));
