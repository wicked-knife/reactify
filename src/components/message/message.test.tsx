import React from 'react'
import { render } from '@testing-library/react'
import Message, {MessageType} from '../message/message'
const messageTypeList: Array<MessageType> = ['info', 'error', 'success', 'warning']

describe('message component should be mounted', () => {
    test('message component should be rendered in screen', () => {
        const {container} = render(<Message />)
        const messageElement = container.querySelector('div.rf-message')
        expect(messageElement).toBeInTheDocument()
    })

    test('message component children should be rendered in screen', () => {
        const messageText = 'hello world'
        const {queryByText} = render(<Message>{messageText}</Message>)
        const textNode = queryByText(messageText)
        expect(textNode).toBeInTheDocument()
    })
})

describe('message component class name', () => {
    test('message component should have custom class names', () => {
        const {container} = render(<Message className="custom-message" />)
        const messageElement = container.querySelector('div.rf-message')
        expect(messageElement).toHaveClass('custom-message')
    })

    test('message component should have correct class names', () => {
        messageTypeList.forEach(messageType => {
            const {container} = render(<Message type={messageType} />)
            const messageElement = container.querySelector('div.rf-message')
            expect(messageElement).toHaveClass('rf-message', `rf-message-${messageType}`)
        })
    })
})
