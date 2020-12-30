const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('total likes', () => {
  const listOfBlog = [
    {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listOfBlog);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('total blogs by author', () => {
  const listOfBlog = [
    {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      author: 'Edsger W. Dijkstra',
    },
    {
      author: 'Robert C. Martin',
    },
    {
      author: 'Robert C. Martin',
    },
    {
      author: 'Robert C. Martin',
    },
    {
      author: 'Robert C. Martin',
    },
    {
      author: 'Robert C. Martin',
    },
  ];

  test('robert martin is a joke', () => {
    const result = listHelper.mostBlogs(listOfBlog);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 5,
    });
  });
});

describe('most liked author', () => {
  const listOfBlog = [
    {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      author: 'Edsger W. Dijkstra',
      likes: 0,
    },
    {
      author: 'Robert C. Martin',
      likes: 0,
    },
    {
      author: 'Robert C. Martin',
      likes: 0,
    },
    {
      author: 'Robert C. Martin',
      likes: 0,
    },
    {
      author: 'Robert C. Martin',
      likes: 0,
    },
    {
      author: 'Robert C. Martin',
      likes: 0,
    },
  ];

  test('Dijkstras ftw', () => {
    const result = listHelper.mostLikes(listOfBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
