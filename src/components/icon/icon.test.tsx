import React from 'react'
import {render} from '@testing-library/react'
import Icon from './icon'

describe('icon component should be mounted', () => {
  test('icon component should be render in screen', () => {
    const {container} = render(<Icon className="icon-user" />) 
    const iconElement = container.querySelector('i')
    expect(iconElement).toBeInTheDocument()
  })
})


describe('icon component class names', () => {
  const {container} = render(<Icon className="icon-user xxx" />) 
  const iconElement = container.querySelector('i')
  test('icon component should have custom class names', () => {
    expect(iconElement).toHaveClass('xxx')
  })

  test('icon component should have correct icon class name', () => {
    expect(iconElement).toHaveClass('icon-user')
  })
})


describe('icon component styles', () => {
  const {container} = render(<Icon className="icon-info" size={20} color="red"/>) 
  const iconElement = container.querySelector('i')

  test('icon component should have correct size', () => {
    expect(iconElement).toHaveStyle('font-size: 20px')
    expect(iconElement).toHaveStyle('color: red')
  })
})
