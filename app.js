import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();

// Настройка CORS
app.use(
  cors({
    origin: "*", // Разрешить запросы с любого домена
    methods: ["GET", "POST"], // Указать разрешенные методы
    allowedHeaders: ["Content-Type"], // Указать заголовки
  })
);

const server = http.createServer(app);

// Настройка CORS для Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Разрешить все источники
    methods: ["GET", "POST"], // Разрешить методы
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  socket.on("message", (msg) => {
    console.log("Message:" + msg);
    io.emit("message", msg);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
