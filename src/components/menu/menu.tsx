import React, {
  HTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
  createContext,
  ForwardRefExoticComponent,
  useState,
  FunctionComponentElement,
} from 'react'
import useClassNames from 'classnames'
import MenuItem, { MenuItemProps } from './item'
import SubMenu, { SubMenuProps } from './sub-menu'
import './menu.scss'

interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  mode?: 'vertical' | 'horizontal'
  defaultSelectedKey?: string | number
}

interface MenuInterface extends ForwardRefExoticComponent<MenuProps> {
  Item: typeof MenuItem
  SubMenu: typeof SubMenu
}

interface MenuContext {
  mode: 'vertical' | 'horizontal'
  selectedKey: number | string
}

type MenuChild =
  | FunctionComponentElement<MenuItemProps>
  | FunctionComponentElement<SubMenuProps>

export const MenuContext = createContext<MenuContext>({
  mode: 'vertical',
  selectedKey: 0,
})

const BaseMenu: ForwardRefRenderFunction<any, MenuProps> = (
  { mode, className, children, defaultSelectedKey },
  ref
) => {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey!)

  const computedClassNames = useClassNames('rf-menu', `is-${mode}`, className)

  const initialContextValue: MenuContext = {
    mode: mode!,
    selectedKey: selectedKey,
  }

  const renderChildren = () => {
    const validDisplayName = ['SubMenu', 'MenuItem']
    return React.Children.map(children, (child, index) => {
      const childElement = child as MenuChild
      if (
        !childElement.type ||
        !childElement.type.displayName ||
        !validDisplayName.includes(childElement.type.displayName)
      ) {
        return console.error(
          'Warning: Menu component child should be Menu.SubMenu or Menu.Item'
        )
      }
      if (validDisplayName.includes(childElement.type.displayName)) {
        return child
      }
    })
  }

  return (
    <MenuContext.Provider value={initialContextValue}>
      <ul className={computedClassNames}>{renderChildren()}</ul>
    </MenuContext.Provider>
  )
}

const Menu: MenuInterface = Object.assign(forwardRef(BaseMenu), {
  Item: MenuItem,
  SubMenu,
})

Menu.defaultProps = {
  mode: 'vertical',
  defaultSelectedKey: 0,
}

export default Menu
