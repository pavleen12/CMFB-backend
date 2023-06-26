const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://pavleen12:root@cluster0.aqmvp7c.mongodb.net/CMFB?retryWrites=true&w=majority";



const mongoDB = async () => {
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connected to MongoDB");

      // Start the server
      //   app.listen(3000, () => {
      //     console.log('Server is running on port 3000');
      //   });

      mongoose.connection.db.listCollections().toArray()
      .then((collections) => {
        console.log('Collections:');
        collections.forEach((collection) => {
          console.log(collection.name );
        });
      })
      .catch((error) => {
        console.error('Error retrieving collections', error);
      });
      


      const Users = mongoose.model("Users");

     
      const fetchedData = await Users.find({});
      console.log(fetchedData);
     
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
};

// to export this to other files
module.exports = mongoDB;
