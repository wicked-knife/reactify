import React, { forwardRef, ForwardRefRenderFunction, HTMLAttributes, ReactNode } from 'react'
import useClassnames from 'classnames'

export interface SubMenuProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title?: string | ReactNode
}

const BaseSubMenu: ForwardRefRenderFunction<any, SubMenuProps> = ({
    title,
    className,
    children
}, ref) => {
    const computedClassnames = useClassnames(
        'rf-sub-menu',
        className
    )
    return <div className={computedClassnames} ref={ref}>
        {typeof title === 'string' ? <div className="menu-subtitle">{title}</div> : title}
        <ul>
            {children}
        </ul>
    </div>
}

const SubMenu = forwardRef(BaseSubMenu)

SubMenu.defaultProps = {
    title: ''
}

export default SubMenu
