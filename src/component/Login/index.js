import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button, Input, message } from 'antd';
import './style.css';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      login: false,
      modal: false,
      user: '',
      password: ''
    }
  }
  hideModal() {
    this.setState({
      modal: false
    })
  }
  showModal() {
    this.setState({
      modal: true,
    })
  }
  changeUser(e) {
    this.setState({
      user: e.target.value
    })
  }
  changePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  checkLogin() {
    const { user, password } = this.state;
    const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
    axios.get(url, { withCredentials: true })
      .then(res => {
        // console.log(res);
        const login = res.data.data.login;
        if (login) {
          message.success('登录成功');
          // cookie 跨域问题
          this.setState({
            login: true,
            modal: false
          })
        } else {
          message.error('登陆失败');
        }
      })
    // console.log(user, password);
  }
  logout() {
    axios.get('http://www.dell-lee.com/react/api/logout.json',
      { withCredentials: true })
      .then(res => {
        // console.log(res.data.data);
        const data = res.data.data;
        if (data.logout) {
          this.setState({
            login: false
          });
          // console.log(this.props);
          this.props.history.push('/');
        }
      })
  }
  render() {
    const { login } = this.state;
    return (
      <div className="login">
        {
          login ?
            <Button
              type="primary"
              onClick={this.logout}
            >退出</Button> :
            <Button
              type="primary"
              onClick={this.showModal}
            >登录</Button>
        }
        <Link to="/vip">
          <Button
            style={{ marginLeft: 10 }}
            type="primary"
          >Vip</Button>
        </Link>
        <Modal
          title="登录"
          visible={this.state.modal}
          onOk={this.checkLogin}
          onCancel={this.hideModal}
        >
          <Input
            placeholder='请输入用户名'
            style={{ marginBottom: 10 }}
            value={this.state.user}
            onChange={this.changeUser}
          ></Input>
          <Input
            placeholder='请输入密码'
            type="password"
            value={this.state.password}
            onChange={this.changePassword}
          ></Input>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json',
      { withCredentials: true })
      .then(res => {
        // console.log(res);
        const login = res.data.data.login;
        this.setState({
          login: login
        })
      })
  }

}
export default withRouter(Login);
