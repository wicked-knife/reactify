import React, { } from 'react'
import Menu from './components/menu'
import './styles/index.scss'

const App: React.FC = () => {
  return <Menu>
    <Menu.SubMenu title="sub menu">
      <Menu.Item>hello</Menu.Item>
      <Menu.Item>world</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item>foo</Menu.Item>
    <Menu.Item>bar</Menu.Item>
  </Menu>
}

export default App
