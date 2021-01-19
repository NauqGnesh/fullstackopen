import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm/> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const form = container.querySelector('form')
  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url')

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' },
  })

  fireEvent.change(authorInput, {
    target: { value: 'Ryan' },
  })

  fireEvent.change(urlInput, {
    target: { value: 'www.wtf.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  )
  expect(createBlog.mock.calls[0][0].author).toBe('Ryan')
  expect(createBlog.mock.calls[0][0].url).toBe('www.wtf.com')
})
