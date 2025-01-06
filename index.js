//MY IMPORTS
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { Sequelize } = require('sequelize');

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

//Environmental Variables
const PORT = process.env.PORT || 3000;

// Initialize PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL);



//Global MiddleWares
app.use(bodyparser.json());
app.use(cors());


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", categoryRoutes);
app.use("/api/v1/users", categoryRoutes);
app.use("/api/v1/comments", productRoutes);


app.get("/", (req, res) => {
  res.json({ status: "Success", message: "Everything Fine" });
});

//APP LISTENING ON PORT
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    console.log("Error Occured");
  } else {
    console.log(`Server Up On ${PORT}`);
  }
});
