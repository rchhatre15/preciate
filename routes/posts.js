const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Home page
router.get('/', async (req, res) => {
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
router.get('/new', (req, res) => {
  res.render('post', { title: 'Add New Gratitude Post' });
});

// Submit new post
router.post('/new', async (req, res) => {
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

module.exports = router;
