import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  function addBlog(event) {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
				title:
        <input
          type="text"
          value={title}
          className="title"
          id="title"
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
				author:
        <input
          type="text"
          value={author}
          name="author"
          id="author"
          className="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
				url:
        <input
          type="text"
          value={url}
          className="url"
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="addblog-btn" type="submit">
				create
      </button>
    </form>
  )
}

export default BlogForm
