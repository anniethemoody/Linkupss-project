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
import setAuthToken from "../../services/httpService";
import { useHistory } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const LoginRegister = () => {
  const history = useHistory();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [success, setSuccess] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");
  const [registerUserEmail, setRegisterUserEmail] = useState("");
  const [registerUserOrgId, setRegisterUserOrgId] = useState("");
  const [registerError,setRegisterError] = useState("");
  const [registerFormValidate, setRegisterFormValidate] = useState(false);
  const [errorLog, setErrorLog] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);
  const [registerFailed,setRegisterFailed] = useState(false);
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
    e.preventDefault();

    localStorage.removeItem("userToken");
    localStorage.clear();
    const user = { loginUserName, loginUserPassword };
    try {
      const response = await httpService.post(
        "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/adminlogin",
        { user_name: loginUserName, user_password: loginUserPassword }
      );
      console.log(response?.data);
      const token = response?.data?.access_token;
      localStorage.setItem("userToken", token);
      const admin_id = response?.data?.result[0]?.admin_id;
      console.log(admin_id);
    localStorage.setItem("adminId", JSON.stringify(admin_id));
      if(loginUserName== "" && loginUserPassword==""){
        throw "Login Failed";

      }
      // setJwt(accessToken);
      //  setAuth({
      //    user_name: loginUserName,
      //    user_password: loginUserPassword,
      //    accessToken,
      //  });
      // // set the state of the user
      // setUser(response.data);
      // // store the user in localStorage

      //setAuthToken(token);
      return history.push("/dashboard");
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
      setLoginFailed(true);
    }
  };

  const doSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      if(registerUserName==""||registerUserOrgId==""||registerUserEmail==""||registerUserPassword==""){
        throw "Missing fields. Please try again"
      }
      const response = await httpService.post(
        "https://api.linkupss.com/adminregister",
        JSON.stringify({
          name: registerName,
          user_name: registerUserName,
          user_password: registerUserPassword,
          extra_info: registerUserEmail,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      const token = response?.data?.access_token;
      const admin_id = response?.data?.result[0];
        console.log(admin_id);
      localStorage.setItem("userToken", JSON.stringify(token));
      localStorage.setItem("adminId", JSON.stringify(admin_id));
      // TODO: remove console.logs before deployment
      console.log(response.data.msg);
      if(response.data.msg){
        setRegisterFailed(true);
        setRegisterError(response.data.msg+". Please try again")
      }
      else{

        setRegisterFailed(false);
      }
      
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 409) {
        console.log("Username Taken");
      } else {
        console.log("Registration Failed");
      }
      setRegisterError(err);
    }
    const token = localStorage.getItem("userToken");
    console.log(token);
        let headers = {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2ODM1NTEyMywianRpIjoiNDhmZWFkYmEtOGM3Ny00NDY5LTg4NjUtNDg5OWNhM2IyZjkwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Im1pZ2h0eWVtYnJ5byIsIm5iZiI6MTY2ODM1NTEyMywiZXhwIjoxNjY4MzU2MDIzfQ.zxe9Njt0MeNi_1ELgQ0dfMFthqn21QbitJZjLmtRSjM`,
      "Content-Type": "application/json",
    };
//checking if org with that org code exists
try{
  const response = await httpService.post(
    "https://api.linkupss.com/organizationjoin",
    JSON.stringify({
      org_code: registerUserOrgId,
      user_name: registerUserName,
    }),
    {
      headers: headers
    }
  );
  console.log(response);
}
catch(err){

}






  };

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
        <div className="row d-flex justify-content-center">
          {loginFailed && (
            <Alert className="error-badge mt-3" variant={"danger"}>
              {"Login Failed. Please try again."}
            </Alert>
          )}
                    
        </div>
      </Form>

      {/* Register Side */}
      <Form className="col-md-6 align-items-start" noValidate onSubmit={doSubmitRegister}>
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
        <button type="submit" className="btn btn-primary" > 
          Sign Up
        </button>
        <div className="row d-flex justify-content-center">
          {registerFailed && (
            <Alert className="error-badge mt-3" variant={"danger"}>
              {registerError}
            </Alert>
          )}
        </div>
      </Form>
    </div>
  );
};

export default LoginRegister;
