import React from 'react';
import logo from './logo.svg';
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import Header from './component/header/index';
import  Computer from './component/activety/index';
import  editAction  from './component/action/index';

function App() {
  return (

    <BrowserRouter>
    <Header/>
        <Switch> 
          <Route   path='/' component={editAction}   / >  
       
          <Route   path='/action' component={editAction}   / >

        </Switch>
    </BrowserRouter>
  );
}

export default App;
