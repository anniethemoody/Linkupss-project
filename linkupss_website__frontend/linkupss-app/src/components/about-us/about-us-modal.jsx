import React, { Component } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const AboutUsModal = (props) => {
    return ( 
            <Modal
              show={props.show}
              dialogClassName="modal-150w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Viewing {props.personName}'s Profile...
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <h2 className="text-secondary" style={{textAlign:"center"}}>
                {props.personName}
                </h2>

                <div className="d-flex justify-content-center">
                 
                    <h5 className="text-secondary" style={{textAlign:"center"}}>
                    {props.personRole}
                    </h5>
                  
                </div>
                <hr className="rounded" />
                <p className="text-secondary" style={{textAlign:"center"}}>
                {props.personDesc}
                </p>
              </Modal.Body>
              <Modal.Footer>
        <Button variant="secondary" onClick={()=>props.hide()}>Close</Button>
      </Modal.Footer>
            </Modal>
          
        
     );
}
 
export default AboutUsModal;