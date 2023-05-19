import React, { Component, useState, useContext } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "bootstrap";
import Form from "react-bootstrap/Form";
import Jumbotron from "../jumbotron";
import { getCurrentUser } from "../../services/authService";
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
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { authApp } from "../../firebase";
import { provider } from "../../firebase";

const Login_Col = styled.div`
  position: relative;
  gap: 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.75em 13.01em 0px 0px;
`;

const Or = styled.div`
  margin-top: -10px;
  color: #798dac;
  font-size: 20px;
  font-weight: 700;
  font-family: Outfit;
  padding-left: 180px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-left:25px;
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
  cursor: pointer;
  margin-top: -10px;
  color: #798dac;
  font-size: 20px;
  font-weight: 700;
  font-family: Outfit;
  padding-left: 80px;
`;
const Login_Button = styled.div`
  width: 100%;
  text-align: center;
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
  margin: 0px 5px 0.56em 0px;
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
  margin: 0px 5px 0.56em 0px;
  padding: 0px 5em 0px 4.25em;
`;
const Reg_ConfirmPassword = styled.div`
  width: 18.75em;
  height: 75px;
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 0px 5px 0.56em 0px;
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
  margin: 0px 5px 0.69em 0px;
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
  margin-top: -20px;
  margin-bottom: 20px;
`;
const Register_Button = styled.div`
  width: 100%;
  height: 42px;
  align-self: center;
  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
`;

//GOOGLE SIGN IN BUTTON
const SignInWithGoogleButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  padding-top: 14px;
  padding-right: 15px;
  padding-bottom: 14px;
  padding-left: 17px;
  border-width: 0px;
  border-radius: 50px;
  margin-top:20px;
  margin-left:80px;
  margin-bottom:20px;
  box-sizing: content-box;
  background-color: #f4f0f1;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const GooglePic = styled.img`
  min-width: 0px;
  min-height: 0px;
  box-sizing: border-box;
`;

const SignInGgText = styled.div`
  align-self: center;
  margin: 9px 0px 12px 0px;
  color: #798dac;
  font-size: 19px;
  font-weight: 700;
  font-family: Outfit;
  box-sizing: border-box;
