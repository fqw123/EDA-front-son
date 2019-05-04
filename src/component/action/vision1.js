import React, { Component } from 'react'
import bind from 'react-autobind'
import {Link} from 'react-router-dom';
import {Icon, Tabs, Input, Button,message} from 'antd';
import   './style.scss';
import Axios from 'axios';

export default class index extends Component {
 constructor(props){
   super(props);
   this.state={
      pinlv:'',
      dianya:"",
      statusModal:'',
      switchKey:''
   }
   bind(this);
 }
//  频率 （8字节string）
 pinlv(v){
   v.persist();
   console.log()
   var reg=/^[0-9]*$/;
   if(!reg.test(v.target.value)){
     message.destroy();
     message.error("只能输入纯数字")

   }else{
    if(v.target.value.length>8){
      this.setState({
        pinlv:v.target.value.substring(0,8)
        })
    }else{
      this.setState({
        pinlv:v.target.value
        })
    }
   
   }
  
 }


 //  模拟电压（3字节string）
 dianya(v){
  v.persist();
  console.log()
  var reg=/^[0-9]*$/;
  if(!reg.test(v.target.value)){
    message.destroy();
    message.error("只能输入纯数字")

  }else{
  

    if(v.target.value.length>3){
      this.setState({
        dianya:v.target.value.substring(0,3)
        })
    }else{
      this.setState({
        dianya:v.target.value
        })
    }
  }
 }

//  状态模式 1字节string
statusModal(v){
  v.persist();
  console.log()
  var reg=/^[0-9]*$/;
  if(!reg.test(v.target.value)){
    message.destroy();
    message.error("只能输入纯数字")

  }else{
    if(v.target.value.length>1){
      this.setState({
        statusModal:v.target.value.substring(0,1)
        })
    }else{
      this.setState({
        statusModal:v.target.value
        })
    }
  }
}

  //  按键开关 2字节string
 switchKey(v){
  v.persist();
  console.log()
  var reg=/^[0-9]*$/;
  if(!reg.test(v.target.value)){
    message.destroy();
    message.error("只能输入纯数字")

  }else{
    if(v.target.value.length>2){
      this.setState({
        switchKey:v.target.value.substring(0,2)
        })
    }else{
      this.setState({
        switchKey:v.target.value
        })
    }
  
  }
 }
 tijiao(){
   console.log("switchKey",this.state.switchKey,!this.state.pinlv.length&&this.state.switchKey.length&&this.state.statusModal.length&&this.state.dianya.length)
   if(!this.state.pinlv.length&&this.state.switchKey.length&&this.state.statusModal.length&&this.state.dianya.length){
     message.destroy();
     message.warning("每一项都必填哦")
   }else{
            let params={
              ctrldata:{
                'frequency':this.dodata(this.state.pinlv,8),
                'switch':this.dodata(this.state.switchKey,2),
                'mode':this.state.statusModal,
                'analog':this.dodata(this.state.dianya,3)
              }

        }
        console.log("rem",params)
        Axios.post('http://http://192.168.1.103:3000/connect/ctrl',params).then(
        rem=>{
          console.log("rem",rem)
        }
        )
   }
   
 }
 dodata(str,length){
  let string;
  if(str.length<length){
    let arr=str.split("");
    while(arr.length<length){
      arr.unshift('0')
    }
    arr= arr.join("");
    console.log("arr",arr)
     return arr;
    
   }else{
    return str.substring(0,length)
   }
}
  render() {
    return (
      <div  className="vision1">
          <div    className="pline"><span  className="ptxt"  >频 率 值:</span><div  className={"pint"}><Input onChange={this.pinlv}  value={this.state.pinlv}   /></div></div>
          <div    className="pline"><span   className="ptxt">模拟电压:</span><div   className={"pint"}><Input onChange={this.dianya}  value={this.state.dianya}   /></div></div>
          <div    className="pline"><span  className="ptxt"  >状态模式:</span><div  className={"pint"}><Input onChange={this.statusModal}  value={this.state.statusModal}   /></div></div>
          <div    className="pline"><span   className="ptxt">按键开关:</span><div   className={"pint"}><Input onChange={this.switchKey}  value={this.state.switchKey}   /></div></div>
          <Button  onClick={this.tijiao}  >提交</Button>
      </div>
    )
  }
}
