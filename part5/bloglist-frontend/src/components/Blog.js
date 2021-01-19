import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, deleteHandler }) => {
  const [showContents, setShowContents] = useState(false)
  const [displayButtonName, setDisplayButtonName] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const toggleContents = () => {
    setShowContents(!showContents)
    if (showContents === false) {
      setDisplayButtonName('hide')
    } else {
      setDisplayButtonName('view')
    }
  }

  const blogContent = (showContents, blog) => {
    return showContents === true ? (
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          {likes} {<button onClick={increaseLikes(blog)}>like</button>}
          <br />
          {blog.user.name}
        </div>
        <div>
          <button onClick={deleteHandler(blog)}>delete</button>
        </div>
      </div>
    ) : null
  }

  function increaseLikes(blog) {
    return function inner() {
      const newBlog = { ...blog, likes: likes + 1 }
      blogService.update(blog.id, newBlog).then(setLikes(likes + 1))
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        {
          <button onClick={toggleContents} className="view">
            {displayButtonName}
          </button>
        }
        {blogContent(showContents, blog)}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
