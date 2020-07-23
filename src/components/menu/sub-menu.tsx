import React, { forwardRef, ForwardRefRenderFunction, HTMLAttributes, ReactNode, useState, useCallback, useMemo, useContext } from 'react'
import Icon from '../icon'
import useClassnames from 'classnames'
import {MenuContext} from './index'
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
    const {mode} = useContext(MenuContext)

    const [fold, setFold] = useState(false)
    const toggleFold = useCallback(() => setFold(prev => !prev), [])

    return <div className={computedClassnames} ref={ref}>
        <div className="menu-subtitle" onClick={toggleFold}>
            {icon && <div className="icon-wrapper">
                {icon}
            </div>}
            {title}
            {
                mode === 'vertical' &&
                <div className={`menu-arrow ${fold ? 'is-fold' : ''}`}>
                    <Icon className='icon-arrow_down' />
                </div>
            }
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
