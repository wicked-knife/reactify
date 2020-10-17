import React, {
  ForwardRefRenderFunction,
  HTMLAttributes,
  forwardRef,
  useContext,
} from 'react'
import useClassNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps extends HTMLAttributes<HTMLElement> {
  menuIndex?: number,
  disabled?: boolean
}

const BaseMenuItem: ForwardRefRenderFunction<any, MenuItemProps> = (
  { className, children, menuIndex, onClick, disabled, ...props },
  ref
) => {
  const context = useContext(MenuContext)

  const computedClassNames = useClassNames('rf-menu-item', className, {
    'is-active': menuIndex === context.selectedKey,
    'is-disabled': disabled
  })

  const handleMenuItemClick = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if(disabled) {
      return
    }
    context.setSelectedKey(menuIndex!)
    typeof onClick === 'function' && onClick(ev)
  }

  return (
    <div ref={ref} className={computedClassNames} onClick={handleMenuItemClick} {...props}>
      {children}
    </div>
  )
}

const MenuItem = forwardRef(BaseMenuItem)

MenuItem.defaultProps = {
  disabled: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
