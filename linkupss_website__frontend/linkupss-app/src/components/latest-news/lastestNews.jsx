import React, { Component } from 'react';
import Jumbotron from '../jumbotron';
const LatestNews = () => {
    const title = "Latest News";
    const desc = "See our latest updates and news within our project team"
    const btnText = "Learn more"
    return ( 
        <div className="container py-4">
        <Jumbotron desc = {desc} title={title} btnText={btnText}/>
    </div>
     );
}
 
export default LatestNews;