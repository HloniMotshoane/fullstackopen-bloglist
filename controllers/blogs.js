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

blogsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' })
        }

        res.status(204).end()
    } catch (error) {
        res.status(400).json({ error: 'Malformed ID' })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { likes } = req.body

    if (likes === undefined) {
        return res.status(400).json({ error: 'Likes are required to update' })
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, 
            { likes },
            { new: true, runValidators: true, context: 'query' }
        )

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' })
        }

        res.json(updatedBlog)
    } catch (error) {
        res.status(400).json({ error: 'Malformed ID' })
    }
})

module.exports = blogsRouter
