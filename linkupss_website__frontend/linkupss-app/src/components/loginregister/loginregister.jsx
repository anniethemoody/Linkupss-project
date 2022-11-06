import React, { Component, useState, useContext } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "bootstrap";
import Form from "react-bootstrap/Form";
import Jumbotron from "../jumbotron";
import { getCurrentUser, login } from "../../services/authService";
import { useEffect } from "react";
import Joi from "joi-browser";
import Alert from "react-bootstrap/Alert";
import AuthContext from "../../services/authProvider";
import httpService from "../../services/httpService";

const LoginRegister = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");
  const [registerUserEmail, setRegisterUserEmail] = useState("");
  const [registerUserOrgId, setRegisterUserOrgId] = useState("");
  const [registerFormValidate, setRegisterFormValidate] = useState(false);
  const [errorLog, setErrorLog] = useState({});
  const btnText = "Learn more";

  const schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    newUsername: Joi.string().required().label("Username"),
    newPassword: Joi.string().required().label("Password").min(8),
    email: Joi.string().required().label("Email").email(),
    orgId: Joi.string().required().label("Organization ID"),
  };

  const doSubmitLogin = async (e) => {
    //await login()
    // e.preventDefault();
    // const response = await login({
    //   loginUserName,
    //   loginUserPassword
    // });
    // if ('token' in response) {
    //   window.alert("yes")
    // } else {
    //   window.alert("no")
    // }

    e.preventDefault();

    try {
      const response = await httpService.post(
        "http://api.linkupss.com/adminlogin",
        { user_name: loginUserName, user_password: loginUserPassword },
        {withCredentials:false}
      );
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      setAuth({ loginUserName, loginUserPassword, accessToken });
      console.log("Success?");
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }

    // try {
    //   //console.log("here");
    //   await login(this.state.data.loginUserName,this.state.data.loginUserPassword)
    //   console.log('Submitted');
    //   const {state} = this.props.location;
    //   window.location = state ? state.from.pathname : '/';
    //   window.alert("yes");
    // } catch (ex) {
    //   if(ex.response && ex.response.status === 400){
    //     console.log('not');
    //     window.alert("nn");
    //     const errors = {...this.state.errors};
    //     errors.username = ex.response.data;
    //     this.setState({errors:errors});
    //   }

    // }
  };

  const doSubmitRegsiter = async (e) => {};
  // try {
  //   await login()
  // } catch (ex) {

  // }

  const validateProperty = (type, val) => {
    const obj = { [type]: val };
    const schemas = { [type]: schema[type] };
    // console.log(obj, schemas);
    const { error } = Joi.validate(obj, schemas); //youre picking the {error} property of the returned Joi object
    return error ? error.details[0].message : null;
  };
  const handleLoginUserName = (e) => {
    setLoginUserName(e.target.value);
    //console.log(e.currentTarget.value);
    const errormsg = validateProperty("username", e.currentTarget.value);
    //console.log(errormsg);
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
  const handleRegisterName = (e) => {
    setRegisterName(e.target.value);
    const errormsg = validateProperty("name", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["name"] = errormsg;
    else delete errors["name"];
    setErrorLog(errors);
  };

  const handleRegisterUserName = (e) => {
    setRegisterUserName(e.target.value);
    const errormsg = validateProperty("newUsername", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["newUsername"] = errormsg;
    else delete errors["newUsername"];
    setErrorLog(errors);
  };
  const handleRegisterUserPassword = (e) => {
    setRegisterUserPassword(e.target.value);
    const errormsg = validateProperty("newPassword", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["newPassword"] = errormsg;
    else delete errors["newPassword"];
    setErrorLog(errors);
  };
  const handleRegisterUserEmail = (e) => {
    setRegisterUserEmail(e.target.value);
    const errormsg = validateProperty("email", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["email"] = errormsg;
    else delete errors["email"];
    setErrorLog(errors);
  };
  const handleRegisterOrgId = (e) => {
    setRegisterUserOrgId(e.target.value);
    const errormsg = validateProperty("orgId", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["orgId"] = errormsg;
    else delete errors["orgId"];
    setErrorLog(errors);
  };
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
      <Form className="col-md-6 align-items-start" onSubmit={doSubmitLogin}>
        <h1 className="text-primary">Login</h1>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={loginUserName}
              isInvalid={errorLog["username"]}
              //onChange={(e) => setLoginUserName(e.target.value)}
              onChange={handleLoginUserName}
            />
          </InputGroup>

          {errorLog["username"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["username"]}
            </Alert>
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
              //onChange={(e) => setLoginUserPassword(e.target.value)}
              onChange={handleLoginUserPassword}
            />
          </InputGroup>
          {errorLog["password"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["password"]}
            </Alert>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          //onClick={() => doSubmitLogin()}
        >
          Login
        </button>
      </Form>

      {/* Register Side */}
      <Form className="col-md-6 align-items-start" noValidate>
        <h1 className="text-primary">Register</h1>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              value={registerName}
              onChange={handleRegisterName}
            />
          </InputGroup>

          {errorLog["name"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["name"]}
            </Alert>
          )}
        </div>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={registerUserName}
              onChange={handleRegisterUserName}
            />
          </InputGroup>

          {errorLog["newUsername"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["newUsername"]}
            </Alert>
          )}
        </div>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="New Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              value={registerUserPassword}
              onChange={handleRegisterUserPassword}
            />
          </InputGroup>

          {errorLog["newPassword"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["newPassword"]}
            </Alert>
          )}
        </div>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Email Address"
              aria-label="Email Address"
              aria-describedby="basic-addon1"
              value={registerUserEmail}
              onChange={handleRegisterUserEmail}
            />
          </InputGroup>

          {errorLog["email"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["email"]}
            </Alert>
          )}
        </div>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Organization ID"
              aria-label="Organization ID"
              aria-describedby="basic-addon1"
              value={registerUserOrgId}
              onChange={handleRegisterOrgId}
            />
          </InputGroup>

          {errorLog["orgId"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["orgId"]}
            </Alert>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </Form>
    </div>
  );
};

export default LoginRegister;
