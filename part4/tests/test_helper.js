const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'The Best Software Engineering Books I Read in 2020',
    author: 'Mwiza Kumwenda',
    url:
			'https://medium.com/better-programming/the-best-software-engineering-books-i-read-in-2020-8bf9dee61111',
    likes: 5,
  },
  {
    title: 'Array.prototype.reduce()',
    author: 'MDN',
    url:
			'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    likes: 200,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
