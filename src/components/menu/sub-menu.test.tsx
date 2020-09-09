import React from 'react'
import { render, fireEvent} from '@testing-library/react'
import Menu from './index'

describe('SubMenu component should mount', () => {
  test('SubMenu component should be rendered in screen', () => {
    const { container } = render(<Menu.SubMenu></Menu.SubMenu>)
    const subMenuElement = container.querySelector('.rf-sub-menu')
    expect(subMenuElement).toBeInTheDocument()
  })
})

describe('SubMenu component class names', () => {
  test('Menu component should have correct class names', () => {
    const { container } = render(<Menu.SubMenu></Menu.SubMenu>)
    const menuElement = container!.querySelector('.rf-sub-menu')
    expect(menuElement).toHaveClass('rf-sub-menu')
  })

  test('SubMenu component should have custom class names', () => {
    const { container } = render(
      <Menu.SubMenu className='custom-sub-menu'></Menu.SubMenu>
    )
    const menuElement = container!.querySelector('.rf-sub-menu')
    expect(menuElement).toHaveClass('rf-sub-menu custom-sub-menu')
  })
})

describe('SubMenu component children', () => {
  test('SubMenu component children should not be rendered if children is invalid', () => {
    const { queryByText } = render(
      <Menu>
        <Menu.SubMenu>
          <span>hello world</span>
        </Menu.SubMenu>
      </Menu>
    )

    const target = queryByText('hello world')
    expect(target).not.toBeInTheDocument()
  })

  test('SubMenu component children should be rendered if children is valid', () => {
    const { queryByText } = render(
      <Menu>
        <Menu.SubMenu>
          <Menu.Item>hello world</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
    const target = queryByText('hello world')
    expect(target).not.toBeInTheDocument()

  })
})

describe('SubMenu component title props', () => {
  test('SubMenu title should be rendered as a string when passing a string type', () => {
    const { queryByText } = render(
      <Menu.SubMenu title='hello world'></Menu.SubMenu>
    )
    const target = queryByText('hello world')
    expect(target).toBeInTheDocument()
    expect(target).toHaveClass('menu-subtitle')
  })
  test('SubMenu title should be rendered as a Node when passing a React.Node type', () => {
    const { queryByText } = render(
      <Menu.SubMenu
        title={<span className='custom-node'>hello world</span>}></Menu.SubMenu>
    )
    const target = queryByText('hello world')
    expect(target).toBeInTheDocument()
    expect(target).toHaveClass('custom-node')
    expect(target).not.toHaveClass('menu-subtitle')
  })
})

describe('SubMenu default open', () => {
  test('SubMenu should be open by default', () => {
    const { container } = render(
      <Menu>
        <Menu.SubMenu title='subMenu-1' defaultOpen>
          <Menu.Item>menu 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )

    const IconElement = container.querySelector('.menu-arrow')
    expect(IconElement).toHaveClass('is-open')
  })

  test('SubMenu should be close if pass defaultOpen props false', () => {
    const { container } = render(
      <Menu.SubMenu title='subMenu-1' defaultOpen={false}>
        <Menu.Item>menu 1</Menu.Item>
      </Menu.SubMenu>
    )

    const IconElement = container.querySelector('.menu-arrow')
    expect(IconElement).not.toHaveClass('is-open')
  })
})

describe('SubMenu click toggle fold', () => {
  test('SubMenu click toggle fold', () => {
    const { container } = render(
      <Menu>
        <Menu.SubMenu title='subMenu-1'>
          <Menu.Item>menu 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
    setTimeout(() => {
      const element = container.querySelector('.menu-item-list')
      const subMenuElement = container.querySelector('.menu-subtitle')
      expect(element).toBeInTheDocument()
      fireEvent.click(subMenuElement!)
      expect(subMenuElement).not.toBeInTheDocument()
      fireEvent.click(subMenuElement!)
      expect(element).toBeInTheDocument()
    })
  })

})
