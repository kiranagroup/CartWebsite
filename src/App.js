import React, { Component } from 'react';
import './App.css';
import {Home} from './Components/Home/home'; 
import {Store} from './Models/Store';

class App extends Component {
  constructor(){
    super();
    var add = localStorage.getItem('added');
    this.visible=false;
    // console.log(add);
    if(add){
    var added = JSON.parse(add);
    }
    var count=localStorage.getItem('count');
    var payload = {'added':added,'count':count};
    Store.dispatch({type:'retain',payLoad:payload});
  }
  render() {
    return (
      // The main file leading to every HTML and JS
      <Home>
      </Home>
    );
  }
}

export default App;
