import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from "bootstrap";

import Jumbotron from "../jumbotron";

const LoginRegister = () => {
  const [loginUserName,setLoginUserName] = useState("");
  const [loginUserPassword,setLoginUserPassword] = useState("");

  const [registerUserName,setRegisterUserName] = useState("");
  const [registerUserPassword,setRegisterUserPassword] = useState("");
  const [registerUserOrgId, setRegisterUserOrgId] = useState("");
  const btnText = "Learn more";
  

  return(
    <div className="row modal-header text-center ">
      {/* Login Side */}
      <div className="col-md-6 align-items-start">
        <h1 className="text-primary">Login</h1>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
      <div className="row d-flex justify-content-center">
        <InputGroup className="input-g mb-3">
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
       
       <button type="button" className="btn btn-primary">Login</button>
    </div>

    {/* Register Side */}
     <div className="col-md-6">
      <h1 className="text-primary">Register</h1>
      <div className="d-flex justify-content-center">
        <InputGroup className="input-g mb-3">
          <Form.Control
            placeholder="First Name"
            aria-label="First Name"
            aria-describedby="basic-addon1"
          />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
          <Form.Control
            placeholder="Last Name"
            aria-label="Last Name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </div>
        <div className="d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
          <Form.Control
            placeholder="Email Address"
            aria-label="Email Address"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </div>
        <div className="d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
          <Form.Control
            placeholder="Organization ID"
            aria-label="Organization ID"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </div>
       <button type="button" className="btn btn-primary">Sign Up</button>

    </div>
  </div>
  );
}
 
export default LoginRegister;