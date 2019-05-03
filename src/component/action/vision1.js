import React, { Component } from 'react'
import bind from 'react-autobind'
import {Link} from 'react-router-dom';
import {Icon, Tabs, Input, Button,message} from 'antd';
import   './style.scss';

export default class index extends Component {
 constructor(props){
   super(props);
   this.state={
      pinlv:'',
      dianya:""
   }
   bind(this);
 }
 pinlv(v){
   v.persist();
   console.log()
   var reg=/^[0-9]*$/;
   if(!reg.test(v.target.value)){
     message.destroy();
     message.error("只能输入纯数字")

   }else{
    this.setState({
      pinlv:v.target.value
     })
   }
  
 }
 dianya(v){
  v.persist();
  console.log()
  var reg=/^[0-9]*$/;
  if(!reg.test(v.target.value)){
    message.destroy();
    message.error("只能输入纯数字")

  }else{
    
   this.setState({
    dianya:v.target.value
    })
  }
 }
   

  render() {
    return (
      <div  className="vision1">
          <div    className="pline"><span  className="ptxt"  >频 率 值:</span><div  className={"pint"}><Input onChange={this.pinlv}  value={this.state.pinlv}   /></div></div>
          <div    className="pline"><span   className="ptxt">模拟电压:</span><div   className={"pint"}><Input onChange={this.dianya}  value={this.state.dianya}   /></div></div>
      </div>
    )
  }
}
