const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
});

test('fails if username is missing', async () => {
    const newUser = { name: 'John Doe', password: 'secret' };

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    expect(response.body.error).toContain('Username and password are required');
});

test('fails if password is missing', async () => {
    const newUser = { username: 'johndoe', name: 'John Doe' };

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    expect(response.body.error).toContain('Username and password are required');
});

test('fails if username is too short', async () => {
    const newUser = { username: 'jo', name: 'John Doe', password: 'secret' };

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    expect(response.body.error).toContain('Username and password must be at least 3 characters long');
});

test('fails if password is too short', async () => {
    const newUser = { username: 'johndoe', name: 'John Doe', password: 'ab' };

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    expect(response.body.error).toContain('Username and password must be at least 3 characters long');
});

test('fails if username is already taken', async () => {
    const existingUser = new User({ username: 'johndoe', name: 'John Doe', passwordHash: 'hashedpassword' });
    await existingUser.save();

    const newUser = { username: 'johndoe', name: 'Jane Doe', password: 'anothersecret' };

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

    expect(response.body.error).toContain('Username must be unique');
});

afterAll(() => {
    mongoose.connection.close();
});
