import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import styled from "styled-components";

const ResetYourPasswordComponent = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 12px 10px;
  box-sizing: border-box;
`;
const ResetBox = styled.div`
  margin-top: 20%;
  width: 50%;
  gap: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 106px 75px 83px 75px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fdfbfc;
`;
const ResetYourPasswordText = styled.div`
  margin: 0px 0px 19px 0px;
  color: #798dac;
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
  line-height: 30px;
  text-align: center;
  box-sizing: border-box;
`;
const ResetDescription = styled.div`
  width: 78.62%;
  color: #798dac;
  font-size: 20px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
  box-sizing: border-box;
`;

const ResetButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  padding-top: 15px;
  padding-right: 87px;
  padding-bottom: 23px;
  padding-left: 87px;
  border-width: 0px;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #f4f0f1;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Reset = styled.div`
  margin: 0px 8px 0px 0px;
  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
  box-sizing: border-box;
`;
const SignUpText = styled.div`
  color: #798dac;
  font-size: 20px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
  box-sizing: border-box;
`;
const ResetYourPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [errorLog, setErrorLog] = useState({});
  const [loading,setLoading] = useState(false)
  const schema = {
    email: Joi.string().required().label("Email").email(),
  };
  const {resetPassword} = useAuth();
  const handleResetEmail = (e) => {
    setResetEmail(e.target.value);
    const errormsg = validateProperty("email", e.currentTarget.value);
    const errors = { ...errorLog };
    if (errormsg) errors["email"] = errormsg;
    else delete errors["email"];
    setErrorLog(errors);
  };
  const validateProperty = (type, val) => {
    const obj = { [type]: val };
    const schemas = { [type]: schema[type] };
    // console.log(obj, schemas);
    const { error } = Joi.validate(obj, schemas); //youre picking the {error} property of the returned Joi object
    return error ? error.details[0].message : null;
  };
  const doOnReset = async (e) => {
    try{
        setLoading(true);
        const firebase_response = await resetPassword(resetEmail);

    }
    catch(err){
        window.alert(err.message)
    }
  };
  return (
    <ResetYourPasswordComponent>
      <ResetBox>
        <ResetYourPasswordText>Reset Your Password</ResetYourPasswordText>
        <ResetDescription>
          A confirmation email will be sent to your inbox to reset your password
        </ResetDescription>
        {!loading &&
        <React.Fragment>

        <InputGroup className="input-g mb-3 login-input">
          <Form.Control
            className="login-field"
            placeholder="Email Address"
            aria-label="Email Address"
            aria-describedby="basic-addon1"
            value={resetEmail}
            onChange={handleResetEmail}
            isInvalid={errorLog["email"]}
          />
        </InputGroup>

        <ResetButton onClick={(e) => {doOnReset()}}>
          <Reset>Reset </Reset>
        </ResetButton>
        </React.Fragment>
}
    {
        loading &&
        <ResetDescription>
            Please check your inbox for further instructions on changing your pasword.
      </ResetDescription>
    }
      </ResetBox>
      <SignUpText>Need an account ? Sign up here !</SignUpText>
    </ResetYourPasswordComponent>
  );
};

export default ResetYourPassword;
