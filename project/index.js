const express = require("express");
const app = express();
const mongoose= require("mongoose");
require('dotenv').config();
const cors=require("cors");
const { MongoRuntimeError } = require("mongodb");
app.use(cors());
app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
app.use(express.static('public'));
const bcrypt = require ("bcrypt");





app.listen(8000, () => {
  console.log('Server started on port 8000');
});





mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{console.log("connected to database")})
.catch(e=>console.log(e))

require("./userDetails");

const User= mongoose.model("UserInfo");





  // Register route
  app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      cart: [],
    });
  
    try {
      await newUser.save();
      res.json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  





  
  // Add an API route to add an item to the user's cart
  app.post('/cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      // Find the user by ID and update the 'cart' field
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { cart: { product: productId, quantity } } },
        { new: true }
      ).populate('cart.product');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the updated cart as the response
      res.json(user.cart);
    } catch (error) {
      console.error('Error adding item to user cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });







  
  // Add an API route to remove an item from the user's cart
  app.delete('/cart/:itemId', async (req, res) => {
    // Get the user ID from the request (assuming you have implemented user authentication)
    const userId = req.userId;
    const itemId = req.params.itemId;
  
    try {
      // Find the user by ID and update the 'cart' field
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { cart: { _id: itemId } } },
        { new: true }
      ).populate('cart.product');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the updated cart as the response
      res.json(user.cart);
    } catch (error) {
      console.error('Error removing item from user cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });






  // Sign-in route
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Compare password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Authentication successful
  res.json({ message: 'Authentication successful' });
});







app.get('/', (req, res) => {
  // Handling logic for the root URL
  res.send('Hello, world!'); // Sending a response
});



