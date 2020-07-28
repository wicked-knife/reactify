import React, { ForwardRefRenderFunction, HTMLAttributes, forwardRef } from 'react'
import useClassNames from 'classnames'

export interface MenuItemProps extends HTMLAttributes<HTMLElement> {

}

const BaseMenuItem: ForwardRefRenderFunction<any, MenuItemProps> = ({
    className,
    children
}, ref) => {
    const computedClassNames = useClassNames(
        'rf-menu-item',
        className
    )
    return <div ref={ref} className={computedClassNames}>
        {children}
    </div>
}

const MenuItem = forwardRef(BaseMenuItem)

MenuItem.defaultProps = {

}

MenuItem.displayName = 'MenuItem'

export default MenuItem
