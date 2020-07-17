import React from 'react'
import { render } from '@testing-library/react'
import Menu from './menu'

describe('Menu component should mount', () => {
    test('Menu component should render in screen', () => {
        const { container } = render(<Menu mode="horizontal"></Menu>)
        const menuElement = container!.querySelector('.rf-menu')
        expect(menuElement).toBeInTheDocument()
    })
})

describe('Menu component class names', () => {
    test('Menu component should have correct class names', () => {
        const { container } = render(<Menu mode="horizontal"></Menu>)
        const menuElement = container!.querySelector('.rf-menu')
        expect(menuElement).toHaveClass('rf-menu is-horizontal')
    })

    test('Menu component should have custom class names', () => {
        const { container } = render(<Menu className="custom-menu"></Menu>)
        const menuElement = container!.querySelector('.rf-menu')
        expect(menuElement).toHaveClass('rf-menu is-vertical custom-menu')
    })
})

describe('Menu component children', () => {
    test('Menu component children should be rendered', () => {
        const { queryByText } = render(<Menu mode="horizontal"> <span>hello world</span> </Menu>)
        const target = queryByText('hello world')
        expect(target).toBeInTheDocument()
    })
})
