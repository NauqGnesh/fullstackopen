const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

const globals = {};
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
  const users = await helper.usersInDb();
  globals.user = users[0];
  const token = jwt.sign(users[0], process.env.SECRET);
  globals.token = `Bearer ${token}`;
});

test('test GET request', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('test id property', async () => {
  const response = await api.get('/api/blogs');
  const content = response.body;
  content.forEach((element) => expect(element.id).toBeDefined());
});

test('test POST request', async () => {
  const newBlog = {
    title: 'How to make America go boom',
    author: 'Kim Jong Un',
    url: 'https://thisisafakewebsite.com',
    likes: 9238749832479,
  };

  await api.post('/api/blogs').set('Authorization', globals.token).send(newBlog).expect(201);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newBlog)]));
});

test('test POST without auth', async () => {
  const newBlog = {
    title: 'How to make America go boom',
    author: 'Kim Jong Un',
    url: 'https://thisisafakewebsite.com',
    likes: 9238749832479,
  };

  await api.post('/api/blogs').send(newBlog).expect(401);
});

test('test default value of like', async () => {
  const newBlog = {
    title: 'How to make America go boom Vol II',
    author: 'Kim Jong Un',
    url: 'https://thisisafakewebsite.com/vol2',
  };

  await api.post('/api/blogs').set('Authorization', globals.token).send(newBlog).expect(201);

  const response = await api.get('/api/blogs');
  const result = response.body.find((blog) => blog.author === newBlog.author);
  expect(result.likes).toBe(0);
});

test('missing value', async () => {
  const newBlog = {
    author: 'Kim Jong Un',
  };

  await api.post('/api/blogs').set('Authorization', globals.token).send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
