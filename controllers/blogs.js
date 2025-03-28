const express = require('express')
const Blog = require('../models/blog')

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const { title, url, author, likes } = req.body

    if (!title || !url) {
        return res.status(400).json({ error: 'Title and URL are required' })
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
    })

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

module.exports = blogsRouter
