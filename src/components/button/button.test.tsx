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
        <Button type={buttonType}>{buttonType}</Button>
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
        <Button plain type={buttonType}>
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
        <Button disabled type={buttonType}>
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
        <Button disabled plain type={buttonType}>
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

  test('round button should have correct styles', () => {
    buttonTypeList.forEach(buttonType => {
      const { container } = render(
        <Button round type={buttonType}>
          {buttonType}
        </Button>
      )
      const buttonElement = container.querySelector('button')

      expect(buttonElement).toHaveClass(
        'rf-btn',
        'rf-btn-' + buttonType,
        'rf-btn-medium',
        'rf-btn-round'
      )
    })
  })

  test('block button should have correct styles', () => {
    buttonTypeList.forEach(buttonType => {
      const { container } = render(
        <Button block type={buttonType}>
          {buttonType}
        </Button>
      )
      const buttonElement = container.querySelector('button')

      expect(buttonElement).toHaveClass(
        'rf-btn',
        'rf-btn-' + buttonType,
        'rf-btn-medium',
        'is-block'
      )
    })
  })

  test('button component should have custom class name', () => {
    const {container} = render(<Button className='custom-btn'>custom</Button>)
    const buttonElement = container.querySelector('button')

    expect(buttonElement).toHaveClass('rf-btn', 'rf-btn-default', 'rf-btn-medium', 'custom-btn')
  })
  
})

describe('button component htmlType', () => {
  test('button component should have correct button native type', () => {
    const {container} = render(<Button>button</Button>)
    const buttonElement = container.querySelector('button')

    expect(buttonElement!.type).toBe('button')
  })

  test('button component should have correct button native type', () => {
    const {container} = render(<Button htmlType="submit">button</Button>)
    const buttonElement = container.querySelector('button')

    expect(buttonElement!.type).toBe('submit')
  })
})
