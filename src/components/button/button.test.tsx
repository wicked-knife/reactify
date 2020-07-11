import React from 'react'
import { render } from '@testing-library/react'
import Button, { ButtonType, ButtonSize } from './button'

describe('button component should be mounted', () => {
  test('button component should be render in screen', () => {
    const { container } = render(<Button>test</Button>)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button!.tagName).toBe('BUTTON')
  })
})

describe('button class names', () => {
  test('button component should have corrent buttonType class names', () => {
    const buttonTypeList: Array<ButtonType> = [
      'primary',
      'danger',
      'default',
      'success',
      'text',
      'warning',
    ]
    buttonTypeList.forEach(buttonType => {
      const { container } = render(
        <Button buttonType={buttonType}>{buttonType}</Button>
      )
      const buttonElement = container.querySelector('button')
      expect(buttonElement).toHaveClass(
        'rf-btn',
        'rf-btn-' + buttonType,
        'rf-btn-medium'
      )
    })
  })

  test('button component should have correct button size', () => {
    const buttonSizeList: Array<ButtonSize> = ['medium', 'large', 'small']
    buttonSizeList.forEach(buttonSize => {
      const { container } = render(
        <Button size={buttonSize}>{buttonSize}</Button>
      )
      const buttonElement = container.querySelector('button')
      expect(buttonElement).toHaveClass('rf-btn', 'rf-btn-default', 'rf-btn-' + buttonSize)
    })
  })
})
