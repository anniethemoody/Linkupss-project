import React, { Component } from 'react';
import Jumbotron from './jumbotron';
const FAQ = () => {
    const title ="Frequently Asked Questions"
    const desc = "See frequently asked questions about our service"
    const btnText="";
    return ( 
        <div className="container py-4">
        <Jumbotron desc = {desc} title={title} btnText={btnText}/>
          </div> 
     );
}
 
export default FAQ;