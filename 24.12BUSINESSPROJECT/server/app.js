import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//env
import dotenv from "dotenv";
//routes
import usersRoutes from "./routes/usersRoute.js";
import businessesRoutes from "./routes/businessesRoute.js";
import reviewsRoutes from "./routes/reviewsRoute.js";

import { setupSocket } from "./utils/socket.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

setupSocket(io);
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = 3000;
dotenv.config();
app.use(express.json());
app.use(morgan("tiny"));

// app.use(logRequest);
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
    credentials: true, // Enable credentials (cookies, etc.)
  })
);
app.use(cookieParser());

//connect mongo
const uri = process.env.DB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:" + `${uri}`, err.message);
  });

//check if the server work
app.get("/api/status", (req, res) => {
  res.send({ status: "server is running" });
});

//use posts
app.use("/api/businesses", businessesRoutes);

//use users
app.use("/api/users", usersRoutes);

//use comments
app.use("/api/reviews", reviewsRoutes);

//
// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
