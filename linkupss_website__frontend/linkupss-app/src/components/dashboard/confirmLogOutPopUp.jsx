import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { useHistory } from "react-router-dom";

const ConfirmLogOutPopUp = (props) => {
    const history = useHistory();
    const logout = () => {
        localStorage.setItem("userToken",null);
        localStorage.setItem("adminId",null);
        return history.push("/adminloginregister")
    }
    return ( 
        <Modal
        show={props.show}
        onHide={props.close}
        backdrop="static"
        keyboard={false}
      >
         <Modal.Header>
        <Modal.Title>
          Log Out Confirmation

        </Modal.Title>
        </Modal.Header>
        <Modal.Body className="confirm-logout-form-size text-center">
        <span >Are you sure you want to log out?</span>
        </Modal.Body>
      
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.hide}>
          Dismiss
        </button>
        <button className="btn btn-danger" onClick={()=>logout()}>
          Yes
        </button>
      </Modal.Footer>
      </Modal> 
     );
}
 
export default ConfirmLogOutPopUp;