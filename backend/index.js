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
    origin: "http://localhost:3000",
  },
});
const port = 5000;
require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

io.on("connection", (socket) => {
  console.log(`New client connection with client ID ${socket.id}`);

  socket.on("message", (message) => {
    console.log("This is message from client", message);
    io.emit("message", message);
  });

  // socket.on("disconnect", () => {
  //   console.log("A user is disconnected");
  // });
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
