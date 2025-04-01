const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../middleware/tokenExtractor');
const middleware = require('../utils/middleware');
const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  });
  blogsRouter.post('/', async (req, res) => {
    const { title, url, author, likes } = req.body;

    if (!title || !url || !author) {
        return res.status(400).json({ error: 'Title, URL, and Author are required' });
    }

    const user = await User.findById(author);
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    const blog = new Blog({
        title,
        url,
        likes: likes || 0,
        user: user._id,
    });

    const savedBlog = await blog.save();
    
    if (!user.blogs) {
        user.blogs = [];
    }

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});



blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
    const { id } = request.params;
    
    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' });
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (!decodedToken.id || blog.user.toString() !== decodedToken.id.toString()) {
            return response.status(403).json({ error: 'Only the creator can delete the blog' });
        }

        await Blog.findByIdAndDelete(id);

        response.status(204).end();
    } catch (error) {
        response.status(400).json({ error: 'Malformed ID or Invalid token' });
    }
});

blogsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;

    if (likes === undefined) {
        return res.status(400).json({ error: 'Likes are required to update' });
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, 
            { likes },
            { new: true, runValidators: true, context: 'query' }
        ).populate('user', { username: 1, name: 1 });

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: 'Malformed ID' });
    }
});

module.exports = blogsRouter;
