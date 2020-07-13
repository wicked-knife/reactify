import React from 'react'
import useClassNames from 'classnames'
import './button.scss'

export type ButtonType = 'default' | 'primary' | 'danger' | 'text' | 'success' | 'warning'
export type ButtonSize = 'small' | 'medium' | 'large'


interface BaseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'> {
  block?: boolean
  disabled?: boolean
  className?: string
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean,
  htmlType?: React.ButtonHTMLAttributes<HTMLElement>['type']
}

type ButtonProps = BaseButtonProps  

const Button: React.FC<ButtonProps> = ({
  block,
  disabled,
  className,
  children,
  type,
  size,
  plain,
  round,
  htmlType,
  ...props
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

  return <button className={computedClassNames} {...props} disabled={disabled} type={htmlType}><span className='rf-btn-span'>{children}</span></button>
}

Button.defaultProps = {
  block: false,
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  disabled: false,
  htmlType: 'button'
}

export default Button
