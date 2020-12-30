const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const { body } = request;
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...body, user });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const blog = await Blog.findById(request.params.id);
  if (decodedToken.id === blog.user.toString()) {
    await Blog.findOneAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'invalid token' });
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(savedBlog);
});

module.exports = blogRouter;
