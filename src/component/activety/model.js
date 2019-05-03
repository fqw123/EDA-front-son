import React, { Component } from 'react';
import {message} from 'antd';
import bind from 'react-autobind';
import axios  from 'axios';
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';

export default class model extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        bind(this);
    }
    goBack(){
        // console.log("this);
    }
    newData(){

        message.success('刷新成功');
       
    }
    componentDidMount(){
       axios.post("http//:localhost:80/worker/info")
    }

    render() {
        return (
            this.props.children({
                ...this.props,
                ...this.state,
                newData: this.newData

            })
        );
    }
}
