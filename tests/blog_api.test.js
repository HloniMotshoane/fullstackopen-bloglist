const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://example.com/first',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://example.com/second',
    likes: 10,
  },
]

// Runs before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('4.8: GET /api/blogs', () => {
  test('returns the correct amount of blog posts in JSON format', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('4.9: Verify ID property', () => {
  test('blog posts have an "id" property instead of "_id"', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
  })
})

describe('4.10: POST /api/blogs', () => {
  test('successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Test Author',
      url: 'http://example.com/new',
      likes: 3,
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain('New Blog Post')
  })
})

describe('4.11: Default likes to 0', () => {
  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Anonymous',
      url: 'http://example.com/nolikes',
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)

    expect(response.body.likes).toBe(0)
  })
})

describe('4.12: Missing title or URL should return 400', () => {
  test('blog without title is rejected with 400', async () => {
    const newBlog = {
      author: 'No Title Author',
      url: 'http://example.com/notitle',
      likes: 2,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('blog without URL is rejected with 400', async () => {
    const newBlog = {
      title: 'No URL Blog',
      author: 'No URL Author',
      likes: 2,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
