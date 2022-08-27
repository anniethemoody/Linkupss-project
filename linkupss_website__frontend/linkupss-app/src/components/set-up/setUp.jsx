import React, { Component } from 'react';
import Jumbotron from '../jumbotron';
const SetUp = () => {
    const title = "Set Up"
    const desc = "First time using our products? Dont worry ! See set up instructions to start getting connected with your community "
    const btnText = "Get started"
    return ( 
        <div className="container py-4">
            <Jumbotron desc = {desc} title={title} btnText={btnText}/>
        </div>
     );
}
 
export default SetUp;