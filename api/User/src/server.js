const express = require("express");

const cors = require("cors");

//dotenv config
require("dotenv").config();

//connection for db
const connectDatabase = require("./config/db");

//routes
const userRoutes = require("./Routes/userRoutes");

//encryption and authentication modules
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express({ extended: false });
app.use(express.static("picture"));

connectDatabase();

//bodyparser like middleware for express
app.use(express.json({ extended: false }));

app.use(cors());

//port
const port = process.env.PORT || 1200;
app.listen(port, () => console.log(`Server started on port ${port}.`));

//routes
app.use("/api/user", userRoutes);

//Error Handler
//not found has to be at top for json response
app.use(notFound);
app.use(errorHandler);
