const express = require("express");

//dotenv config
require("dotenv").config();

//connection for db
const connectDatabase = require("../config/db");

//routes
const ConversationRoutes = require("./Routes/ConversationRoutes");

//encryption and authentication modules
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express({ extended: false });

connectDatabase();

//bodyparser like middleware for express
app.use(express.json({ extended: false }));

//port
const port = process.env.PORT || 1301;
app.listen(port, () => console.log(`Server started on port ${port}.`));

//routes
app.use("/api/src/Conversation", ConversationRoutes);

//Error Handler
//not found has to be at top for json response
app.use(notFound);
app.use(errorHandler);
