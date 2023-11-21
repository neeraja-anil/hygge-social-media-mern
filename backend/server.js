import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import authUsersRoutes from "./routes/authUsersRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// configurations

dotenv.config();
connectDB();
const app = express();
const httpServer = createServer(app);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user._id === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (recieverId) => {
  console.log(users);
  return users.find((user) => user.userId === recieverId);
};

io.on("connection", (socket) => {
  //User Connecting
  console.log(`user Connected ${socket.id}`);

  //take userId and socketId of user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //Send and Recieve messages
  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    console.log("sendMessage", senderId, recieverId, text);

    const reciever = getUser(recieverId);
    console.log("reciever", reciever);
    if (reciever) {
      io.to(reciever.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  // //NOTIFICATIONS
  // socket.on('getNotificationsLength', async (userId) => {
  //     const notifications = await notification
  //       .find({ user: userId, read: false })
  //       .lean();
  //     users[userId]?.emit('notificationsLength', notifications.length || 0);
  //   });

  //user disconnecting
  socket.on("disconnect", () => {
    console.log("a user disconnected ");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

//ROUTES
app.use("/api/auth/users", authUsersRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

//STATIC FILES

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (!fs.existsSync(path.join(__dirname, "/uploads"))) {
  fs.mkdirSync(path.join(__dirname, "/uploads"));
}
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "img-src 'self' https://res.cloudinary.com;"
  );
  next();
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//ERROR MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

// MONGOOSE SETUP
const PORT = process.env.PORT || 5001;

httpServer.listen(
  PORT,
  console.log(`app running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
