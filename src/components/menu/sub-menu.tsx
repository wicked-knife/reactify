import React, {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
  useState,
  useCallback,
  useContext,
  useRef,
} from 'react'
import Icon from '../icon'
import useClassnames from 'classnames'
import { MenuContext } from './index'
import { CSSTransition } from 'react-transition-group'
export interface SubMenuProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string | ReactNode
  icon?: ReactNode
  defaultOpen?: boolean
}

const BaseSubMenu: ForwardRefRenderFunction<any, SubMenuProps> = (
  { title, icon, defaultOpen, className, children },
  ref
) => {
  const computedClassnames = useClassnames('rf-sub-menu', className)

  const { mode } = useContext(MenuContext)

  const [open, setOpen] = useState(defaultOpen)

  const toggleOpen = useCallback(() => setOpen(prev => !prev), [])

  const nodeRef = useRef(null)
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
        <ul ref={nodeRef} className="menu-item-list">{children}</ul>
      </CSSTransition>
    </div>
  )
}

const SubMenu = forwardRef(BaseSubMenu)

SubMenu.defaultProps = {
  title: '',
  defaultOpen: true,
}

export default SubMenu
