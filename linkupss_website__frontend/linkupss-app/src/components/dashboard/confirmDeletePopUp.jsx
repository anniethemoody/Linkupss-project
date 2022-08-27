import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
const DeletePopUp = (props) => {
    
    const deleteSelectedSession = (props) => {
        const sess = props.selectedSession;
        console.log(sess);
        props.deleteSession(sess);
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
          Remove Session Confirmation
        </Modal.Title>
        </Modal.Header>
        <Modal.Body className="confirm-delete-form-size">
        Are you sure you want to delete <Badge variant = "bg-danger">{props.selectedSession.name} session</Badge>  from your dashboard? You will be no longer have any managing priviledges for this session. 
        </Modal.Body>
      
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.hide}>
          Dismiss
        </button>
        {console.log(props.selectedSession)}
        <button className="btn btn-danger" onClick={()=>deleteSelectedSession(props)}>
          Delete
        </button>
      </Modal.Footer>
      </Modal>
     );
}
 
export default DeletePopUp;