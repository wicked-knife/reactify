import React from 'react'
import Menu from './components/menu'
import './styles/index.scss'

const App: React.FC = () => {

  return <div>
    <Menu>
      <Menu.SubMenu title={<span>123</span>}>
        <Menu.Item>menu 1</Menu.Item>
        <Menu.Item>menu 2</Menu.Item>
        <Menu.Item>menu 3</Menu.Item>
      </Menu.SubMenu>
    </Menu>

    <hr></hr>

    <Menu mode="horizontal">
      <Menu.SubMenu title="submenu1-1">
        <Menu.Item>menu 1</Menu.Item>
        <Menu.Item>menu 2</Menu.Item>
        <Menu.Item>menu 3</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </div>
}

export default App
