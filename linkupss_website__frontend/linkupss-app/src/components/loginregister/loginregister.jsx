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
import axios from "axios";
const LoginRegister = () => {
  const history = useHistory();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");


  const [registerName, setRegisterName] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");
  const [registerUserEmail, setRegisterUserEmail] = useState("");
  const [registerUserOrgId, setRegisterUserOrgId] = useState("");
  const [registerError,setRegisterError] = useState("");
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
      if(loginUserName== "" && loginUserPassword==""){
        throw "Login Failed. Please try again";

      }
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
    localStorage.setItem("adminUserName",loginUserName);

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
        window.alert("Missing fields. Please try again.")
      } else if (err.response?.status === 400) {
        window.alert("Missing Username or Password");
      }
      else if(err.response.data.msg){
        window.alert(err.response.data.msg)
      } 
      else if (err.response?.status === 401) {
      window.alert("Unauthorized");
    }
      else if(err.code == "ERR_NETWORK"){
        console.log(err.code)
       // window.alert("Oops. It seems like you're disconnected. Please try again.")
      }
      else {
        window.alert(err)

      }
      setLoginFailed(true);
    }
  };

  const doSubmitRegister = async (e) => {
    //setRegisterClicked(true);
    var failed = false;
    var token_retrieved = "";
    e.preventDefault();
    try {
      console.log(registerUserName,registerUserOrgId)
      if(registerName==""|registerUserName==""||registerUserOrgId==""||registerUserEmail==""||registerUserPassword==""){
        throw "Missing fields. Please try again"
      }
      const response = await httpService.post(
        "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/adminregister",
       {
          name: registerName,
          user_name: registerUserName,
          user_password: registerUserPassword,
          extra_info: registerUserEmail,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
        console.log(response);
      const token = response.data.token;
      const adminid_retrieved = response.data.data[0].admin_id
      //**********************************************//
      // NEED TO RETRIEVE ADMIN ID FROM /adminregister
      localStorage.setItem("userToken", token);
      localStorage.setItem("adminId",adminid_retrieved);
      token_retrieved = token;

      if(response.data.msg !="Registered"){
        setRegisterFailed(true);
       // setRegisterError(response.data.msg+". Please try again")
        failed = true
        window.alert(response.data.msg+". Please try again")
      }
      else{

        setRegisterFailed(false);
      }
      
    } catch (err) {
      console.log(err);
      if (!err.response) {
        console.log("No Server Response");
      } else if (err.response.status === 409) {
        console.log("Username Taken");
        failed = true;
      } else {
        console.log("Registration Failed");
      }
      if(err.code == "ERR_NETWORK"){
        window.alert("Oops. It seems like you're disconnected. Please try again.")
        setRegisterFailed(true);
      }
      else{
        failed = true;
        window.alert(err);
      }
    }

console.log(registerFailed)

if(!failed){
  try{
    var auth = "Bearer "+token_retrieved;
    console.log(auth)
    var config = { headers: { Authorization: "Bearer "+token_retrieved } };
    console.log(registerUserOrgId,registerUserName);
    console.log(config,registerUserOrgId,registerUserName);

    const response = await axios.post(
      "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/organizationjoin",
     {
        org_code: registerUserOrgId,
        user_name:registerUserName,
      },
      config
    );
    localStorage.setItem("adminUserName",registerUserName);
    console.log(response);
    return history.push("/dashboard");
  }
  catch(err){
    failed = true;
    if(err.code == "ERR_NETWORK"){
      window.alert("Oops. It seems like you're disconnected. Please try again.")
    }
    else{
      window.alert("Invalid Organisation Code. Please try again or contact your organization.");
    }
  }


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
      {/* <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div> */}

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
        {/* <div className="row d-flex justify-content-center">
          {loginFailed && (
            <Alert className="error-badge mt-3" variant={"danger"}>
              {"Login Failed. Please try again."}
            </Alert>
          )}
                    
        </div> */}
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
          {/* {registerFailed && (
            <Alert className="error-badge mt-3" variant={"danger"}>
              {registerError}
            </Alert>
          )} */}
        </div>
      </Form>
    </div>
  );
};

export default LoginRegister;
