import React, { Component } from 'react';
import Jumbotron from '../jumbotron';
const Products = () => {
    const title = "Products"
    const desc = "See latest Linkupss products that change how your community connects"
    const btnText = "Learn more"
    return ( 
        <div className="container py-4">
        <Jumbotron desc = {desc} title={title} btnText={btnText}/>
    </div>
     );
}
 
export default Products;