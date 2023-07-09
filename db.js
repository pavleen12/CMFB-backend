const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://piyushsati4:root@cluster0.aqmvp7c.mongodb.net/CMFB?retryWrites=true&w=majority";



const mongoDB = async () => {
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connected to MongoDB");
     
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
};

// to export this to other files
module.exports = mongoDB;
