import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
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
      <Menu>
        <Menu.Item>hello world</Menu.Item>
        <Menu.SubMenu defaultOpen>
          <Menu.Item>menu 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
    
      const target = queryByText('hello world')
      const target2 = queryByText('menu 1')
      expect(target).toBeInTheDocument()
      expect(target2).toBeInTheDocument()
  })

  test('Count of Menu component child should be correct', () => {
    const { container } = render(
      <Menu>
        <Menu.Item>hello world</Menu.Item>
        <Menu.SubMenu defaultOpen>
          <Menu.Item>menu 1</Menu.Item>
          <Menu.Item>menu 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
    const menuItems = container.querySelectorAll('.rf-menu-item')
    expect(menuItems.length).toBe(3)
    cleanup()
  })

  test('Correct Menu.Item component should be activated', () => {
    const { queryByText } = render(
      <Menu defaultSelectedKey={0}>
        <Menu.Item>hello world</Menu.Item>
        <Menu.SubMenu defaultOpen>
          <Menu.Item>menu 1</Menu.Item>
          <Menu.Item>menu 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
    const defaultActive = queryByText('hello world')
    expect(defaultActive).toHaveClass('is-active')
    const menu2 = queryByText('menu 2')
    fireEvent.click(menu2!)
    expect(menu2).toHaveClass('is-active')
    expect(defaultActive).not.toHaveClass('is-active')
    cleanup()
  })
})

describe('horizontal Menu', () => {
  const { container, queryByText } = render(
    <Menu mode='horizontal'>
      <Menu.SubMenu title='subMenu-1'>
        <Menu.Item>menu 1</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title='subMenu-2' defaultOpen>
        <Menu.Item>menu 2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
  const menu1 = queryByText('menu 1') 
  const menu2 = queryByText('menu 2')

  test('horizontal Menu should not have arrow icon', () => {
    const IconElement = container.querySelector('i.icon-arrow_down')
    expect(IconElement).toBe(null)
  })

  test('subMenu children should not be rendered if it is fold', () => {
      expect(menu1).not.toBeInTheDocument()
      setTimeout(() => {
        expect(menu2).toBeInTheDocument()
      }, 300);
      cleanup()
  })

  test('subMenu should open if mouseenter subMenu', () => {
    setTimeout(() => {
      const subMenu1 = container.querySelector('.rf-sub-menu')
      fireEvent.mouseEnter(subMenu1!)
      expect(menu1).toBeInTheDocument()
      cleanup()
    }, 300);
  })
  
  test('subMenu should fold if mouseleave subMenu', () => {
    setTimeout(() => {
      const subMenu2 = container.querySelectorAll('rf-sub-menu')[1]
      fireEvent.mouseLeave(subMenu2!)
      expect(menu2).not.toBeInTheDocument()
      cleanup()
    }, 300);
  })
})
