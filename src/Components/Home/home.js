import React from 'react';
import Navbar from '../Navbar/navbar';
import {Subs} from '../Subscriptions/subs';
import Collection from '../Collection/collection';
import Products from '../Product/products';
import SearchRes from '../SearchRes/SearchRes';
import {Route,Switch,Redirect} from 'react-router-dom';

export const Home = () =>{
    return(
        <div>
        <Navbar></Navbar>
        <br/><br/>
        {/* Routing needs to be done here */}

        <Switch>
          <Route path="/" exact render={()=>
            <div> 
            <Subs></Subs>
            <br/>
            <Collection></Collection>
            </div>
            }></Route>
          <Route path="/product/:category" exact 
        component={Products}></Route>
          <Route path="/search/q:query/:type?" exact component={SearchRes}></Route>
          {/* <Route path="/third" component={Third}></Route> */}


           {/* <Route render={()=><h1>NO PAGE EXIST </h1>}/> */}
           <Redirect to="/" />
        </Switch>

        
        </div>
    )
}