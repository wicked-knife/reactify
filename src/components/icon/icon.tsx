import React, { ForwardRefRenderFunction } from 'react'
import useClassNames from 'classnames'
import './icon.scss'

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  size?: number | string
  className?: string
  style?: React.CSSProperties
}


const BaseIcon: ForwardRefRenderFunction<any, IconProps> = ({
  color,
  size,
  className,
  style,
  ...props
}, ref) => {

  const computedClassNames = useClassNames('iconfont', 'rf-icon', className)

  const styles: React.CSSProperties = {
    ...style,
    fontSize: size,
    color,
  }

  return <i ref={ref} className={computedClassNames} style={styles} {...props}></i>
}

const Icon = React.forwardRef(BaseIcon)

Icon.defaultProps = {
  size: 16,
  color: '#333'
}

export default Icon
