import React from 'react'
import useClassNames from 'classnames'
import './button.scss'

export type ButtonType = 'default' | 'primary' | 'danger' | 'link' | 'text' | 'success'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  disabled?: boolean
  className?: string
  onClick?: React.EventHandler<React.MouseEvent>
}

const Button: React.FC<ButtonProps> = ({
  type,
  size,
  plain,
  round,
  disabled,
  className,
  children,
  onClick
}) => {
  const computedClassNames = useClassNames(
    {
      'rf-btn': true,
      [`rf-btn-${type}`]: !plain,
      'rf-btn-disabled': disabled,
      [`rf-btn-${size}`]: true,
      [`rf-btn-${type}-plain`]: plain,
      'rf-btn-round': round
    },
    className
  )

  return <button className={computedClassNames} onClick={onClick}><span className='rf-btn-text'>{children}</span></button>
}

Button.defaultProps = {
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  disabled: false
}

export default Button
