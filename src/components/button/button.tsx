import React from 'react'
import useClassNames from 'classnames'
import './button.scss'

export type ButtonType = 'default' | 'primary' | 'danger' | 'link' | 'text' | 'success'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  className?: string
  onClick?: React.EventHandler<React.MouseEvent>
}

const Button: React.FC<ButtonProps> = ({
  type,
  size,
  disabled,
  className,
  children,
  onClick
}) => {
  const computedClassNames = useClassNames(
    {
      'rf-btn': true,
      [`rf-btn-${type}`]: true,
      'rf-btn-disabled': disabled,
      [`rf-btn-${size}`]: true
    },
    className
  )

  return <button className={computedClassNames} onClick={onClick}><span className='rf-btn-text'>{children}</span></button>
}

Button.defaultProps = {
  type: 'default',
  size: 'medium',
  disabled: false
}

export default Button
