import React, {
  ForwardRefRenderFunction,
  HTMLAttributes,
  forwardRef,
  useContext,
} from 'react'
import useClassNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps extends HTMLAttributes<HTMLElement> {
  menuIndex?: number
}

const BaseMenuItem: ForwardRefRenderFunction<any, MenuItemProps> = (
  { className, children, menuIndex, onClick },
  ref
) => {
  const context = useContext(MenuContext)

  const computedClassNames = useClassNames('rf-menu-item', className, {
    'is-active': menuIndex === context.selectedKey,
  })

  const handleMenuItemClick = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
      context.setSelectedKey(menuIndex!)
      typeof onClick === 'function' && onClick(ev)
  }

  return (
    <div ref={ref} className={computedClassNames} onClick={handleMenuItemClick}>
      {children}
    </div>
  )
}

const MenuItem = forwardRef(BaseMenuItem)

MenuItem.defaultProps = {}

MenuItem.displayName = 'MenuItem'

export default MenuItem
