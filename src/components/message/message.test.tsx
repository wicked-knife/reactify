import React from 'react'
import { render } from '@testing-library/react'
import Message, { MessageType } from './index'

const messageTypeList: Array<MessageType> = [
  'info',
  'error',
  'success',
  'warning',
]

describe('message component should be mounted', () => {
  test('message component should be rendered in screen', () => {
    const { container } = render(<Message />)
    const messageElement = container.querySelector('div.rf-message')
    expect(messageElement).toBeInTheDocument()
  })

  test('message component children should be rendered in screen', () => {
    const messageText = 'hello world'
    const { queryByText } = render(<Message>{messageText}</Message>)
    const textNode = queryByText(messageText)
    expect(textNode).toBeInTheDocument()
  })
})

describe('message component class name', () => {
  test('message component should have custom class names', () => {
    const { container } = render(<Message className='custom-message' />)
    const messageElement = container.querySelector('div.rf-message')
    expect(messageElement).toHaveClass('custom-message')
  })

  test('message component should have correct class names', () => {
    messageTypeList.forEach(messageType => {
      const { container } = render(<Message type={messageType} />)
      const messageElement = container.querySelector('div.rf-message')
      expect(messageElement).toHaveClass(
        'rf-message',
        `rf-message-${messageType}`
      )
    })
  })
})

describe('message functional call', () => {
  test('call message.info function message component should be rendered', () => {
    Message.info('hello world')
    /**
     * component internal render is async
     */
    setTimeout(() => {
      const messageElement = document.querySelector('.rf-message')
      expect(messageElement).toBeInTheDocument()
    }, 0)
  })

  test('when calling message.info function, component will auto unmount after 1500ms', () => {
    Message.info('hello world')
    setTimeout(() => {
      const messageElement = document.querySelector('.rf-message')
      expect(messageElement).not.toBeInTheDocument()
    }, 1500)
  })

  test('message component should show correct message', () => {
    const text = 'hello world'
    Message.info(text)
    setTimeout(() => {
      const textWrapper = document.querySelector('.rf-message .message-content')
      expect(textWrapper!.textContent).toBe(text)
    }, 0)
  })

  test('message component should exist correct duration', () => {
    Message.info({ message: 'hello world', duration: 500 })
    setTimeout(() => {
      const messageElement = document.querySelector('.rf-message')
      expect(messageElement).toBeInTheDocument()
    }, 0)

    setTimeout(() => {
      const messageElement = document.querySelector('.rf-message')
      expect(messageElement).not.toBeInTheDocument()
    }, 500)
  })
})
