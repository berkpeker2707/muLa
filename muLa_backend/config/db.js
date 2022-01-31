const config = require("config");
const db = config.get("dbKEY");
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

const connectDatabase = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected!");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDatabase;