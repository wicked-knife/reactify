import React, { ForwardRefRenderFunction, HTMLAttributes, CSSProperties, forwardRef } from 'react'
import useClassNames from 'classnames'
import './icon.scss'

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string
  size?: number | string
  className?: string
  style?: CSSProperties
}

const BaseIcon: ForwardRefRenderFunction<any, IconProps> = (
  { color, size, className, style, children, ...props },
  ref
) => {
  const computedClassNames = useClassNames('iconfont', 'rf-icon', className)

  const styles: CSSProperties = {
    ...style,
    fontSize: size,
    color,
  }

  return (
    <i ref={ref} className={computedClassNames} style={styles} {...props} />
  )
}

const Icon = forwardRef(BaseIcon)

Icon.defaultProps = {
  size: 16
}

export default Icon
