import React, { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from 'react'

export interface SubMenuProps extends HTMLAttributes<HTMLElement> {

}

const BaseSubMenu: ForwardRefRenderFunction<any, SubMenuProps> = ({
    className,
    children
}, ref) => {
    return <div className={className} ref={ref}>
        {children}
    </div>
}

const SubMenu = forwardRef(BaseSubMenu)

export default SubMenu
