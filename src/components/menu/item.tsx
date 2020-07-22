import React, { ForwardRefRenderFunction, HTMLAttributes, forwardRef, useContext } from 'react'
import useClassNames from 'classnames'
import { MenuContext } from './menu'

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
    const foo = useContext(MenuContext)
    return <div ref={ref} className={computedClassNames}>
        {children}
    </div>
}

const MenuItem = forwardRef(BaseMenuItem)

MenuItem.defaultProps = {

}

export default MenuItem
