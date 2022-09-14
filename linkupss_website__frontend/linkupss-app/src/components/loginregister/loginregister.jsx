import React, { Component, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "bootstrap";
import Form from "react-bootstrap/Form";
import Jumbotron from "../jumbotron";
import { login } from "../../services/authService";
import { useEffect } from "react";
import Joi from "joi-browser";
import Alert from 'react-bootstrap/Alert';


const LoginRegister = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");
  
  const [registerName, setRegisterName] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");
  const [registerUserOrgId, setRegisterUserOrgId] = useState("");
  const [registerFormValidate, setRegisterFormValidate] = useState(false);
  const [errorLog, setErrorLog] = useState({});
  const btnText = "Learn more";

  const schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    newUsername: Joi.string().required().label("NewUsername"),
    newPassword: Joi.string().required().label("NewPassword"),
  };
  const doSubmitLogin = async (e) => {
    console.log("blah");

  };

  // try {
  //   await login()
  // } catch (ex) {

  // }

  const validateProperty = (type, val) => {
    const obj = { [type]: val };
    const schemas = { [type]: schema[type] };
    console.log(obj, schemas);
    const { error } = Joi.validate(obj, schemas); //youre picking the {error} property of the returned Joi object
    return error ? error.details[0].message : null;
  };
  const handleLoginUserName = (e) => {
    setLoginUserName(e.target.value);
    console.log(e.currentTarget.value);
    const errormsg = validateProperty("username", e.currentTarget.value);
    console.log(errormsg);
    const errors = { ...errorLog };
    if (errormsg) errors["username"] = errormsg;
    else delete errors["username"];
    setErrorLog(errors);
  };
  const handleLoginUserPassword = (e) => {
    setLoginUserPassword(e.target.value);
    const errormsg = validateProperty("password", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["password"] = errormsg;
    else delete errors["password"];
    setErrorLog(errors);
  };
  const handleRegisterName =(e)=>{
    setRegisterName(e.target.value);
    const errormsg = validateProperty("name", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["name"] = errormsg;
    else delete errors["name"];
    setErrorLog(errors);
  }
  const handleRegisterUserName = (e)=>{

  }
  const handleRegisterUserPassword = (e) => {

  }
  const handleRegisterUserEmail =(e)=>{

  }
  const handleRegisterOrgId = (e) => {

  }
  // const handleLoginValidation  = () =>{
  //   const data = {loginUserName,loginUserPassword};
  //   const {error} = Joi.validate(data,schema,{abortEarly:false})
  //   if (!error) return null;
  //   const errors = {};
  //   for(let item of error.details) errors[item.path[0]] = item.message;
  //   return errors;
  // }

  return (
    <div className="row modal-header text-center ">
      {/* Login Side */}
      <Form className="col-md-6 align-items-start">
        <h1 className="text-primary">Login</h1>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={loginUserName}
              isInvalid={errorLog["username"]}
              onChange={handleLoginUserName}
            />
          </InputGroup>
          {console.log(errorLog["username"])}
          {errorLog["username"] && (
            <Alert  className = "error-badge" variant={"danger"}>{errorLog["username"]}</Alert>
          )}
        </div>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              value={loginUserPassword}
              isInvalid={errorLog["password"]}
              onChange={handleLoginUserPassword}
            />
          </InputGroup>
          {errorLog["password"] && (
            <Alert className = "error-badge" variant={"danger"}>{errorLog["password"]}</Alert>

          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => doSubmitLogin()}
        >
          Login
        </button>
      </Form>

      {/* Register Side */}
      <Form className="col-md-6 align-items-start" noValidate>
        <h1 className="text-primary">Register</h1>
        <div className="d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              value = {registerUserName}
              onChange={handleRegisterName}

            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="New Password"
              aria-label="Password"
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
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </Form>
    </div>
  );
};

export default LoginRegister;
