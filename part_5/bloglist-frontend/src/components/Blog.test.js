import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Createblog from './Createblog'
describe('tests for the blogs', () => {
  const user ={
    username:'gulam moyuddin',
    name:'Gulam Moyuddin'
  }
  const blog={
    title:'this is it',
    author:'gmd',
    url:'go.com',
    likes:2,
    user:user
  }
  test('test for title and author',async () => {
    render(<Blog blog={blog} user={user}/>)
    const element =screen.getByText('this is it gmd')
    expect(element).toBeDefined()
  })
  test('test for extra info',async () => {
    render(<Blog blog={blog} user={user} />)
    const use=userEvent.setup()
    const button=screen.getByText('view')
    await use.click(button)
    const element1 = screen.getByText('go.com')
    expect(element1).toBeDefined()
    const element2=screen.getByText('2',{ exact:false } )
    expect(element2).toBeDefined()
  })
  test('test for like button',async () => {
    const mockhandler=jest.fn()
    render(<Blog blog={blog} user={user} handleupdate={mockhandler}/>)
    const use = userEvent.setup()
    const button=screen.getByText('view')
    await use.click(button)
    const button1=screen.getByText('like')
    await use.click(button1)
    await use.click(button1)
    expect(mockhandler.mock.calls).toHaveLength(2)
  })
})

describe('test for new blog',() => {
  test('test for creating blog',async () => {
    const mockhandler=jest.fn()
    const user=userEvent.setup()
    render(<Createblog handlecreate={mockhandler}/>)
    const input1=screen.getByPlaceholderText('write title here')
    const input2=screen.getByPlaceholderText('write author here')
    const input3=screen.getByPlaceholderText('write url here')
    const button=screen.getByText('create')
    await user.type(input1,'this is test')
    await user.type(input2,'gmd')
    await user.type(input3,'go.com')
    await user.click(button)
    expect(mockhandler.mock.calls).toHaveLength(1)
    expect(mockhandler.mock.calls[0][0]).toBe('this is test')
    expect(mockhandler.mock.calls[0][1]).toBe('gmd')
    expect(mockhandler.mock.calls[0][2]).toBe('go.com')
  })
})