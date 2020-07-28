import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Menu from './menu'

describe('Menu component should mount', () => {
  test('Menu component should render in screen', () => {
    const { container } = render(<Menu mode='horizontal'></Menu>)
    const menuElement = container!.querySelector('.rf-menu')
    expect(menuElement).toBeInTheDocument()
  })
})

describe('Menu component class names', () => {
  test('Menu component should have correct class names', () => {
    const { container } = render(<Menu mode='horizontal'></Menu>)
    const menuElement = container!.querySelector('.rf-menu')
    expect(menuElement).toHaveClass('rf-menu is-horizontal')
  })

  test('Menu component should have custom class names', () => {
    const { container } = render(<Menu className='custom-menu'></Menu>)
    const menuElement = container!.querySelector('.rf-menu')
    expect(menuElement).toHaveClass('rf-menu is-vertical custom-menu')
  })
})

describe('Menu component children', () => {
  test('Menu component children should not be rendered if children is invalid', () => {
    const { queryByText } = render(
      <Menu mode='horizontal'>
        <span>hello world</span>
      </Menu>
    )
    const target = queryByText('hello world')
    expect(target).not.toBeInTheDocument()
  })

  test('Menu component children should be rendered if children is valid', () => {
    const { queryByText } = render(
      <Menu mode='horizontal'>
        <Menu.Item>hello world</Menu.Item>
        <Menu.SubMenu>
          <Menu.Item>menu 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
    const target = queryByText('hello world')
    const target2 = queryByText('menu 1')
    expect(target).toBeInTheDocument()
    expect(target2).toBeInTheDocument()
  })
})

describe('horizontal Menu', () => {
  test('horizontal Menu should not have arrow icon', () => {
    const { container } = render(
      <Menu mode='horizontal'>
        <Menu.SubMenu title='subMenu-1'>
          <Menu.Item>menu 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )

    const IconElement = container.querySelector('i.icon-arrow_down')
    expect(IconElement).toBe(null)
  })
})
