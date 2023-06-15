const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");

// Env Config
dotenv.config({ path: "./db/.env" });

// Routes Import
const userRoutes = require("./routes/userRoute");
const todoRoutes = require("./routes/todoRoute");

// Connection MongoDB
connectDB();

// Express Constant
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.blue
  );
});