`;

const Register = () => {
  const { signup, login, currentUser } = useAuth();
  const history = useHistory();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");
  const [
    registerUserPasswordConfirmation,
    setRegisterUserPasswordConfirmation,
  ] = useState("");
  const [registerUserEmail, setRegisterUserEmail] = useState("");
  const [registerUserOrgId, setRegisterUserOrgId] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [errorLog, setErrorLog] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);
  const [registerFailed, setRegisterFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const btnText = "Learn more";

  const schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    newUsername: Joi.string().required().label("Username"),
    newPassword: Joi.string().required().label("Password").min(8),
    newPasswordConfirmation: Joi.any().valid(registerUserPassword).required(),
    email: Joi.string().required().label("Email").email(),
    orgId: Joi.string().required().label("Organization ID"),
  };
 const handleSignInWithGoogle = () => {

  signInWithPopup(authApp,provider).then((data) =>{
    console.log(data);
  })
 }
  //LOGIN FUNCTION
  const doSubmitLogin = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    localStorage.removeItem("userToken");
    localStorage.clear();
    const user = { loginUserName, loginUserPassword };
    console.log(user);
    try {
      const firebase_response = await login(loginUserName, loginUserPassword);
    } catch (err) {
      window.alert(err.message);
    }
    try {
      if (loginUserName == "" && loginUserPassword == "") {
        throw "Login Failed. Please try again";
      }
      setLoading(true);

      const response = await httpService.post(
        "https://api.linkupss.com/adminlogin",
        { email: loginUserName, user_password: loginUserPassword }
      );
      console.log(response?.data);
      const token = response?.data?.access_token;
      localStorage.setItem("userToken", token);
      const admin_id = response?.data?.result[0]?.admin_id;
      console.log(admin_id);
      localStorage.setItem("adminId", JSON.stringify(admin_id));
      localStorage.setItem("adminUserName", loginUserName);

      return history.push("/dashboard");
    } catch (err) {
      if (!err?.response) {
        window.alert("Invalid fields. Please try again.");
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
  //REGISTER FUNCTION
  const doSubmitRegister = async (e) => {
    //setRegisterClicked(true);
    var failed = false;
    var token_retrieved = "";
    e.preventDefault();

    //firebase authentication
    try {
      setLoading(true);
      const firebase_response = await signup(
        registerUserEmail,
        registerUserPassword
      );
      console.log(firebase_response);
    } catch (e) {
      window.alert(e.message);
      setRegisterFailed(true);
    }
    if (!registerFailed) {
      try {
        if (
          registerName == "" ||
          registerUserOrgId == "" ||
          registerUserEmail == "" ||
          registerUserPassword == ""
        ) {
          throw "Invalid fields. Please try again";
        }
        const response = await httpService.post(
          "https://api.linkupss.com/adminregister",
          {
            name: registerName,
            user_name: registerName,
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

        localStorage.setItem("userToken", token);
        localStorage.setItem("adminId", adminid_retrieved);
        token_retrieved = token;
      } catch (err) {
        console.log(err);
        setRegisterFailed(true);

        if (!err.response) {
          console.log("No Server Response");
        } else if (err.response.status === 409) {
          console.log("Username Taken");
          failed = true;
        } else if (err.response.data["code"] === 99) {
          window.alert(
            "Email already taken. Please try again with a different email."
          );
          failed = true;
        } else {
          console.log("Registration Failed");
        }
        if (err.code == "ERR_NETWORK") {
          window.alert(
            "Oops. It seems like you're disconnected. Please try again."
          );
        } else {
          failed = true;
          window.alert(err);
        }
      }
    }

    if (!registerFailed) {
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
            user_name: registerName,
          },
          config
        );
        localStorage.setItem("adminUserName", registerName);
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

  const handleRegisterUserPasswordConfirmation = (e) => {
    setRegisterUserPasswordConfirmation(e.target.value);
    const errormsg = validateProperty(
      "newPasswordConfirmation",
      e.currentTarget.value
    );
    const errors = { ...errorLog };
    if (errormsg) errors["newPasswordConfirmation"] = errormsg;
    else delete errors["newPasswordConfirmation"];
    console.log(errormsg);
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

  return (
    <React.Fragment>
      <div className="space-box-login" />

      <LoginRegisterStyle>
        <div className="d-flex justify-content-center">
          <Form onSubmit={doSubmitRegister}  autoComplete="on">
            <Register_Col>
              <Register_Title>Register</Register_Title>
              <Register_Desc>
                Don’t have an account? Sign up now to start using your meeting
                manaement tool
              </Register_Desc>

            

              <div className="space-register" />
              <SignInWithGoogleButton
                type="button"
                onClick={(e) =>
                 {}
                }
              >
                
                <GooglePic
                  src={`https://file.rendit.io/n/SkOtNoy5DgtXLEmIqPBV.png`}
                />
                <SignInGgText>Continue with Google</SignInGgText>
              </SignInWithGoogleButton> 
              <Or>Or</Or>
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
                    autoComplete="on"
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
                    autoComplete="on"
                  />
                </InputGroup>
              </Reg_Password>

              <Reg_ConfirmPassword>
                <InputGroup className="input-g mb-3 login-input">
                  <Form.Control
                    className="login-field"
                    placeholder="Confirm Password"
                    aria-label="Password Confirmation"
                    aria-describedby="basic-addon1"
                    value={registerUserPasswordConfirmation}
                    onChange={handleRegisterUserPasswordConfirmation}
                    isInvalid={errorLog["newPasswordConfirmation"]}
                  />
                </InputGroup>
              </Reg_ConfirmPassword>

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
              {
                <button
                  type="submit"
                  disabled={loading}
                  className="register-buttons"
                >
                  <Register_Button>Register</Register_Button>
                </button>
              }
            </Register_Col>
          </Form>
        </div>
      </LoginRegisterStyle>
      <div className="space-box-login" />
    </React.Fragment>
  );
};

export default Register;
