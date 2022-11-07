const mongoose = require("mongoose");
// const dotenv = require('dotenv');
// console.log(dotenv.config());
// console.log(process.env)

mongoose.set("useFindAndModify", false);

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.dbKEY, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected!");
  } catch (error) {
    console.error(error.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDatabase;
