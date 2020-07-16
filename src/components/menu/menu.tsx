import React, {HTMLAttributes, ForwardRefRenderFunction, forwardRef} from 'react'

interface MenuProps extends HTMLAttributes<HTMLElement> {
  mode?: 'vertical' | 'horizontal'
}

const BaseMenu: ForwardRefRenderFunction<any, MenuProps> = ({
  mode
}) => {
  return <div>
    menu
  </div>
}

const Menu = forwardRef(BaseMenu)

Menu.defaultProps = {
  mode: 'vertical'
}

export default Menu
