import React, { Component, useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DatePicker from "react-datepicker";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "react-datepicker/dist/react-datepicker.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import axios from "axios"
import {
  getSession,
  getSessionParticipants,
} from "../../services/sessionService";
import {
  getOrgMembers,
  getOrgMember,
  getOrgMembersByOrg,
} from "../../services/orgMembersService";
import { v4 as uuidv4 } from "uuid";
import { getAdminInfo, getAdminInfoByOrg } from "../../services/adminService";
import { stubTrue } from "lodash";
import { setRef } from "@mui/material";

const SessionForm = (props) => {
  //----------All fields
  const [adminButtonState, setAdminButtonState] = useState(true);
  const [adminList, setAdminList] = useState([]);
  const [sessionParticipants, setSessionParticipants] = useState([]);
  const [filteredOrgMembers, setFilteredOrgMembers] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [orgMembers, setOrgMembers] = useState([]);

  const [orgAdmins, setOrgAdmins] = useState(
    getAdminInfoByOrg(props.userinfo.org_id)
  );
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [sessionId, setSessionId] = useState(uuidv4());
  const [sessionName, setSessionName] = useState("");
  const [sessionDesc, setSessionDesc] = useState("");
  const [sessionDayOfWeek, setSessionDayOfWeek] = useState(
    "Select day of week for session"
  );
  const [sessionReccuring, setSessionRecurring] = useState(false);

  const [sessionNameVal, setSessionNameVal] = useState("");
  const [sessionDescVal, setSessionDescVal] = useState("");
  const [sessionLinkVal, setSessionLinkVal] = useState("");
  const [sessionTime, setSessionTime] = useState(" ");
  const [datePickerTime, setDatePickerTime] = useState(
    new Date(null, null, null, 0, 0)
  );
  const [sessionLink, setSessionLink] = useState("");
  const [newSession, setNewSession] = useState({});
  const [errors, setErrors] = useState({
    name: "",
    desc: "",
    meeting_link: "",
  });
  //validation variables
  const [sessionNameValid, setSessionNameValid] = useState(false);
  const [sessionDescValid, setSessionDescValid] = useState(false);
  const [sessionLinkValid, setSessionLinkValid] = useState(false);
  const [sessionDayOfWeekValid, setSessionDayOfWeekValid] = useState(false);
  const [fullFormValid, setFullFormValid] = useState(false);

  //focuesd
  const [sessionNameFocused, setSessionNameFocused] = useState(false);
  const [sessionDescFocused, setSessionDescFocused] = useState(false);
  const [sessionLinkFocused, setSessionLinkFocused] = useState(false);
  //----------
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const ingred_item = e.target.value;

      const new_admin_list = [];
      for (var i of adminList) {
        new_admin_list.push(i);
      }

      new_admin_list.push(ingred_item);
      setAdminList(new_admin_list);
      setAdminButtonState(true);
    }
  };
  const handleSessionName = (e) => {
    console.log(e.target.value);
    setSessionNameVal(e.target.value);
    //console.log(sessionNameVal);
    if (handleValidation("name", e.target.value)) {
      setSessionName(e.target.value);
      //console.log(sessionName)
    }
  };
  const handleSessionDesc = (e) => {
    setSessionDescVal(e.target.value);
    if (handleValidation("desc", e.target.value)) {
      setSessionDesc(e.target.value);
    }
  };
  const handleSessionLink = (e) => {
    setSessionLinkVal(e.target.value);
    if (handleValidation("link", e.target.value)) {
      setSessionLink(e.target.value);
    }
  };
  const handleSessionTimeDateToString = (date) => {
    console.log(date);

    const time_selected =
      (date.getHours() >= 9 ? date.getHours() : "0" + date.getHours()) +
      ":" +
      (date.getMinutes() >= 9 ? date.getMinutes() : "0" + date.getMinutes());
    console.log(time_selected);
    setDatePickerTime(date);
    setSessionTime(time_selected);
  };
  const handleDeleteAdmin = (item) => {
    const new_admin_list = [];
    for (var i of adminList) {
      if (i !== item) {
        new_admin_list.push(i);
      }
    }
    setAdminList(new_admin_list);
  };
  const handleSessionDayOfWeek = (e) => {
    console.log(e);

    setSessionDayOfWeek(e);
    console.log(sessionDayOfWeek);
    if (e === "Select day of week for session") {
      //console.log("sui")

      setSessionDayOfWeekValid(false);
    } else {
      console.log("dayofweek validated");
      setSessionDayOfWeekValid(true);
    }
    console.log(sessionDayOfWeek);
  };
  const handleNameFocusing = () => {
    if (props.form_type === "new") {
      setSessionNameFocused(true);
    }
  };
  const handleDescFocusing = () => {
    if (props.form_type === "new") {
      setSessionDescFocused(true);
    }
  };
  const handleLinkFocusing = () => {
    if (props.form_type === "new") {
      setSessionLinkFocused(true);
    }
  };
  const handleSearchMember = (e) => {
    const query = e.currentTarget.value;
    setMemberSearchQuery(query);
    setFilteredOrgMembers(
      orgMembers.filter((m) =>
        m.name.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };
  const handleSearchAdmin = (e) => {
    const query = e.currentTarget.value;
    setAdminSearchQuery(query);
    setFilteredAdmins(
      orgAdmins.filter((m) =>
        m.admin_name.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };
  const handleAddOrgAdmins = (_admin_id) => {
    let new_admin_list = [];

    for (var i of adminList) {
      new_admin_list.push(i);
    }
    new_admin_list.push(_admin_id);
    setAdminList(new_admin_list);
    console.log(adminList);
  };
  const handleRemoveOrgAdmins = (_admin_id) => {
    if (_admin_id === props.userinfo._admin_id) {
      console.log("selected session: ", props.selectedSession);
      const session = props.selectedSession;
      props.removeSelfFromSession(session);
    } else {
      console.log(_admin_id);
      let new_admin_list = [];
      for (var i of adminList) {
        if (i !== _admin_id) {
          console.log("check");
          new_admin_list.push(i);
        }
      }
      //new_admin_list.splice(_admin_id, 1);
      console.log(new_admin_list);
      setAdminList(new_admin_list);
      console.log(adminList);
    }
  };
  const handleRecurring = (e) => {
    const clicked = e.target.checked;
    setSessionRecurring(clicked);
  };
  const handleAddingOrgMembers = (_member_id) => {
    const new_participant_list = [];
    for (var i of sessionParticipants) {
      new_participant_list.push(i);
    }
    //orgMembers.find(_member_id=>)

    
    new_participant_list.push(orgMembers.find((m) => m._member_id === _member_id));

    setSessionParticipants(new_participant_list);
    const authtoken = "Bearer " + localStorage.getItem("userToken");
    var config = { headers: { Authorization: authtoken } };
    console.log(props.selectedSession._id);
    if(props.form_type == "edit"){

    }
    const response = axios.post(
      "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/addtosession",
      {
        participant_id:_member_id,
        session_id:props.selectedSession._id
      },
      config
    ).then(result=>{return result}).then(result=>{console.log(result)}).catch(
      error=>{
        window.alert("Cannot add participant to session. Please try again later.")
      }
    )
    //console.log(_member_id);

     console.log(new_participant_list);
  };
  const handleRemovingOrgMembers = (_member_id) => {

    const new_participant_list = [];
    for (var i of sessionParticipants) {
      new_participant_list.push(i);
    }
    new_participant_list.splice(new_participant_list.indexOf(orgMembers.find((m) => m._member_id === _member_id)), 1);
    setSessionParticipants(new_participant_list);
    const authtoken = "Bearer " + localStorage.getItem("userToken");
    var config = { headers: { Authorization: authtoken } };
  
    const response = axios.post(
      "https://api.linkupss.com/removefromsession",
      {
        
        session_id:props.selectedSession._id,
        participant_id:_member_id
      },
      config
    ).then(result=>{return result}).then(result=>{console.log(result)}).catch(
      error=>{
        window.alert("Cannot remove participant from session. Please try again later.")
      }
    )
  };

  const handleValidation = (input, value) => {
    let validated = true;

    if (input === "name") {
      if (value.length > 19) {
        validated = false;
        return validated;
      } else if (value === "") {
        setSessionNameValid(false);
        if (sessionNameFocused) {
          setSessionNameFocused(true);
          return true;
        }
        console.log("name invalid");
      } else {
        console.log("name validated");
        setSessionNameValid(true);
        return validated;
      }
    }
    if (input === "desc") {
      if (value.length > 99) {
        validated = false;
        return validated;
      } else if (value === "") {
        setSessionDescValid(false);
        if (sessionDescFocused) {
          setSessionDescFocused(true);
          return true;
        }
      } else {
        console.log("desc validated");
        setSessionDescValid(true);
        return validated;
      }
    }
    if (input === "link") {
      console.log(value)
      if(value.length>11 || !+value){
        // setSessionLinkValid(false);
        if(value==""){
          validated = true;
          return validated;
        }
         validated = false;
         return validated;
       }
      else if (value === "") {
        setSessionLinkValid(false);
        if (sessionLinkFocused) {
          setSessionLinkFocused(true);
          return true;
        }
      } 

      else {
        console.log("link validated");
        setSessionLinkValid(true);
        return validated;
      }
    }
  };

  const discardChanges = (props) => {
    if (props.form_type === "edit") {
      props.hide();
      setSessionName(props.selectedSession.name);
      setSessionDesc(props.selectedSession.desc);
      setSessionLink(props.selectedSession.meeting_link);
      setSessionRecurring(props.selectedSession.recurring);
      setSessionNameFocused(true);
      setSessionDescFocused(true);
      setSessionLinkFocused(true);
      setSessionNameVal(props.selectedSession.name);
      setSessionDescVal(props.selectedSession.desc);
      setSessionLinkVal(props.selectedSession.meeting_link);

      console.log(props.selectedSession.participants);
      //check that
      if (typeof props.selectedSession.admins !== "undefined") {
        setAdminList(props.selectedSession.admins);
      } else {
        setAdminList([]);
      }
      if (typeof getAdminInfoByOrg(props.userinfo.org_id) !== "undefined") {
        setOrgAdmins(getAdminInfoByOrg(props.userinfo.org_id));
        setFilteredAdmins(getAdminInfoByOrg(props.userinfo.org_id));
      } else {
        setOrgAdmins([]);
        setFilteredAdmins([]);
      }

      if (typeof props.selectedSession.participants !== "undefined") {
        setSessionParticipants(props.selectedSession.participants);
      } else {
        setSessionParticipants([]);
      }
      //console.log(sessionParticipants);
      if (typeof getOrgMembersByOrg(props.userinfo.org_id) !== "undefined") {
        setOrgMembers(getOrgMembersByOrg(props.userinfo.org_id));
        setFilteredOrgMembers(getOrgMembersByOrg(props.userinfo.org_id));
      } else {
        setOrgMembers([]);
        setFilteredOrgMembers([]);
      }
      console.log(orgMembers);

      // console.log(sessionParticipants);
      setSessionDayOfWeek(props.selectedSession.day_of_week);
      setSessionTime(props.selectedSession.session_time);
      // console.log("session time:", props.selectedSession.session_time);

      setDatePickerTime(
        new Date(
          null,
          null,
          null,
          parseInt(props.selectedSession.session_time.substring(0, 2)),
          parseInt(props.selectedSession.session_time.substring(3, 5))
        )
      );
      console.log(
        sessionNameVal,
        sessionDescVal,
        sessionLinkVal,
        sessionDayOfWeek
      );
      setSessionNameValid(true);
      setSessionDescValid(true);
      setSessionLinkValid(true);
      setSessionDayOfWeekValid(true);
    }
    if (props.form_type === "new") {
      props.hide();
    }
  };
const fetchParticipants =  () => {
  const authtoken = "Bearer " + localStorage.getItem("userToken");
  var config = { headers: { Authorization: authtoken } };

 const repsonse = axios.post("https://api.linkupss.com/participantlist",
 {
  admin_id: localStorage.getItem("adminId")
 }
 ,config).then(result=>{
  console.log(result)
 //const res = await result;
  const members = result.data.participants.map((item)=>{
    return{
      _member_id: item.participant_id,
      name: item.name,
      email: null,
      org_enrolled: item.org_id,
    }
  });
  setOrgMembers(members);
  setFilteredOrgMembers(members);
 })
}
  const saveSession = (props) => {
    console.log("validated...");
    let passed_id = "";
    if (props.form_type === "edit") {
      passed_id = props.selectedSession._id;
    } else {
      passed_id = sessionId;
    }

    const session_saved = {
      _id: passed_id,
      name: sessionName,
      desc: sessionDesc,
      participants: sessionParticipants,
      admins: adminList,
      org_id: props.userinfo.org_id,
      session_time: sessionTime,
      day_of_week: sessionDayOfWeek,
      recurring: sessionReccuring,
      meeting_link: sessionLink,
    };

    setNewSession(session_saved);
    props.hide();
    props.saveSession({ session_saved });
  };
  useEffect(() => {
    console.log(props.form_type);
    if (props.form_type === "edit") {
      console.log(props.selectedSession);

      setSessionName(props.selectedSession.name);
      setSessionDesc(props.selectedSession.desc);
      setSessionLink(props.selectedSession.meeting_link);
      setSessionNameFocused(true);
      setSessionDescFocused(true);
      setSessionLinkFocused(true);
      setSessionRecurring(props.selectedSession.recurring);
      setSessionNameVal(props.selectedSession.name);
      setSessionDescVal(props.selectedSession.desc);
      setSessionLinkVal(props.selectedSession.meeting_link);

      console.log(props.selectedSession.participants);
      //check that

      if (typeof props.selectedSession.admins !== "undefined") {
        setAdminList(props.selectedSession.admins);
      } else {
        setAdminList([]);
      }
      if (typeof getAdminInfoByOrg(props.userinfo.org_id) !== "undefined") {
        setOrgAdmins(getAdminInfoByOrg(props.userinfo.org_id));
        setFilteredAdmins(getAdminInfoByOrg(props.userinfo.org_id));
      } else {
        setOrgAdmins([]);
        setFilteredAdmins([]);
      }

      if (typeof props.selectedSession.participants !== "undefined") {
        setSessionParticipants(props.selectedSession.participants);
      } else {
        setSessionParticipants([]);
      }

      if (typeof getOrgMembersByOrg(props.userinfo.org_id) !== "undefined") {
        fetchParticipants();
        setFilteredOrgMembers(getOrgMembersByOrg(props.userinfo.org_id));
      } else {
        setOrgMembers([]);
        setFilteredOrgMembers([]);
      }
      console.log(orgMembers);

      // console.log(sessionParticipants);
      setSessionDayOfWeek(props.selectedSession.day_of_week);
      setSessionTime(props.selectedSession.session_time);
      // console.log("session time:", props.selectedSession.session_time);

      setDatePickerTime(
        new Date(
          null,
          null,
          null,
          parseInt(props.selectedSession.session_time.substring(0, 2)),
          parseInt(props.selectedSession.session_time.substring(3, 5))
        )
      );
      console.log(
        sessionNameVal,
        sessionDescVal,
        sessionLinkVal,
        sessionDayOfWeek
      );
      setSessionNameValid(true);
      setSessionDescValid(true);
      setSessionLinkValid(true);
      setSessionDayOfWeekValid(true);
      //console.log(orgMembers);
    }
    if (props.form_type === "new") {
      //   if (!adminList.includes(props.userinfo._admin_id)) {
      //     console.log("saved admin");
      //     const new_adminlist = [];
      //     new_adminlist.push(props.userinfo._admin_id);
      //     setAdminList(new_adminlist);
      //   }

      //console.log(props.selectedSession._id);
      setSessionName("");
      setSessionDesc("");
      setSessionLink("");
      setSessionParticipants([]);
      setSessionRecurring(false);

      let new_admins = [];

      new_admins.push(props.userinfo._admin_id);
      if (typeof getAdminInfoByOrg(props.userinfo.org_id) !== "undefined") {
        setOrgAdmins(getAdminInfoByOrg(props.userinfo.org_id));
        setFilteredAdmins(getAdminInfoByOrg(props.userinfo.org_id));
        setAdminList(new_admins);
      } else {
        setOrgAdmins([]);
        setFilteredAdmins([]);
      }

      if (typeof getOrgMembersByOrg(props.userinfo.org_id) !== "undefined") {
          fetchParticipants();
      } else {
        setOrgMembers([]);
        setFilteredOrgMembers([]);
      }

      setSessionDayOfWeek("Select day of week for session");
      setSessionTime("00:00");
      setDatePickerTime(new Date(null, null, null, 0, 0));
      setSessionNameValid(false);
      setSessionDescValid(false);
      setSessionLinkValid(false);
      setSessionDayOfWeekValid(false);
    }
  }, [props.selectedSession, props.form_type, props.userinfo]);
  return (
    <Modal
      show={props.show}
      onHide={props.close}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>
          {props.form_type === "new" ? "Create New Session" : "Edit Session"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="session-form-size">
        <InputGroup hasValidation className="mt-3">
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control
            aria-label="Name of session"
            onChange={handleSessionName}
            onFocus={handleNameFocusing}
            value={sessionName}
          />
          {sessionName.length !== 0 && (
            <InputGroup.Text id="basic-addon2">
              {sessionName.length} /20
            </InputGroup.Text>
          )}
        </InputGroup>

        <InputGroup hasValidation className="mt-3">
          <InputGroup.Text>Session Password</InputGroup.Text>
          <Form.Control
            aria-label="Passcode of session"
            onChange={handleSessionDesc}
            onFocus={handleDescFocusing}
            value={sessionDesc}
          />
          {sessionDesc.length !== 0 && (
            <InputGroup.Text id="basic-addon2">
              {sessionDesc.length} /100
            </InputGroup.Text>
          )}
        </InputGroup>

        <InputGroup hasValidation className="mt-3">
          <InputGroup.Text>Session Link</InputGroup.Text>
          <Form.Control
            aria-label="Meeting Link or Code of session (11 Digit Code)"
            onChange={handleSessionLink}
            onFocus={handleLinkFocusing}
            value={sessionLink}
          />
              <InputGroup.Text id="basic-addon2">
              11 digit code
            </InputGroup.Text>
        </InputGroup>

        <hr className="rounded" />
        <div>
          {/*Admin card */}
          <p style={{ fontSize: "18px" }}>Admins</p>
          <Card>
            {Array.isArray(orgAdmins) && !orgAdmins.length ? (
              <Card.Header>
                <span style={{ paddingRight: "20px" }}>
                  You are the only admin in this organisation. Ask others to
                  manage your sessions with you!
                </span>
              </Card.Header>
            ) : (
              <Card.Header>
                <input
                  type="text"
                  name="query"
                  className="form-control my-3"
                  placeholder="Search admins from your organisation"
                  value={adminSearchQuery}
                  onChange={handleSearchAdmin}
                />
              </Card.Header>
            )}

            <ListGroup
              variant="flush"
              className={
                !orgAdmins.length || orgAdmins.length <= 2
                  ? "form-lisgroup-card-none"
                  : "form-listgroup-card"
              }
            >
              {!orgAdmins.length ? (
                <div></div>
              ) : (
                filteredAdmins.map((item) => (
                  <ListGroup.Item
                    className="form-listgroup-item"
                    key={item._admin_id}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>{item.admin_name}</p>
                      {adminList.indexOf(item._admin_id) !== -1 ? (
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveOrgAdmins(item._admin_id)}
                        >
                          Remove Admin
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => handleAddOrgAdmins(item._admin_id)}
                        >
                          Grant Access
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </div>
        <hr className="rounded" />

        {/*Participant card */}
        <p style={{ fontSize: "18px" }}>Participants</p>
        <Card>
          {props.form_type==="new" ? (
            <Card.Header>
              <span style={{ paddingRight: "20px" }}>
              {
                  props.form_type==="new" && 
                  <span>
                    Add your participants on your dashboard by editing your sessions ! 
                    </span>
                }
              {(props.form_type==="edit" && !orgMembers.length )&& <span>
                  There are no participants enrolled in this organisation. Ask your
                  members to register before picking participants !
                </span>}

              </span>
            </Card.Header>
          ) : (
            <Card.Header>
              <input
                type="text"
                name="query"
                className="form-control my-3"
                placeholder="Search members from your organisation"
                value={memberSearchQuery}
                onChange={handleSearchMember}
              />
            </Card.Header>
          )}
          
          <ListGroup
          variant="flush"
          className={
            !orgMembers.length || orgMembers.length <=2|| props.form_type==="new"
              ? "form-listgroup-card-none"
              : "form-listgroup-card"
          }
        >
          {!orgMembers.length || props.form_type==="new"? (
            <div></div>
          ) : (
            filteredOrgMembers.map((item) => (
              <ListGroup.Item
                className="form-listgroup-item"
                key={item._member_id}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{item.name}</p>
                  {sessionParticipants.indexOf(item) !== -1 ? (
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleRemovingOrgMembers(item._member_id)
                      }
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleAddingOrgMembers(item._member_id)}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))
          )}

        </ListGroup>



          

        </Card>

        <hr className="rounded" />
        <p style={{ fontSize: "18px" }}>Session Scheduled Time</p>

        <DatePicker
          selected={datePickerTime}
          onChange={handleSessionTimeDateToString}
          className="date-picker"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <Form.Text className="text-muted">
          Choose the starting time for your virtual session
        </Form.Text>

        <hr className="rounded" />
        <p style={{ fontSize: "18px" }}>Session Scheduled Day of Week</p>
        <DropdownButton
          variant="outline-primary"
          title={sessionDayOfWeek}
          id="input-group-dropdown-1"
          onSelect={handleSessionDayOfWeek}
        >
          <Dropdown.Item eventKey="Monday">Monday</Dropdown.Item>
          <Dropdown.Item eventKey="Tuesday">Tuesday</Dropdown.Item>
          <Dropdown.Item eventKey="Wednesday">Wednesday</Dropdown.Item>
          <Dropdown.Item eventKey="Thursday">Thursday</Dropdown.Item>
          <Dropdown.Item eventKey="Friday">Friday</Dropdown.Item>
          <Dropdown.Item eventKey="Saturday">Saturday</Dropdown.Item>
          <Dropdown.Item eventKey="Sunday">Sunday</Dropdown.Item>
        </DropdownButton>

        <hr className="rounded" />
        <p style={{ fontSize: "18px" }}>Recurring event ?</p>
        <div className = "d-flex justify-content-start align-items-center">

        <Toggle
          defaultChecked={sessionReccuring}
          onChange={handleRecurring}
        />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => discardChanges(props)}
        >
          Close
        </button>
        <button
          className="btn btn-primary"
          disabled={
            !sessionDayOfWeekValid ||
            !sessionNameValid ||
            !sessionDescValid ||
            !sessionLinkValid
          }
          onClick={() => saveSession(props)}
        >
          Save
        </button>
       
      </Modal.Footer>
    </Modal>
  );
};

export default SessionForm;
