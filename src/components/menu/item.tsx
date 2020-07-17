import React, { ForwardRefRenderFunction, HTMLAttributes, forwardRef, useContext } from 'react'
import { MenuContext } from './menu'

export interface MenuItemProps extends HTMLAttributes<HTMLElement> {

}

const BaseMenuItem: ForwardRefRenderFunction<any, MenuItemProps> = ({
    className,
    children
}, ref) => {
    const foo = useContext(MenuContext)
    return <div ref={ref}>
        {children}
    </div>
}

const MenuItem = forwardRef(BaseMenuItem)

MenuItem.defaultProps = {

}

export default MenuItem
