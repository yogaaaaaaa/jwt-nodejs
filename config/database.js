const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  //connecting to database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("successfuly connected to DB");
    })
    .catch((error) => {
      console.log("Db connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
