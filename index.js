const express = require('express');
const { query } = require('express-validator');
const cors = require('cors');
const app = express();
const port = 5040;


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
app.use('/food-bank', require("./routes/createUser"));
app.use('/food-bank', require("./routes/getUsers"));
app.use('/food-bank', require("./routes/getDonations"));



// app.use('/auth', authRoutes);


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

  