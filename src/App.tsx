import React from 'react'
import Menu from './components/menu'
import './styles/index.scss'

const App: React.FC = () => {

  return <div>
    <Menu>
      <Menu.SubMenu>
        submenu
      <Menu.Item></Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </div>
}

export default App
