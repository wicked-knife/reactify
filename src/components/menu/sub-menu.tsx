import React, { forwardRef, ForwardRefRenderFunction, HTMLAttributes, ReactNode } from 'react'
import Icon from '../icon'
import useClassnames from 'classnames'

export interface SubMenuProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title?: string | ReactNode,
    icon?: ReactNode
}

const BaseSubMenu: ForwardRefRenderFunction<any, SubMenuProps> = ({
    title,
    icon,
    className,
    children
}, ref) => {
    const computedClassnames = useClassnames(
        'rf-sub-menu',
        className
    )
    return <div className={computedClassnames} ref={ref}>
        <div className="menu-subtitle">
            {icon && <div className="icon-wrapper">
                {icon}
            </div>}
            {title}
            <div className="menu-arrow">
                <Icon className="icon-arrow_down" />
            </div>
        </div>
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
