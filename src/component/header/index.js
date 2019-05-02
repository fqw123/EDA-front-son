import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';

import style from './style.scss';
import bind from 'react-autobind';

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
         
           
        };
        bind(this);
    }



    render() {
     

        return (
            <div  className={"box" + '  head  clearfix'}  >
                {/* {console.log('this', this, location.pathname)} */}
                <div className={"imgB " + ' fl'}> <img src={require('../images/icon_nsmiwta8kfh/dianzi.png')}/> <span className={"stext"}>EDA-ONLINE</span></div>
               
                    
                
            </div>
        );
    }

}
export default withRouter(Index);
