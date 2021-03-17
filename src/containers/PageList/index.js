import React, { Component } from "react";
import { List } from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

// const data = [
//   'Racing car sprays burning fuel into crowd.',
//   'Japanese princess to wed commoner.',
//   'Australian walks 100km after outback crash.',
//   'Man charged over missing wedding girl.',
//   'Los Angeles battles huge wildfires.',
// ];

class PageList extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }
  // 加载数据，每次点击，都要修改 state 的数据
  // 选 componentWillReceiveProps
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    const id=nextProps.match.params.id;
    axios.get('http://www.dell-lee.com/react/api/list.json?id='+id)
    .then(res=>{
      this.setState({
        data: res.data.data
      })
    })
  }
  render() {
    // console.log(this.state.data);
    return (
      <List
        style={{background: '#fff'}}
        bodered
        dataSource={this.state.data}
        renderItem={item => (
        <List.Item>
          <Link to={`/detail/${item.id}`}>{item.title}</Link>
        </List.Item>)}
      />
    )
  }
  // 第一次加载的数据加载
  componentDidMount(){
    let url='http://www.dell-lee.com/react/api/list.json';
    const id=this.props.match.params.id;
    if(id){
      url=url+'?id=';
    }
    axios.get(url)
    .then(res=>{
      this.setState({
        data: res.data.data
      })
    })
  }
}
export default PageList;
