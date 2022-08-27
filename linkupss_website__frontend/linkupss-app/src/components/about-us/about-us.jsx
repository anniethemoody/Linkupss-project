import React, { Component } from 'react';
import Jumbotron from '../jumbotron';
const AboutUs = () => {
    const title="About Us"
    const desc = "The Linkupss team is comprised of talented,innovative individuals from diverse backgrounds,all here to build better communication technology for your organization.";
    const btnText = "Learn more about our team"
    return ( 
        <div className="container py-4">
            <Jumbotron desc = {desc} title={title} btnText={btnText}/>
        </div>
     );
}
 
export default AboutUs;