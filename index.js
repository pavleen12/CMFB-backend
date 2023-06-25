const express = require('express');
const { query } = require('express-validator');
const app = express();
const port = 5040;


// calling exports and connecting to mongodb
const mongoDB = require('./db');
mongoDB();

// const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv').config();
// const authRoutes = require('./routes/auth');


// Middleware
// app.use(cors());
app.use(bodyParser.json());
// app.use(express.json);
app.use('/food-bank', require("./routes/createUser"));
// app.use('/auth', authRoutes);


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

  