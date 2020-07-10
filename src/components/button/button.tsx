import React from 'react'
import useClassNames from 'classnames'
import './button.scss'

export type ButtonType = 'default' | 'primary' | 'danger' | 'text' | 'success' | 'warning'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  block?: boolean
  disabled?: boolean
  className?: string
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  onClick?: React.EventHandler<React.MouseEvent>
}

const Button: React.FC<ButtonProps> = ({
  block,
  disabled,
  className,
  children,
  type,
  size,
  plain,
  round,
  onClick
}) => {
  const computedClassNames = useClassNames(
    {
      'rf-btn': true,
      [`rf-btn-${type}`]: type,
      'is-block': block,
      'is-disabled': disabled,
      [`rf-btn-${size}`]: true,
      [`is-plain`]: plain,
      'rf-btn-round': round
    },
    className
  )

  return <button className={computedClassNames} onClick={onClick}><span className='rf-btn-span'>{children}</span></button>
}

Button.defaultProps = {
  block: false,
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  disabled: false
}

export default Button
