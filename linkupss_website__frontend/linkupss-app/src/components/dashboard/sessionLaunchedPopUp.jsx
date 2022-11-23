import React, { Component, useEffect ,useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
const SessionLaunchedPopUp = (props) => {
    const [timer,setTimer] = useState(60);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimer(timer-1);
        },1000);
        return () => clearInterval(interval);
    },[props.show])
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
        <h3>Launching meeting...</h3> 
        <h4>{timer}</h4>      
    
        </Modal.Body>
      
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.hide}>
          Cancel
        </button>
        {console.log(props.selectedSession)}
        <button className="btn btn-danger" onClick={()=>{}}>
          Relaunch
        </button>
      </Modal.Footer>
      </Modal>

    );
}
 
export default SessionLaunchedPopUp;