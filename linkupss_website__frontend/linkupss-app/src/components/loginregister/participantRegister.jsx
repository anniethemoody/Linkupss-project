import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import React, { Component, useState, useContext } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Joi from "joi-browser";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
const ParticipantRegister = () => {
    const history = useHistory();
    const [registerParticipantName,setRegisterParticipantName] = useState("");
    const [registerParticipantEmail,setRegisterParticipantEmail] = useState("");
    const [registerParticipantOrgId,setRegisterParticipantOrgId] = useState("");
    const [participantId,setParticipantId] = useState(0);
    const [errorLog, setErrorLog] = useState({});
    const schema = {
        name: Joi.string().required().label("Name"),
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
        newUsername: Joi.string().required().label("Username"),
        newPassword: Joi.string().required().label("Password").min(8),
        email: Joi.string().required().label("Email").email(),
        orgId: Joi.string().required().label("Organization ID"),
      };
    const doSubmitRegister =  async () => {
        console.log(registerParticipantName,registerParticipantEmail);
        var partid = 0;
        if(registerParticipantName==""||registerParticipantEmail==""||registerParticipantOrgId==""){
            throw "Missing fields. Please try again"
          }
        
            const response = axios.post(
                "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/participantregister",
                {
                    name: registerParticipantName,
                    extra_info:registerParticipantEmail
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: false,
                  }
            ).then(result=>{
                console.log(result);
                console.log(result.data.result[0].participant_id);
                partid = result.data.result[0].participant_id;
                setParticipantId(result.data.result[0].participant_id);
                return result.data.result[0].participant_id;
            });
            const result = await response;
            console.log(result);
            console.log(partid);
            const res =axios.post(
              "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/participantjoin",
              {
                  org_code: registerParticipantOrgId,
                  participant_id: result
              },
              {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: false,
                }
          ).then(result=>{
              console.log(result);
             if(result.data.code  == 200){
              history.push("/participants")
             }
          });

        
    }
    const validateProperty = (type, val) => {
        const obj = { [type]: val };
        const schemas = { [type]: schema[type] };
        // console.log(obj, schemas);
        const { error } = Joi.validate(obj, schemas); //youre picking the {error} property of the returned Joi object
        return error ? error.details[0].message : null;
      };
    const handleRegisterName = (e) => {
        setRegisterParticipantName(e.target.value);
        const errormsg = validateProperty("name", e.currentTarget.value);
        const errors = { ...errorLog };
        if (errormsg) errors["name"] = errormsg;
        else delete errors["name"];
        setErrorLog(errors);
      };

      const handleRegisterUserEmail = (e) => {
        setRegisterParticipantEmail(e.target.value);
        const errormsg = validateProperty("email", e.currentTarget.value);
        const errors = { ...errorLog };
        if (errormsg) errors["email"] = errormsg;
        else delete errors["email"];
        setErrorLog(errors);
      };
      const handleRegisterOrgId = (e) => {
        setRegisterParticipantOrgId(e.target.value);
        const errormsg = validateProperty("orgId", e.currentTarget.value);
        const errors = { ...errorLog };
        if (errormsg) errors["orgId"] = errormsg;
        else delete errors["orgId"];
        setErrorLog(errors);
      };

    return ( 
        <div className="row modal-header text-center ">
        <Form className="align-items-start" noValidate onSubmit={doSubmitRegister}>
        <h1 className="text-primary">Register</h1>
        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Name / Username"
              aria-label="Name / Username"
              aria-describedby="basic-addon1"
              value={registerParticipantName}
              onChange={handleRegisterName}
            />
          </InputGroup>

          {errorLog["name"] && (
            <Alert className="row error-badge" variant={"danger"}>
              {errorLog["name"]}
            </Alert>
          )}
        </div>


        <div className="row d-flex justify-content-center">
          <InputGroup className="input-g mb-3">
            <Form.Control
              placeholder="Email Address"
              aria-label="Email Address"
              aria-describedby="basic-addon1"
              value={registerParticipantEmail}
              onChange={handleRegisterUserEmail}
            />
          </InputGroup>

          {errorLog["email"] && (
            <Alert className="row d-flex error-badge" variant={"danger"}>
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
              value={registerParticipantOrgId}
              onChange={handleRegisterOrgId}
            />
          </InputGroup>

          {errorLog["orgId"] && (
            <Alert className="error-badge" variant={"danger"}>
              {errorLog["orgId"]}
            </Alert>
          )}
        </div>
        <button type="button" className="btn btn-primary" onClick={()=>doSubmitRegister()}> 
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
}
 
export default ParticipantRegister;