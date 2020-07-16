import Message from './index'

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

describe('message close function call', () => {
  test('message functional call should return a close function', () => {
    const closeFunc = Message('hello world')
    expect(Object.prototype.toString.call(closeFunc)).toBe('[object Function]')
  })

  test('message will close and DOM will remove when call close function', () => {
    const closeFunc = Message({message: 'hello world', duration: 2000})
    setTimeout(() => {
      const messageElement = document.querySelector('.rf-message')
      expect(messageElement).toBeInTheDocument()
      closeFunc()
    }, 0)

    setTimeout(() => {
      const messageElement = document.querySelector('.rf-message')
      expect(messageElement).toBeNull()
    }, 100);
  })
})
