import React, { HTMLAttributes,ForwardRefRenderFunction, forwardRef, createContext, ForwardRefExoticComponent } from 'react'
import MenuItem from './item'
import SubMenu from './sub-menu'

interface MenuProps extends HTMLAttributes<HTMLElement> {
  mode?: 'vertical' | 'horizontal'
}

interface MenuInterface extends ForwardRefExoticComponent<MenuProps> {
  Item: typeof MenuItem
  SubMenu: typeof SubMenu
}

export const MenuContext = createContext('foo')

const BaseMenu: ForwardRefRenderFunction<any, MenuProps> = ({
  mode,
  children
}, ref) => {
  return (
    <MenuContext.Provider value={'foo'}>
      {children}
    </MenuContext.Provider>
  )
}

const Menu: MenuInterface = Object.assign(forwardRef(BaseMenu), {Item: MenuItem, SubMenu})

Menu.defaultProps = {
  mode: 'vertical'
}

export default Menu
