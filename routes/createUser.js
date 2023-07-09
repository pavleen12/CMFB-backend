const express = require("express");
const Users = require("../model/Users");
const router = express.Router();
const { query, validationResult } = require("express-validator");

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const validateUserData = [
  query("email").isEmail().withMessage('Please provide a valid email address.'),
  query("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

// User registration
router.post("/register",validateUserData, async (req, res) => {
  //validate the request
  console.log("Entered backend");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    // Check if user already exists
    const email = req.body.email;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //user created
    await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      role_id: req.body.role_id,
      user_id: req.body.user_id,
    });

    

    // // Hash the password
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // // Create a new user
    // const newUser = new User({ name, email, password: hashedPassword });
    // await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    console.log(req);
   
    await Users.create({
      email: req.body.email,
      password: req.body.password
    }).then(res.json({success:true}));

    // Find the user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if(req.body.password === user.password){
      console.log("user found and loggedin");
      res.status(200).json({ token });
    }
    // Compare the passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid password' });
    // }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    //   expiresIn: '1h',
    // });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
