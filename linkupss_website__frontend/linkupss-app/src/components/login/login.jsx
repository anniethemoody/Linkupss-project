import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Login = () => {
    const [userName,setUserName] = useState("");
    return ( 
        <div className="container py-4">
            <h1 className="text-primary">Login</h1>
            <InputGroup className="mb-3">
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
            
            

        </div>
     );
}
 
export default Login;