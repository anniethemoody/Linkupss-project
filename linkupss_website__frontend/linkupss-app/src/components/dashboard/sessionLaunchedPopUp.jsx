import React, { Component, useEffect ,useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Spinner from 'react-bootstrap/Spinner';
const SessionLaunchedPopUp = (props) => {

    return (  
        <Modal
        show={props.show}
        onHide={props.close}
        backdrop="static"
        keyboard={false}
      >
         <Modal.Header>
        <Modal.Title>
          Launch Session Pop Up

        </Modal.Title>
        </Modal.Header>
        <Modal.Body className="confirm-delete-form-size">
        <h3>Meeting is being launched, please return to Zoom !</h3> 
        <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    
        </Modal.Body>
      
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.hide}>
          Dismiss
        </button>

      </Modal.Footer>
      </Modal>

    );
}
 
export default SessionLaunchedPopUp;