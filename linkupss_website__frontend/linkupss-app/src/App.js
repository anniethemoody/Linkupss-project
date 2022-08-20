import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';
import React, { Component,useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { Redirect,Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import AOS from "aos";
import "aos/dist/aos.css";

//EVERYTHING IS IN CAMEL CASE!!!  
function App() {
  return (
    <div className="box">
    <NavBar className="navpos"/>
    <div className="content">
    
    <Switch>
     <Route path="/" component={Dashboard}/> 

    </Switch>
    </div>
    </div>
  );
}

export default App;
