import React from 'react'
import Menu from './components/menu'
import Icon from './components/icon'
import './styles/index.scss'

const App: React.FC = () => {

  return <div>
    <Menu>
      <Menu.SubMenu title={<span>vertical</span>} icon={<Icon className="icon-like" />}>
        <Menu.Item>menu 1</Menu.Item>
        <Menu.Item>menu 2</Menu.Item>
        <Menu.Item>menu 3</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title='vertical' icon={<Icon className="icon-like" />}>
        <Menu.Item>menu 1</Menu.Item>
        <Menu.Item>menu 2</Menu.Item>
        <Menu.Item>menu 3</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>menu 4</Menu.Item>
      <Menu.Item>menu 5</Menu.Item>
      <Menu.Item>menu 6</Menu.Item>
    </Menu>

    <hr></hr>

    <Menu mode="horizontal">
      <Menu.SubMenu title="horizontal">
        <Menu.Item>menu 1</Menu.Item>
        <Menu.Item>menu 2</Menu.Item>
        <Menu.Item>menu 3</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="horizontal">
        <Menu.Item>menu 1</Menu.Item>
        <Menu.Item>menu 2</Menu.Item>
        <Menu.Item>menu 3</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>menu 4</Menu.Item>
      <Menu.Item>menu 5</Menu.Item>
      <Menu.Item>menu 6</Menu.Item>
    </Menu>
  </div>
}

export default App
