import React, { Component } from 'react';
import AddIcon from "@mui/icons-material/Add";
const FloatingActionButton = (props) => {
    return (
        
        <button className=" btn-primary floating-action-button" style={{display:"flex"}} type="button" onClick={props.createNewSession}>
        <AddIcon style={{fontSize:"40px"}} className="floating-action-icon centered" />
        <span className="centered floating-action-button-text">
          Create session
        </span>
      </button>
    
     );
}
 
export default FloatingActionButton;