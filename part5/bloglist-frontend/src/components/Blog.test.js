import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test blog',
    author: 'Ryan',
    likes: '9000',
    url: 'https://wtf.com',
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('Ryan')
  expect(component.container).not.toHaveTextContent('9000')
  expect(component.container).not.toHaveTextContent('https://wtf.com')
})

test('renders content after clicking view button', async () => {
  const blog = {
    title: 'test blog',
    author: 'Ryan',
    likes: '9000',
    url: 'https://wtf.com',
    user: { username: 'username', name: 'Jimmy Jiang' },
  }

  const mockHandler = jest.fn()
  const { getByText, container } = render(
    <Blog blog={blog} deleteHandler={mockHandler} />
  )

  const button = getByText('view')
  fireEvent.click(button)

  expect(container).toHaveTextContent('test blog')
  expect(container).toHaveTextContent('Ryan')
  expect(container).toHaveTextContent('9000')
  expect(container).toHaveTextContent('https://wtf.com')
})
