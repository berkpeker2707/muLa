const express = require("express");

const cors = require("cors");

//dotenv config
require("dotenv").config();

//connection for db
const connectDatabase = require(`${__dirname}/config/db`);

//routes
const authRoutes = require(`${__dirname}/Routes/AuthRoutes`);

//encryption and authentication modules
const {
  errorHandler,
  notFound,
} = require(`${__dirname}/middlewares/errorHandler`);

const app = express({ extended: false });

connectDatabase();

//bodyparser like middleware for express
app.use(express.json({ extended: false }));

app.use(cors());

//port
const port = process.env.PORT || 1100;
app.listen(port, () => console.log(`Server started on port ${port}.`));

//routes
app.use(`${__dirname}/api/auth`, authRoutes);

//Error Handler
//not found has to be at top for json response
app.use(notFound);
app.use(errorHandler);
