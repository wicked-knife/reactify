import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Menu from './menu'
import MenuItem from './item'

describe('MenuItem click event', () => {
  test('MenuItem click event should be fired', () => {
    const clickHandler = jest.fn()
    const {queryByText} = render(<Menu>
      <MenuItem onClick={clickHandler}>click me</MenuItem>
    </Menu>)
    const element = queryByText('click me')
    fireEvent.click(element!)
    expect(clickHandler).toBeCalled()
    expect(clickHandler).toBeCalledTimes(1)
    expect(element).toHaveClass('is-active')
  })

  test('MenuItem click handler should receive click event as first argument', () => {
    const clickHandler = (event: React.MouseEvent) => {
      expect(event).toBeTruthy()
    }
    const {queryByText} = render(<Menu>
      <MenuItem onClick={clickHandler}>click me</MenuItem>
    </Menu>)

    fireEvent.click(queryByText('click me')!)
  })
})

describe('Disabled MenuItem', () => {
  const clickHandler = jest.fn()
  const {queryByText} = render(<Menu>
    <MenuItem onClick={clickHandler} disabled>disabled</MenuItem>
  </Menu>)
  const menuItem = queryByText('disabled')
  test('Disabled MenuItem should have correct class name', () => {
    expect(menuItem).toHaveClass('rf-menu-item', 'is-disabled')
  })
  
  test('Disabled MenuItem click event should be triggered', () => {
    fireEvent.click(menuItem!)
    expect(clickHandler).not.toBeCalled()
    expect(menuItem).not.toHaveClass('is-active')
  })
})
