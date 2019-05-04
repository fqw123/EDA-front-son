import React, { Component } from 'react';
import ReEditor from 're-editor';
import {Link} from 'react-router-dom';
import {Icon, Tabs, Input,Table, Button,message,Card} from 'antd';
import  './style.scss';
import bind from 'react-autobind';
import 're-editor/lib/styles/index.css';
import axios from 'axios';
// https://github.com/wowlusitong/re-editor
import Goback from '../../common/goBack';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
export default class view extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 管脚名
            pinname:"",
            pinvalue:'',
            dataSource:[],
            num:0,
            // 实验结果
            userinfo:"",
            editorValue: {},
            value: JSON.parse(localStorage.getItem('re-editor-value'))
        };
        bind(this)
    }
    handleChange = value => {
        localStorage.setItem('re-editor-value', JSON.stringify(value.toJS()));
        console.log('value', value.document.text);
        this.setState({
            editorValue: value.document.text
        });
    };
    submit(){
       
        if(!this.state.editorValue){
            message.destroy();
            message.warning("请编辑代码")
        }else if(!this.state.dataSource.length){
            message.destroy();
            message.warning("请配置管脚")
        }else{
            let pins={};
            this.state.dataSource.filter(
                (value,index)=>{
                    pins[value.pinname]=value.pinvalue
                }
            )
            let params={
                content:this.state.editorValue,
                pins:pins
            }
            // console.log("params",params)
            let timer;
            clearInterval(timer);
            axios.post('http://192.168.1.103:3000/connect/code',params).then(
                rem=>{
                    console.log("提交",rem)
                    if(rem.data.code===200){
                        message.config({
                            top: 100,
                            duration: 8,
                          
                          });
                          message.info("正在编译，请稍候")
                           let num=0;
                            timer=setInterval(
                               ()=>{
                                num++;
                                if(num===4){
                                    clearInterval(timer);
                                    console.log("三次啦",num)
                                }else{
                                    this.getResult(timer)

                                    console.log("调用getResult",num)
                                }
                               },10000
                           )
                    }else{
                        message.info("sorry,服务器开小差了！")
                    }
                }
            )
        }
       
    }
 

    getResult(timer){
        axios.post('http://192.168.1.103:3000/connect/getstatus').then(
            rem=>{
                console.log("请求结果",rem)
                if(rem.data.code===200){
                    clearInterval(timer);
                    this.setState({
                        userinfo:rem.data.info
                    })
                    message.destroy();
                    message.success("编译成功")
                }else{
                    
                    message.destroy();
                    message.success("串口连接失败，请重试")
                    this.setState({
                        userinfo:""
                    })
                }
            }
        )
    }
    pinname(e){
        e.persist();
        this.setState({
            pinname:e.target.value  
        })
    }
    pinvalue(e){
        e.persist();
        let reg = /^[0-9a-zA-Z]+$/;
        let str=e.target.value;
        if(!reg.test(str)&&str.length>0){
            message.destroy();
             message.error("管脚值只能输入字母或数字")
        }else{
            this.setState({
                pinvalue:e.target.value  
            })
        }
       
    }
    addpins(){
        if(!this.state.pinname){
            message.destroy();
            message.warning("请输入管脚名")
           
        }else if(!this.state.pinvalue){
           
                        message.destroy();
                        message.warning("请输入管脚值")
           
        }else{

        let bool= (k)=>{
            let ft=true;
            let da=this.state.dataSource
            console.log("比较",da,k)
            da.filter(
                (value,index)=>{
                    console.log("filter",value,index)
                    if(value.pinname===k){
                        ft=false
                    }else{
                        ft=true
                    }
                }
            )
            return ft;
          
          }
        
            if(bool(this.state.pinname)){

                this.state.dataSource.push({
                key:this.state.pinname,
                pinname:this.state.pinname,
                pinvalue:this.state.pinvalue
               })
                console.log("添加",this.state.dataSource,this.state.num)
                this.setState({
                    num:Number(this.state.num)+1
                })
              
            }else{
                message.error("管脚名已存在,请修改")
            }




        }
    }
  


    render() {
        const { value,userinfo ,pinname,pinvalue} = this.state;
        return (
            <div className="container">
                <h1>QuartesII代码编辑</h1>
                <ReEditor
                    
                    onChange={this.handleChange}
                    placeholder="请输入内容"
                    
                />
              
                <div  className="peihi">
                    <h2>配置pins管脚</h2>
                    <p  className="tablePins"><span  className="piname">管脚名:</span>  <Input  value={pinname} onChange={this.pinname}   />  <span  className="piname">管脚值:</span><Input  value={pinvalue} onChange={this.pinvalue}   /> <p  className="piname"><Button  type="primary"  onClick={this.addpins}>添加</Button></p> </p>
                    
                     <Table   dataSource={this.state.dataSource }   pagination={false}   num={this.state.num}   columns={this.columns}   />
                </div>

                <div  className="tijiao">  <Button type="primary" onClick={this.submit}    size={"large"}>提交</Button> </div>
                                
                <div  className="card" > 
                    <Card
                    size="small"
                    title={'编译结果'}
                    style={{ width: 400 }}
                    >

                    {userinfo?
                    <p>{userinfo}</p>:

                    <p  style={{minHeight:'200px'}}>暂无数据</p>
                    }

                    </Card>
                
                </div>
            </div>

        );
    }
    deletel(record,index,){
        console.log("index,record",index,record,this.state.dataSource)
        let k=[...this.state.dataSource]  
        k.splice(index,1);
        this.setState({
            dataSource:k,
            num:Number(this.state.num)+1
        })
        
       
    }
    columns=[
        {
          key:'keyname',
          dataIndex:'pinname',
          title:'管脚名称'
        },{
            key:'keyvalue',
            dataIndex:'pinvalue',
            title:'管脚值'
          }
          ,{
            key:'action',
            dataIndex:'action',
            title:'操作',
            render:(text,record,index)=>{
                return <span onClick={this.deletel.bind(this,record,index)}   style={{color:'#1890ff'}}>删除</span>
            }
          },
    ]
}

