const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import models
const Post = require('./models/post');

// Routes
// Home page - shows all posts
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ dateCreated: -1 });
    res.render('index', { 
      title: 'Global Gratitude Journal',
      posts: posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// New post form
app.get('/post/new', (req, res) => {
  res.render('post', { title: 'Add New Gratitude Post' });
});

// Submit new post
app.post('/post/new', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      author: req.body.author,
      imgURL: req.body.imgURL,
      imgDate: req.body.imgDate,
      imgTitle: req.body.imgTitle,
      gratitudeText: req.body.gratitudeText
    });
    
    await newPost.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
