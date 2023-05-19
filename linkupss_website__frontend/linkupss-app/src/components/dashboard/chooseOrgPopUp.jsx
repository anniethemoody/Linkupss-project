import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import ListGroup from 'react-bootstrap/ListGroup';

const ChooseOrgPopUp = (props) => {


    return ( 
        <Modal
        show={props.show}
        onHide={props.close}
        backdrop="static"
        keyboard={false}
      >
         <Modal.Header>
        <Modal.Title>
          Select your organization

        </Modal.Title>
        </Modal.Header>
        <Modal.Body className="confirm-logout-form-size text-center">
        <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
        </Modal.Body>
      
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.hide}>
          Dismiss
        </button>
      </Modal.Footer>
      </Modal> 
     );



}
export default ChooseOrgPopUp;