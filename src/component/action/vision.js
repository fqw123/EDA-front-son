import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Icon, Tabs, Input, Button} from 'antd';
import   './style.scss';

import Goback from '../../common/goBack';
const Search = Input.Search;

export default class view extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [{use: true, id: '123456' }, {use: true, id: '123456' }, {use: true, id: '123456' }, {use: true, id: '123456' }, {use: true, id: '123456' }, {use: false, id: '123456' }, {use: true, id: '123456' } ]
        };
    }

    render() {
        return (
            <div className={ '  clearfix'}>
                {/* <p className={" "pLine + '  clearfix'}>
                    <span className={" "spand}>操作</span>
                    <Goback  {...this.props} />
                </p> */}

                <div className={ "left "}>
                    <div  className={ "sealine " + ' clearfix'}> 
                        <div  className={" searchL" }>
                            <Search
                                placeholder="请输入按键值0x30~0x3D"
                                enterButton="确认"
                                size="large"
                                onSearch={value => console.log(value)}
                            />  
                        </div>
                        <div   className={'fuwei '}>   <Button type="primary">复位</Button></div>
                    </div>
                    <div  className="fourBtn">
                        <Button>测频率(DDS)</Button>   <Button>测占空比</Button>   <Button>测幅值(w)</Button>   <Button>测方波(f)</Button>
                    </div>
                    <div  className={" videoB"}>
                        <video width="500" height="300" controls>
                            <source src="movie.mp4" type="video/mp4"/>
                            <source src="movie.ogg" type="video/ogg"/>
                            您的浏览器不支持 video 标签。
                        </video>
                    </div>
                </div>
                <div  className={ " right"}>
                    <div className={ " card"}>
                        <p  className={"Name "}>实验结果    </p>
                        <div className={"bodp "}> 
                           
                            <p>频率：<span>0x35</span></p>
                            <p>占空比：<span>0x35</span></p>
                            <p>幅值：<span>0x35</span></p>
                            <p>方波：<span>0x35</span></p>
                        </div>
                        <div className={"atext "}><Icon style={{color: '#1890FF'}}   type="arrow-down" /><a  style={{textDecoration: 'underline'}} >下载实验结果 </a></div>
                    </div>
                </div>
              
            </div>
        );
    }
}

