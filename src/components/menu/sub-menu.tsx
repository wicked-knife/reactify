import React, {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
  useState,
  useCallback,
  useContext,
  useRef,
  FunctionComponentElement,
} from 'react'
import Icon from '../icon'
import useClassnames from 'classnames'
import { MenuContext } from './index'
import { CSSTransition } from 'react-transition-group'
import {MenuItemProps} from './item'
export interface SubMenuProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string | ReactNode
  icon?: ReactNode
  defaultOpen?: boolean
}

type SubMenuChild = FunctionComponentElement<MenuItemProps>

const BaseSubMenu: ForwardRefRenderFunction<any, SubMenuProps> = (
  { title, icon, defaultOpen, className, children },
  ref
) => {
  const computedClassnames = useClassnames('rf-sub-menu', className)

  const { mode } = useContext(MenuContext)

  const [open, setOpen] = useState(defaultOpen)

  const toggleOpen = useCallback(() => setOpen(prev => !prev), [])

  const nodeRef = useRef(null)

  const renderChildren = () => {
    const validDisplayName = 'MenuItem'
    return React.Children.map(children, (child, index) => {
      const childElement = (child as SubMenuChild)
      if(!childElement.type ||
         !childElement.type.displayName ||
          childElement.type.displayName !== validDisplayName) {
        return console.warn('Warning: Menu.SubMenu component child should be Menu.Item')
      }
      if(childElement.type.displayName === validDisplayName) {
        return child
      }
    })
  }

  return (
    <div className={computedClassnames} ref={ref}>
      <div className='menu-subtitle' onClick={toggleOpen}>
        {icon && <div className='icon-wrapper'>{icon}</div>}
        {title}
        {mode === 'vertical' && (
          <div className={`menu-arrow ${open ? 'is-open' : ''}`}>
            <Icon className='icon-arrow_down' />
          </div>
        )}
      </div>
      <CSSTransition
        timeout={300}
        classNames='menu'
        in={open}
        nodeRef={nodeRef}
        unmountOnExit>
        <ul ref={nodeRef} className="menu-item-list">{renderChildren()}</ul>
      </CSSTransition>
    </div>
  )
}

const SubMenu = forwardRef(BaseSubMenu)

SubMenu.defaultProps = {
  title: '',
  defaultOpen: true,
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
