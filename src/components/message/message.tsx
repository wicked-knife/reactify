import React from 'react'
import ReactDOM from 'react-dom'
import BaseMessage, { MessageType, Duration } from './base-message'
import './message.scss'

const BaseTop = 32

export type MessageOptions = {
  message?: string
  duration?: number
  onClose?: () => void
}

const defaults: MessageOptions = {
  message: '',
  duration: Duration,
  onClose: () => { },
}

interface MessageFunc {
  (opt: MessageOptions | string): Function
}

interface MessageInterface extends MessageFunc {
  info: MessageFunc,
  alert: MessageFunc,
  error: MessageFunc,
  warning: MessageFunc,
  warn: MessageFunc,
  success: MessageFunc,
  messageList: HTMLElement[]
}

const Message: MessageInterface = opt => {
  return renderComponent(mergeOptions(opt), 'info')
}

Message.messageList = []

/**
 * 计算 message 组件的top偏移量
 * @param messageList 
 */
const calcOffsetTop = (messageList : HTMLElement[]) : number => {
  const total = messageList.reduce((prevValue, curValue) => {
    return prevValue + curValue.offsetHeight
  }, 0)
  return (messageList.length + 1) * BaseTop + total
}

/**
 * 当有 message 从页面上移除时，自动更新页面上存在的 message 的top值
 * @param messageList 
 */
const updateOffsetTop = (messageList: HTMLElement[], deletedElement: HTMLElement) : void => {
  const deletedHeight = deletedElement.offsetHeight + BaseTop
  const deletedIndex = messageList.findIndex(el => el === deletedElement)
  messageList.forEach((element, index) => {
    if(index <= deletedIndex) {
      return
    }
    const currentOffsetTop = parseInt(element.style.top)
    element.style.top = currentOffsetTop - deletedHeight + 'px'
  })
}

const renderComponent = (options: MessageOptions, messageType: MessageType) : Function => {
  
  const container = document.createElement('div')
  const ref = React.createRef<HTMLElement>()
  const removeContainer = () => {
    updateOffsetTop(Message.messageList, ref.current!)
    const index = Message.messageList.findIndex(element => element === ref.current)
    Message.messageList.splice(index, 1)
    ReactDOM.unmountComponentAtNode(container)
    container.remove()
  }

  const offsetTop = calcOffsetTop(Message.messageList)

  ReactDOM.render(
    <BaseMessage type={messageType} onExited={removeContainer} duration={options.duration} style={{top: offsetTop}}
      ref={ref}>
      {options.message}
    </BaseMessage>,
    container,
    () => {
      setTimeout(() => {
        Message.messageList.push(ref.current!)
      })
    }
  )

  document.body.append(container)

  return removeContainer
}

const mergeOptions = (propOptions: MessageOptions | string): MessageOptions => {
  let options: MessageOptions = {}
  if (typeof propOptions === 'string') {
    options = { ...defaults, message: propOptions }
  } else {
    options = { ...defaults, ...propOptions }
  }
  return options
}


Message.alert = Message.info = Message

Message.error = opt => {
  return renderComponent(mergeOptions(opt), 'error')
}

Message.success = opt => {
  return renderComponent(mergeOptions(opt), 'success')
}

Message.warn = Message.warning = opt => {
  return renderComponent(mergeOptions(opt), 'warning')
}

export default Message
