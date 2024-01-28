import express from "express";
import mongoose from "mongoose";
import books_route from "./Routes/booksRoute.js";
import user_route from "./Routes/userRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

// app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:8100",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//  const DB =
//    "mongodb+srv://harismahmood103:6YmV12rRbNoIh72y@cluster0.klxu92w.mongodb.net/mern_haris?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("app connected");
  })
  .catch((err) => console.log(err));

const middleware = (req, res, next) => {
  console.log("Middleware called");
  next();
};

app.get("/", (req, res) => {
  res.send("API GET");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.get("/play", middleware, (req, res) => {
  console.log("play called");
  res.send("Play page");
});

app.use("/api/books", books_route);

app.use("/api/user", user_route);

app.listen(PORT, () => {
  console.log(`app running at 4000`);
});
