const express = require('express');
const { query } = require('express-validator');
const cors = require('cors');
const app = express();
const port = 5040;
const initializeIDSequence = require('./initializeIDSeq')
const registerSchemas = require('./registerSchema')
const redis = require('redis');
const util = require('util')
const IOREDIS = require('ioredis')

const ioredis_client = new IOREDIS("redis://default:40e9a13e3edc4bab89ad0a09fa41e524@usw2-sacred-caribou-30494.upstash.io:30494");
ioredis_client.set('name', 'Elon');
// calling exports and connecting to mongodb
const mongoDB = require('./db');
mongoDB();

// const REDIS_URL = 'redis://127.0.0.1:6379';
// const REDIS_PORT = process.env.PORT || 6379

// const client = redis.createClient(REDIS_URL);
// const redisClient = redis.createClient({
//   host: '127.0.0.1', // Redis server host
//   port: REDIS_PORT,        // Redis server port
//   legacyMode: true 
// });

// client.connect().then(async (res) => {
//     console.log('connected');
// });



// redisClient.hGet = util.promisify(redisClient.hGet);
// redisClient.on('connect', () => console.log('Redis client connected'));
// redisClient.on('error', (err) => console.error('Redis error:', err));


const bodyParser = require('body-parser');
// require('dotenv').config();
// const authRoutes = require('./routes/auth');


// Middleware
app.use(cors());
// Middleware to check the cache before fetching data from the database
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

  

module.exports = ioredis_client;