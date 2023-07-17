const express = require('express');
const { query } = require('express-validator');
const cors = require('cors');
const app = express();
const port = 5040;
const initializeIDSequence = require('./initializeIDSeq')
const registerSchemas = require('./registerSchema')


// calling exports and connecting to mongodb
const mongoDB = require('./db');
mongoDB();

const bodyParser = require('body-parser');
// require('dotenv').config();
// const authRoutes = require('./routes/auth');


// Middleware
app.use(cors());
// app.use(cors({
//     allowedHeaders: 'Content-Type',
//     methods: 'POST'
//   }));
//http://localhost:3000/#/register
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/#/register");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(express.json);
app.use(bodyParser.json());
app.use('/cmfb/user', require("./controller/UserController"));
app.use('/cmfb/donation', require("./controller/DonationController"));
app.use('/cmfb/feedback', require("./controller/FeedbackController"));
app.use('/cmfb/foodBank', require("./controller/FoodBankController"));
app.use('/cmfb/inventory', require("./controller/InventoryController"));
app.use('/cmfb/vendingLocation', require("./controller/VendingLocationController"));




// app.use('/auth', authRoutes);

// initializeIDSequence()
//   .then(() => {
//     // Start your server or perform other operations
//     registerSchemas()
//     console.log('Application started.');
//   })
//   .catch((error) => {
//     console.error('Error initializing IDSequence collection:', error);
//   });

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

  