import React, { Component } from 'react';
const Jumbotron = (props) => {
    return ( 
        <div className='p-5 mb-4 bg-light rounded-3'> 
            <div className="container-fluid py-5">
            <h1 className="text-primary">{props.title}</h1>
            <p className="text-secondary col-md-8 fs-4">{props.desc}</p>
            <button className="btn btn-primary btn-lg" type="button">{props.btnText}</button>
            </div>
        </div>
     );
}
 
export default Jumbotron;