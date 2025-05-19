const express = require('express');
const router = express.Router();
const postsRoutes = require('./posts');

router.use('/post', postsRoutes);

router.get('/', (req, res) => {
  res.redirect('/post');
});

module.exports = router;
