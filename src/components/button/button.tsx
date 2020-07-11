import React from 'react'
import useClassNames from 'classnames'
import './button.scss'

export type ButtonType = 'default' | 'primary' | 'danger' | 'text' | 'success' | 'warning'
type ButtonSize = 'small' | 'medium' | 'large'

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  block?: boolean
  disabled?: boolean
  className?: string
  buttonType?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
}

type ButtonProps = BaseButtonProps  

const Button: React.FC<ButtonProps> = ({
  block,
  disabled,
  className,
  children,
  buttonType,
  size,
  plain,
  round,
  ...props
}) => {
  const computedClassNames = useClassNames(
    {
      'rf-btn': true,
      [`rf-btn-${buttonType}`]: buttonType,
      'is-block': block,
      'is-disabled': disabled,
      [`rf-btn-${size}`]: true,
      [`is-plain`]: plain,
      'rf-btn-round': round
    },
    className
  )

  return <button className={computedClassNames} {...props}><span className='rf-btn-span'>{children}</span></button>
}

Button.defaultProps = {
  block: false,
  buttonType: 'default',
  size: 'medium',
  plain: false,
  round: false,
  disabled: false
}

export default Button
