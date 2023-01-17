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
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import axios from "axios";
import styled from "styled-components";
const Login_Col = styled.div`
position: relative;
gap: 43px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 1.75em 13.01em 0px 0px;
`;
const LoginRegisterStyle = styled.div`
width: 100%;
height: 100%;
position: relative;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-start;
padding: 2em 0px 0.81em 0px;
`;
const WhiteFlexColumn = styled.div`
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
padding: 9px 213px 9px 14px;
border-width: 1px;
border-radius: 20px;
border-style: solid;
border-color: #e2e1e5;
background-color: #ffffff;
overflow: hidden;
`;
const Name1 = styled.div`
width: 71px;
height: 30px;
color: #d2d2d2;
font-size: 15px;
font-weight: 700;
font-family: Outfit;
line-height: 30px;
white-space: nowrap;
`;
const WhiteFlexColumn1 = styled.div`
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
padding: 9px 216px 9px 14px;
border-width: 1px;
border-radius: 20px;
border-style: solid;
border-color: #e2e1e5;
background-color: #ffffff;
overflow: hidden;
`;
const Name2 = styled.div`
width: 68px;
height: 28px;
color: #d2d2d2;
font-size: 15px;
font-weight: 700;
font-family: Outfit;
line-height: 28px;
white-space: nowrap;
`;
const Space_Username = styled.div`
width: 300px;
height: 30px;
left: 68px;
top: 0px;
position: absolute;
`;

