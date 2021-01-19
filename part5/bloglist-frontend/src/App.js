import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  async function handleLogin(event) {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  async function addBlog(blogObject) {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })
    setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author}`)
    setMessageType('error success')
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType('error')
    }, 5000)
  }

  function handleDelete(obj) {
    return () => {
      if (window.confirm(`Remove blog ${obj.title} by ${obj.author}`)) {
        let flag = true
        console.log(obj.id)
        blogService
          .remove(obj.id)
          .catch((err) => {
            console.log(err)
            flag = false
            setErrorMessage('Blog was already deleted')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .finally(() => {
            if (flag) {
              setBlogs(blogs.filter((p) => p.id !== obj.id))
              setErrorMessage(`Deleted ${obj.title}`)
              setMessageType('error success')
              setTimeout(() => {
                setErrorMessage(null)
                setMessageType('error')
              }, 5000)
            }
          })
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
				username
        <input
          type="text"
          value={username}
          name="Username"
          id="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
				password
        <input
          type="password"
          value={password}
          name="Password"
          id="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
				login
      </button>
    </form>
  )

  function logout() {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const userDetails = () => (
    <div>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type={messageType} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type={messageType} />
      {userDetails()}
      <br />
      <Togglable
        buttonLabel="create new blog"
        revertLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div id="blog-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} deleteHandler={handleDelete} />
          ))}
      </div>
    </div>
  )
}

export default App
