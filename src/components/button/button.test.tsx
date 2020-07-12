import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonType, ButtonSize } from './button'
const buttonTypeList: Array<ButtonType> = [
  'primary',
  'danger',
  'default',
  'success',
  'text',
  'warning',
]

describe('button component should be mounted', () => {
  test('button component should be render in screen', () => {
    const { container } = render(<Button>test</Button>)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button!.tagName).toBe('BUTTON')
  })
})

describe('should button component click event be fired', () => {
  test('button component click event should be fired', () => {
    const handleClick = jest.fn()
    const { container } = render(<Button onClick={handleClick}>test</Button>)
    const button = container.querySelector('button')

    fireEvent.click(button!)
    expect(handleClick).toBeCalled()
    expect(handleClick).toBeCalledTimes(1)
  })

  test('disabled button component click event should not be fired', () => {
    const handleClick = jest.fn()
    const { container } = render(
      <Button onClick={handleClick} disabled>
        test
      </Button>
    )
    const button = container.querySelector('button')

    fireEvent.click(button!)
    expect(button!.disabled).toBe(true)
    expect(handleClick).not.toBeCalled()
  })
})

describe('button class names', () => {
  test('button component should have corrent buttonType class names', () => {
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
      expect(buttonElement).toHaveClass(
        'rf-btn',
        'rf-btn-default',
        'rf-btn-' + buttonSize
      )
    })
  })

  test('plain button component should have correct plain styles', () => {
    buttonTypeList.forEach(buttonType => {
      const { container } = render(
        <Button plain buttonType={buttonType}>
          {buttonType}
        </Button>
      )
      const buttonElement = container.querySelector('button')

      expect(buttonElement).toHaveClass(
        'rf-btn',
        'rf-btn-' + buttonType,
        'rf-btn-medium',
        'is-plain'
      )
    })
  })

  test('disabled button component should have correct disabled styles', () => {
    buttonTypeList.forEach(buttonType => {
      const { container } = render(
        <Button disabled buttonType={buttonType}>
          {buttonType}
        </Button>
      )
      const buttonElement = container.querySelector('button')

      expect(buttonElement).toHaveClass(
        'rf-btn',
        'rf-btn-' + buttonType,
        'rf-btn-medium',
        'is-disabled'
      )
    })
  })

  test('disabled plain button component should have correct disabled styles', () => {
    buttonTypeList.forEach(buttonType => {
      const { container } = render(
        <Button disabled plain buttonType={buttonType}>
          {buttonType}
        </Button>
      )
      const buttonElement = container.querySelector('button')

      expect(buttonElement).toHaveClass(
        'rf-btn',
        'rf-btn-' + buttonType,
        'rf-btn-medium',
        'is-disabled',
        'is-plain'
      )
    })
  })
})
