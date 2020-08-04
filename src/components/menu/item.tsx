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
  { className, children, menuIndex },
  ref
) => {
  const context = useContext(MenuContext)

  const computedClassNames = useClassNames('rf-menu-item', className, {
    'is-active': menuIndex === context.selectedKey,
  })

  const handleMenuItemClick = () => {
      context.setSelectedKey(menuIndex!)
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