const Top_Section = styled.div`
height: 356px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
`;
const Login_Title = styled.div`
width: 2.82em;
height: 53px;
align-self: flex-end;
margin: 0px 2.5em 0.14em 0px;
color: #798dac;
font-size: 50px;
font-weight: 700;
font-family: Outfit;
line-height: 30px;
`;
const Login_Desc = styled.div`
width: 16.28em;
height: 80px;
margin: 0px 0px 0.04em 0px;
color: #798dac;
font-size: 25px;
font-family: Outfit;
line-height: 35px;
text-align: center;
`;
const Login_Username = styled.div`
width: 18.75em;
height: 79px;
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
margin: 0px 0px 0.56em 0px;
padding: 0px 3.31em 0px 3.38em;
`;
const Username = styled.div`
width: 18.75em;
height: 30px;
left: 54px;
top: 0px;
position: absolute;
`;
const Login_Password = styled.div`
width: 18.75em;
height: 75px;
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
margin: 0px 0px 0.94em 0px;
padding: 0px 3.38em 0px 3.31em;
`;
const Password1 = styled.div`
width: 18.75em;
height: 28px;
left: 53px;
top: 0px;
position: absolute;
`;
const Forgot_Pwd = styled.div`
width: 100%;
align-self: center;
margin-top:-10px;
color: #798dac;
font-size: 20px;
font-weight: 700;
font-family: Outfit;
text-align: center;
`;
const Login_Button = styled.div`
width: 100%;
align-self: center;
text-align: center;
height: 42px;
color: #798dac;
font-size: 28px;
font-weight: 700;
font-family: Outfit;
`;
const Login_Register_Line = styled.img`
width: 0.25em;
height: 616px;
position: relative;
margin: 0px 7.12em 0px 0px;
`;
const Register_Col = styled.div`
height: 621px;
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-self: flex-end;
align-items: flex-start;
`;
const Register_Title = styled.div`
width: 3.94em;
height: 53px;
margin: 0px 0px 0.12em 2.5em;
color: #798dac;
font-size: 50px;
font-weight: 700;
font-family: Outfit;
line-height: 30px;
`;
const Register_Desc = styled.div`
width: 17.92em;
height: 80px;
margin: 5px 0px 1.4em 0px;
color: #798dac;
font-size: 25px;
font-family: Outfit;
line-height: 35px;
text-align: center;
`;
const Reg_Username = styled.div`
width: 18.75em;
height: 79px;
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
margin: 0px 0px 0.56em 0px;
padding: 0px 5em 0px 4.25em;
`;
const Reg_Password = styled.div`
width: 18.75em;
height: 75px;
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
margin: 0px 0px 0.56em 0px;
padding: 0px 5em 0px 4.25em;
`;
const Space_Pwd = styled.div`
width: 18.75em;
height: 28px;
left: 68px;
top: 0px;
position: absolute;
`;
const Reg_Email = styled.div`
width: 18.75em;
height: 79px;
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
margin: 0px 0px 0.69em 0px;
padding: 0px 5em 0px 4.25em;
`;
const Reg_Email_Field = styled.div`
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
padding: 0.56em 15.25em 0.56em 0.88em;
border-width: 1px;
border-radius: 20px;
border-style: solid;
border-color: #e2e1e5;
background-color: #ffffff;
overflow: hidden;
`;
const Name5 = styled.div`
width: 2.67em;
height: 30px;
color: #d2d2d2;
font-size: 15px;
font-weight: 700;
font-family: Outfit;
line-height: 30px;
white-space: nowrap;
`;
const Organisation = styled.div`
width: 18.75em;
height: 79px;
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
margin: 0px 0px 1.31em 0px;
padding: 0px 5em 0px 4.25em;
`;
const Orgid = styled.div`
position: relative;
gap: 0px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
padding: 0.56em 10.88em 0.56em 0.88em;
border-width: 1px;
border-radius: 20px;
border-style: solid;
border-color: #e2e1e5;
background-color: #ffffff;
overflow: hidden;
`;
const Name6 = styled.div`
width: 7.33em;
height: 30px;
color: #d2d2d2;
font-size: 15px;
font-weight: 700;
font-family: Outfit;
line-height: 30px;
white-space: nowrap;
`;
const Donthaveorgid = styled.div`
width: 100%;
color: #798dac;
font-size: 20px;
font-weight: 700;
font-family: Outfit;
text-align: center;
margin-top:-20px;
margin-bottom:20px;
`;
const Register_Button = styled.div`
width: 100%;
height: 42px;
align-self:center;
color: #798dac;
font-size: 28px;
font-weight: 700;
font-family: Outfit;
`;
const LoginRegister = () => {
  const history = useHistory();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");
  const [registerUserEmail, setRegisterUserEmail] = useState("");
  const [registerUserOrgId, setRegisterUserOrgId] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [errorLog, setErrorLog] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);
  const [registerFailed, setRegisterFailed] = useState(false);
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
      if (loginUserName == "" && loginUserPassword == "") {
        throw "Login Failed. Please try again";
      }
      const response = await httpService.post(
        "https://api.linkupss.com/adminlogin",
        { user_name: loginUserName, user_password: loginUserPassword }
      );
      console.log(response?.data);
      const token = response?.data?.access_token;
      localStorage.setItem("userToken", token);
      const admin_id = response?.data?.result[0]?.admin_id;
      console.log(admin_id);
      localStorage.setItem("adminId", JSON.stringify(admin_id));
      localStorage.setItem("adminUserName", loginUserName);

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
        window.alert("Missing fields. Please try again.");
      } else if (err.response?.status === 400) {
        window.alert("Missing Username or Password");
      } else if (err.response.data.msg) {
        window.alert(err.response.data.msg);
      } else if (err.response?.status === 401) {
        window.alert("Unauthorized");
      } else if (err.code == "ERR_NETWORK") {
        console.log(err.code);
        // window.alert("Oops. It seems like you're disconnected. Please try again.")
      } else {
        window.alert(err);
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
      console.log(registerUserName, registerUserOrgId);
      if (
        (registerName == "") | (registerUserName == "") ||
        registerUserOrgId == "" ||
        registerUserEmail == "" ||
        registerUserPassword == ""
      ) {
        throw "Missing fields. Please try again";
      }
      const response = await httpService.post(
        "https://api.linkupss.com/adminregister",
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
      const adminid_retrieved = response.data.data[0].admin_id;
      //**********************************************//
      // NEED TO RETRIEVE ADMIN ID FROM /adminregister
      localStorage.setItem("userToken", token);
      localStorage.setItem("adminId", adminid_retrieved);
      token_retrieved = token;

      if (response.data.msg != "Registered") {
        setRegisterFailed(true);
        // setRegisterError(response.data.msg+". Please try again")
        failed = true;
        window.alert(response.data.msg + ". Please try again");
      } else {
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
      if (err.code == "ERR_NETWORK") {
        window.alert(
          "Oops. It seems like you're disconnected. Please try again."
        );
        setRegisterFailed(true);
      } else {
        failed = true;
        window.alert(err);
      }
    }

    console.log(registerFailed);

    if (!failed) {
      try {
        var auth = "Bearer " + token_retrieved;
        console.log(auth);
        var config = {
          headers: { Authorization: "Bearer " + token_retrieved },
        };
        console.log(registerUserOrgId, registerUserName);
        console.log(config, registerUserOrgId, registerUserName);

        const response = await axios.post(
          "https://api.linkupss.com/organizationjoin",
          {
            org_code: registerUserOrgId,
            user_name: registerUserName,
          },
          config
        );
        localStorage.setItem("adminUserName", registerUserName);
        console.log(response);
        return history.push("/dashboard");
      } catch (err) {
        failed = true;
        if (err.code == "ERR_NETWORK") {
          window.alert(
            "Oops. It seems like you're disconnected. Please try again."
          );
        } else {
          window.alert(
            "Invalid Organisation Code. Please try again or contact your organization."
          );
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
  }
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

  // return (
  //   <div className="row modal-header text-center ">
  //     {/* Login Side */}


  //     <Form className="col-md-6 align-items-start" onSubmit={doSubmitLogin}>
  //       <h1 className="text-primary">Login</h1>
  //       <div className="row d-flex justify-content-center">
  //         <InputGroup className="input-g mb-3">
  //           <Form.Control
  //             placeholder="Username"
  //             aria-label="Username"
  //             aria-describedby="basic-addon1"
  //             value={loginUserName}
  //             isInvalid={errorLog["username"]}
  //             //onChange={(e) => setLoginUserName(e.target.value)}
  //             onChange={handleLoginUserName}
  //           />
  //         </InputGroup>

  //         {errorLog["username"] && (
  //           <Alert className="error-badge" variant={"danger"}>
  //             {errorLog["username"]}
  //           </Alert>
  //         )}
  //       </div>
  //       <div className="row d-flex justify-content-center">
  //         <InputGroup className="input-g mb-3">
  //           <Form.Control
  //             placeholder="Password"
  //             aria-label="Password"
  //             aria-describedby="basic-addon1"
  //             value={loginUserPassword}
  //             isInvalid={errorLog["password"]}
  //             //onChange={(e) => setLoginUserPassword(e.target.value)}
  //             onChange={handleLoginUserPassword}
  //           />
  //         </InputGroup>
  //         {errorLog["password"] && (
  //           <Alert className="error-badge" variant={"danger"}>
  //             {errorLog["password"]}
  //           </Alert>
  //         )}
  //       </div>

  //       <button
  //         type="submit"
  //         className="btn btn-primary"
  //         //onClick={() => doSubmitLogin()}
  //       >
  //         Login
  //       </button>

  //     </Form>

  //     {/* Register Side */}
  //     <Form
  //       onSubmit={doSubmitRegister}
  //     >
  //       <h1 className="text-primary">Register</h1>
  //       <div className="row d-flex justify-content-center">
  //         <InputGroup className="input-g mb-3">
  //           <Form.Control
  //             placeholder="Name"
  //             aria-label="Name"
  //             aria-describedby="basic-addon1"
  //             value={registerName}
  //             onChange={handleRegisterName}
  //           />
  //         </InputGroup>

  //         {errorLog["name"] && (
  //           <Alert className="error-badge" variant={"danger"}>
  //             {errorLog["name"]}
  //           </Alert>
  //         )}
  //       </div>
  //       <div className="row d-flex justify-content-center">
  //         <InputGroup className="input-g mb-3">
  //           <Form.Control
  //             placeholder="Username"
  //             aria-label="Username"
  //             aria-describedby="basic-addon1"
  //             value={registerUserName}
  //             onChange={handleRegisterUserName}
  //           />
  //         </InputGroup>

  //         {errorLog["newUsername"] && (
  //           <Alert className="error-badge" variant={"danger"}>
  //             {errorLog["newUsername"]}
  //           </Alert>
  //         )}
  //       </div>
  //       <div className="row d-flex justify-content-center">
  //         <InputGroup className="input-g mb-3">
  //           <Form.Control
  //             placeholder="New Password"
  //             aria-label="Password"
  //             aria-describedby="basic-addon1"
  //             value={registerUserPassword}
  //             onChange={handleRegisterUserPassword}
  //           />
  //         </InputGroup>

  //         {errorLog["newPassword"] && (
  //           <Alert className="error-badge" variant={"danger"}>
  //             {errorLog["newPassword"]}
  //           </Alert>
  //         )}
  //       </div>
  //       <div className="row d-flex justify-content-center">
  //         <InputGroup className="input-g mb-3">
  //           <Form.Control
  //             placeholder="Email Address"
  //             aria-label="Email Address"
  //             aria-describedby="basic-addon1"
  //             value={registerUserEmail}
  //             onChange={handleRegisterUserEmail}
  //           />
  //         </InputGroup>

  //         {errorLog["email"] && (
  //           <Alert className="error-badge" variant={"danger"}>
  //             {errorLog["email"]}
  //           </Alert>
  //         )}
  //       </div>
  //       <div className="row d-flex justify-content-center">
  //         <InputGroup className="input-g mb-3">
  //           <Form.Control
  //             placeholder="Organization ID"
  //             aria-label="Organization ID"
  //             aria-describedby="basic-addon1"
  //             value={registerUserOrgId}
  //             onChange={handleRegisterOrgId}
  //           />
  //         </InputGroup>

  //         {errorLog["orgId"] && (
  //           <Alert className="error-badge" variant={"danger"}>
  //             {errorLog["orgId"]}
  //           </Alert>
  //         )}
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Sign Up
  //       </button>
  //       <div className="row d-flex justify-content-center">
  //         {/* {registerFailed && (
  //           <Alert className="error-badge mt-3" variant={"danger"}>
  //             {registerError}
  //           </Alert>
  //         )} */}
  //       </div>
  //     </Form>
  //   </div>
  // );


return(
  <React.Fragment>
          <div className="space-box-login" />

  <LoginRegisterStyle>
    <div className="d-flex justify-content-center">

      <Form onSubmit={doSubmitLogin}>
      <Login_Col>
        <Top_Section>
          <Login_Title>Login</Login_Title>
          <Login_Desc>
            Sign in to start using your meeting management tool
          </Login_Desc>
          <Login_Username>
            <Username />
          <InputGroup className="input-g mb-3 login-input">
            <Form.Control
              key="login-username"

            className="login-field"
               placeholder="Username"
              aria-label="Username"
             aria-describedby="basic-addon1"
              value={loginUserName}
              isInvalid={errorLog["username"]}
              //onChange={(e) => setLoginUserName(e.target.value)}
               onChange={handleLoginUserName}
             />
           </InputGroup>
          </Login_Username>
          <Login_Password>
            <Password1 />
              <InputGroup className="input-g mb-3 login-input">
             <Form.Control
             key="login-password"
             className="login-field"
               placeholder="Password"
               aria-label="Password"
               aria-describedby="basic-addon1"
               value={loginUserPassword}
               isInvalid={errorLog["password"]}
               //onChange={(e) => setLoginUserPassword(e.target.value)}
               onChange={handleLoginUserPassword}
             />
           </InputGroup>
          </Login_Password>
          <Forgot_Pwd>Forgot your password ?</Forgot_Pwd>
        </Top_Section>
        <button type="btn" className="login-register-buttons" onClick={() => doSubmitLogin()}>

        <Login_Button>Login</Login_Button>
        </button>
      </Login_Col>
      </Form>
      <Login_Register_Line
        src={`https://file.rendit.io/n/O41yB1kxmHauj1mBztTm.png`}
      />
             <Form
         onSubmit={doSubmitRegister}
       >
      <Register_Col>
        <Register_Title>Register</Register_Title>
        <Register_Desc>
          Don’t have an account ? Sign up now to start using your meeting
          manaement tool
        </Register_Desc>
        <Reg_Username>
          <Space_Username />
                   <InputGroup className="input-g mb-3 login-input">
             <Form.Control
             className="login-field"
               placeholder="Name"
               aria-label="Name"
               aria-describedby="basic-addon1"
               value={registerName}
               onChange={handleRegisterName}
               isInvalid={errorLog["name"]}
             />
           </InputGroup>
        </Reg_Username>
        <Reg_Password>
          <Space_Pwd />
                   <InputGroup className="input-g mb-3 login-input">
             <Form.Control
             className="login-field"
               placeholder="Create A New Password"
               aria-label="Password"
               aria-describedby="basic-addon1"
               value={registerUserPassword}
               onChange={handleRegisterUserPassword}
               isInvalid={errorLog["newPassword"]}
             />
           </InputGroup>
        </Reg_Password>
        <Reg_Email>
          <Space_Username />
          <InputGroup className="input-g mb-3 login-input">
             <Form.Control
             className="login-field"
               placeholder="Email Address"
               aria-label="Email Address"
               aria-describedby="basic-addon1"
               value={registerUserEmail}
               onChange={handleRegisterUserEmail}
               isInvalid={errorLog["email"]}

             />
           </InputGroup>
  
        </Reg_Email>
        <Organisation>
          <Space_Username />
       
            <InputGroup className="input-g mb-3 login-input">
             <Form.Control
              className="login-field"
               placeholder="Organization ID"
               aria-label="Organization ID"
               aria-describedby="basic-addon1"
               value={registerUserOrgId}
               onChange={handleRegisterOrgId}
             />
           </InputGroup>
        
        </Organisation>
        <Donthaveorgid>Don’t have an org ID ?</Donthaveorgid>
        <button type="submit" className="login-register-buttons">

        <Register_Button>Register</Register_Button>
        </button>
      </Register_Col>
      </Form>
    </div>
  </LoginRegisterStyle>
  </React.Fragment>
)



};

export default LoginRegister;
