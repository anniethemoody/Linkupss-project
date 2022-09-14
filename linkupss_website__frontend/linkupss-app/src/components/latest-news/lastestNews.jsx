import React, { Component,useState } from 'react';
import Jumbotron from '../jumbotron';
const LatestNews = () => {
    const title = "Latest News";
    const desc = "See our latest updates and news within our project team"
    const btnText = "Learn more";
    const changeText =()=>{

    }
    const [text,setText]= useState("hello");

  
    return ( 
        <div className="container py-4">
        <Jumbotron desc = {desc} title={title} btnText={btnText}/>
        {/* <button className="btn btn-primary" onClick={()=>setText("bye")}>
            {text}
        </button> */}
        <div className="p-5 mb-4 bg-light rounded-3 container ">
            
        </div>

    </div>
     );
}
 
export default LatestNews;