import React, { Component } from 'react';
import ReEditor from 're-editor';
import {Link} from 'react-router-dom';
import {Icon, Tabs, Input, Button,message} from 'antd';
import  './style.scss';
import bind from 'react-autobind';
import 're-editor/lib/styles/index.css';
import axios from 'axios'

// https://github.com/wowlusitong/re-editor
import Goback from '../../common/goBack';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
export default class view extends Component {
    constructor(props){
        super(props);
        this.state = {
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
            message.warning("请编辑内容")
        }else{
            let params={
                content:this.state.editorValue,
                pins:''
            }
            axios.post('http://localhost:3000/connect/code',params).then(
                rem=>{
                    console.log("提交",rem)
                }
            )
        }
       
    }

    render() {
        const { value } = this.state;
        return (
            <div className="container">
                <h1>QuartesII代码编辑</h1>
                <ReEditor
                    
                    onChange={this.handleChange}
                    placeholder="请输入内容"
                    
                />
                <div  className="tijiao">  <Button type="primary" onClick={this.submit}    size={"large"}>提交</Button></div>
            </div>

        );
    }
}

