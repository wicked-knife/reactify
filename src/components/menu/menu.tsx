import React, { HTMLAttributes,ForwardRefRenderFunction, forwardRef, createContext, ForwardRefExoticComponent } from 'react'
import useClassNames from 'classnames'
import MenuItem from './item'
import SubMenu from './sub-menu'
import './menu.scss'

interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  mode?: 'vertical' | 'horizontal'
}

interface MenuInterface extends ForwardRefExoticComponent<MenuProps> {
  Item: typeof MenuItem
  SubMenu: typeof SubMenu
}

interface MenuContext {
  mode: 'vertical' | 'horizontal'
}

export const MenuContext = createContext<MenuContext>({
  mode: 'vertical'
})

const BaseMenu: ForwardRefRenderFunction<any, MenuProps> = ({
  mode,
  className,
  children
}, ref) => {

  const computedClassNames = useClassNames(
    'rf-menu',
    `is-${mode}`,
    className
  )

  console.log(children);

  return (
    <MenuContext.Provider value={{mode: mode!}}>
      <ul className={computedClassNames}>
        {children}
      </ul>
    </MenuContext.Provider>
  )
}

const Menu: MenuInterface = Object.assign(forwardRef(BaseMenu), {Item: MenuItem, SubMenu})

Menu.defaultProps = {
  mode: 'vertical'
}

export default Menu
