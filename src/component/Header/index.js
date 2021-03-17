import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';  //webpack支持
import { Menu } from 'antd';
import { Icon } from 'antd';
import './style.css';
import axios from 'axios';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  getMenuItems() {
    return this.state.list.map(item => {
      return (
        <Menu.Item key={item.id}>
          <Link to={`/${item.id}`}>
            <Icon type={item.icon} />{item.title}
          </Link>
        </Menu.Item>
      )
    })
  }
  // Error: Invariant failed: You should not use <Link> outside a <Router>
  // Link 要在 BrowserRouter 里，BrowserRouter写在外层

  // 获取 header 的数据
  // 改变 state 里的数据，render 重新读取数据 state 
  // 里的数据
  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/header.json')
      .then((res) => {
        this.setState({
          list: res.data.data,
        })
      });
  }

  render() {
    return (
      <Fragment>
        <Link to='/'>
        <img src={logo} className="app-header-logo" alt="logo"/>
        </Link>
        <Menu mode="horizontal" className="app-header-menu">
          {this.getMenuItems()}
        </Menu>
      </Fragment>
    )
  }
}

export default AppHeader;
