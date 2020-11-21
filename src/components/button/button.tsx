import React, {ForwardRefRenderFunction, ButtonHTMLAttributes, forwardRef} from 'react';
import useClassNames from 'classnames';
import './button.scss';

export type ButtonType =
  | 'default'
  | 'primary'
  | 'danger'
  | 'text'
  | 'success'
  | 'warning'
export type ButtonSize = 'small' | 'medium' | 'large'

interface BaseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLElement>, 'type'> {
  block?: boolean
  disabled?: boolean
  className?: string
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLElement>['type']
}

type ButtonProps = BaseButtonProps

const BaseButton: ForwardRefRenderFunction<any, ButtonProps> = (
    {
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
    },
    propRef,
) => {
  const computedClassNames = useClassNames(
      ['rf-btn', `rf-btn-${type}`, `rf-btn-${size}`],
      {
        'is-block': block,
        'is-disabled': disabled,
        'is-plain': plain,
        'rf-btn-round': round,
      },
      className,
  );

  return (
    <button
      {...props}
      className={computedClassNames}
      disabled={disabled}
      type={htmlType}
      ref={propRef}>
      <span className='rf-btn-span'>{children}</span>
    </button>
  );
};

const Button = forwardRef<any, ButtonProps>(BaseButton);

Button.defaultProps = {
  block: false,
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  disabled: false,
  htmlType: 'button',
};

export default Button;
