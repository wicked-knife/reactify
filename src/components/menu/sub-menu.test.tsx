import React from 'react'
import {render} from '@testing-library/react'
import Menu from './index'

describe('SubMenu component should mount', () => {
    test('SubMenu component should be rendered in screen', () => {
        const {container} = render(<Menu.SubMenu></Menu.SubMenu>)
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
        const { container } = render(<Menu.SubMenu className="custom-sub-menu"></Menu.SubMenu>)
        const menuElement = container!.querySelector('.rf-sub-menu')
        expect(menuElement).toHaveClass('rf-sub-menu custom-sub-menu')
    })
})

describe('SubMenu component children', () => {
    test('SubMenu component children should be rendered', () => {
        const { queryByText } = render(<Menu.SubMenu> <span>hello world</span> </Menu.SubMenu>)
        const target = queryByText('hello world')
        expect(target).toBeInTheDocument()
    })
})


describe('SubMenu component title props', () => {
    test('SubMenu title should be rendered as a string when passing a string type', () => {
        const { queryByText } = render(<Menu.SubMenu title="hello world"></Menu.SubMenu>)
        const target = queryByText('hello world')
        expect(target).toBeInTheDocument()
        expect(target).toHaveClass('menu-subtitle')
    })
    test('SubMenu title should be rendered as a Node when passing a React.Node type', () => {
        const { queryByText } = render(<Menu.SubMenu title={<span className="custom-node">hello world</span>}></Menu.SubMenu>)
        const target = queryByText('hello world')
        expect(target).toBeInTheDocument()
        expect(target).toHaveClass('custom-node')
        expect(target).not.toHaveClass('menu-subtitle')
    })
})
