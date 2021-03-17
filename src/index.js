import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import AppHeader from './component/Header/';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './style.css';
import PageList from './containers/PageList/';
import Detail from './containers/Detail/';
import Vip from './containers/Vip/';
import Login from './component/Login';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minWidth: 1300, height: "100%" }}>
          <Header className="header">
            <AppHeader></AppHeader>
          </Header>
          <Content className="content">
            <Login></Login>
            {/* Switch url 匹配第一个，只要匹配就返回了，不需要全匹配， Route 位置重要 */}
            <Switch>
              <Route path='/vip' component={Vip}></Route>
              <Route path="/detail/:id" component={Detail} />
              <Route path='/:id?' component={PageList} />
            </Switch>

          </Content>
          <Footer className="footer">@copyright shelley 2021</Footer>
        </Layout>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'));

