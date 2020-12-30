const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((acc, curr) => (acc.likes < curr.likes ? curr : acc));

const mostBlogs = (blogs) => _.chain(blogs)
  .groupBy('author')
  .map((v, i) => ({
    author: i,
    blogs: v.length,
  }))
  .reduce((acc, curr) => (acc.blogs < curr.blogs ? curr : acc))
  .value();

const mostLikes = (blogs) => _.chain(blogs)
  .groupBy('author')
  .map((v, i) => ({
    author: i,
    likes: totalLikes(v),
  }))
  .reduce((acc, curr) => (acc.like < curr.blogs ? curr : acc))
  .value();

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
