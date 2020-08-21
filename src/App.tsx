import React from 'react'
import Menu from './components/menu'
import Icon from './components/icon'
import './styles/index.scss'

const App: React.FC = () => {

  return <div>
    <Menu mode='horizontal'>
      <Menu.SubMenu title='subMenu-1'>
        <Menu.Item>menu 1</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title='subMenu-2' defaultOpen>
        <Menu.Item>menu 2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </div>
}

export default App
