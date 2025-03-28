const express = require('express');
const Blog = require('../models/blog');

const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

blogsRouter.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save blog' });
  }
});

module.exports = blogsRouter;
