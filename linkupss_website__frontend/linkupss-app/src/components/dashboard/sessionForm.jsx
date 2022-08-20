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
import { getSession,getSessionParticipants } from "../../services/sessionService";
import { getOrgMembers,getOrgMember } from "../../services/orgMembersService";
import { v4 as uuidv4 } from 'uuid';

const SessionForm = (props) => {
  const [adminButtonState, setAdminButtonState] = useState(true);
  const [adminList, setAdminList] = useState([]);
  const [sessionParticipants, setSessionParticipants] = useState([]);
  const [filteredOrgMembers, setFilteredOrgMembers] = useState([]);
  const [orgMembers,setOrgMembers] = useState(getOrgMembers());
  const [memberSearchQuery,setMemberSearchQuery] = useState("");
  const [sessionId,setSessionId] = useState(uuidv4())
  const [sessionName, setSessionName] = useState("Enter session name");
  const [sessionDesc, setSessionDesc] = useState("Enter session description");
  const [sessionDayOfWeek, setSessionDayOfWeek] = useState(
    "Select day of week for session"
  );
  const [sessionTime, setSessionTime] = useState(" ");
  const [datePickerTime, setDatePickerTime] = useState(new Date(null,null,null,0,0));
  const [sessionLink, setSessionLink] = useState(
    "Enter link to session meeting"
  );
  const [newSession, setNewSession] = useState({});

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
    setSessionName(e.target.value);
  };
  const handleSessionDesc = (e) => {
    setSessionDesc(e.target.value);
  };
  const handleSessionLink = (e) => {
    setSessionLink(e.target.value);
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
      if (i != item) {
        new_admin_list.push(i);
      }
    }
    setAdminList(new_admin_list);
  };
  const handleSessionDayOfWeek = (e) => {
    setSessionDayOfWeek(e);
  };
  const handleNameFocusing = () => {
    if (props.form_type === "new") {
      setSessionName(" ");
    }
  };
  const handleDescFocusing = () => {
    if (props.form_type === "new") {
      setSessionDesc(" ");
    }
  };
  const handleLinkFocusing = () => {
    if (props.form_type === "new") {
      setSessionLink(" ");
    }
  };
  const handleSearchMember = (e) => {
    const query= e.currentTarget.value;
    setMemberSearchQuery(query);
    setFilteredOrgMembers(orgMembers.filter(m=>m.name.toLowerCase().startsWith(query.toLowerCase())));
    
  };

  const handleAddingOrgMembers = (_member_id) => {
 
        let session_id_passed="";
        console.log(getOrgMember(_member_id));
        const index = orgMembers.indexOf(getOrgMember(_member_id));
        const new_org_members = [];
        for (var i of orgMembers) {
            new_org_members.push(i);
          }
          if(props.form_type == "new"){
            session_id_passed = sessionId;
          }
          else{
            session_id_passed = props.selectedSession._id
          }

          new_org_members[index].sessions_enrolled.push(session_id_passed);
          setOrgMembers(new_org_members);
        const new_participant_list = [];
        for (var i of sessionParticipants) {
            new_participant_list.push(i);
          }
          new_participant_list.push(_member_id);
          setSessionParticipants(new_participant_list);
    
          console.log(new_org_members);
  }
  const handleRemovingOrgMembers = (_member_id) => {
    let session_id_passed="";
    const index = orgMembers.indexOf(getOrgMember(_member_id));
    console.log(index);
    const new_org_members = [];
    for (var i of orgMembers) {
        new_org_members.push(i);
      }
      if(props.form_type == "new"){
        session_id_passed = sessionId;
      }
      else{
        session_id_passed = props.selectedSession._id
      }
      const session_index = new_org_members[index].sessions_enrolled.indexOf(getSession(session_id_passed));
      new_org_members[index].sessions_enrolled.splice(session_id_passed,1);
      setOrgMembers(new_org_members);
      const new_participant_list = [];
      for (var i of sessionParticipants) {
          new_participant_list.push(i);
        }
        new_participant_list.splice(_member_id,1);
        setSessionParticipants(new_participant_list);
  
  }
  const saveSession = (props) => {
    console.log(props.form_type);
    let passed_id = "";
    if(props.form_type === "edit"){
        passed_id = props.selectedSession._id;
    }
    else{
        passed_id = sessionId;
    }
    const session_saved = {
      _id: passed_id,
      name: sessionName,
      desc: sessionDesc,
      participants: sessionParticipants,
      admins: adminList,
      org_id: props.selectedSession.org_id,
      session_time: sessionTime,
      day_of_week: sessionDayOfWeek,
      meeting_link: sessionLink,
    };

    setNewSession(session_saved);
    props.hide();
    props.saveSession({ session_saved });
  };
  useEffect(() => {
    if (props.form_type === "edit") {
      console.log(props.selectedSession);
      //const {name,desc,meeting_link,session_time,day_of_week} = props.selectedSession;
      console.log(props.selectedSession.name);
      let temp_admin = [];
      let temp_participants = [];
      temp_admin = temp_admin.concat(props.selectedSession.admins);
      temp_participants = temp_participants.concat(
        props.selectedSession.participants
      );

      setSessionName(props.selectedSession.name);
      setSessionDesc(props.selectedSession.desc);
      setSessionLink(props.selectedSession.meeting_link);
      console.log(props.selectedSession.participants);
      if (typeof props.selectedSession.participants !== "undefined") {
        setSessionParticipants(
          props.selectedSession.participants
        );
        setFilteredOrgMembers(
          getOrgMembers()
        );
      }
      // console.log(sessionParticipants);
      setSessionDayOfWeek(props.selectedSession.day_of_week);
      setSessionTime(props.selectedSession.session_time);
      console.log(props.selectedSession.session_time);
      setDatePickerTime(
        new Date(
          null,
          null,
          null,
          parseInt(props.selectedSession.session_time.substring(0, 2)),
          parseInt(props.selectedSession.session_time.substring(3, 5))
        )
      );
    }
    if (props.form_type === "new") {
      setAdminList([]);
      //console.log(props.selectedSession._id);
      setSessionName("Enter session name");
      setSessionDesc("Enter session description");
      setSessionLink("Enter session link");
      setSessionParticipants([]);
      setFilteredOrgMembers(getOrgMembers());
      setSessionDayOfWeek("Select day of week for session");
      setSessionTime("00:00");
    }
  }, [props.selectedSession, props.form_type]);
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
        <InputGroup className="mb-3">
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control
            aria-label="Name of session"
            onChange={handleSessionName}
            onFocus={handleNameFocusing}
            value={sessionName}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Description</InputGroup.Text>
          <Form.Control
            aria-label="Description of session"
            onChange={handleSessionDesc}
            onFocus={handleDescFocusing}
            value={sessionDesc}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Session Link</InputGroup.Text>
          <Form.Control
            aria-label="Meeting Link or Code of session"
            onChange={handleSessionLink}
            onFocus={handleLinkFocusing}
            value={sessionLink}
          />
        </InputGroup>

        <hr className="rounded" />
        <div>
          <p style={{ fontSize: "18px" }}>Admins</p>
          <div
            className="adminlist-spacing"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {adminList &&
              adminList.map((item) => (
                <button
                  key={item}
                  className="btn btn-primary adminButton-spacing"
                  style={{
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>{item}</span>
                  <CloseIcon onClick={() => handleDeleteAdmin(item)} />
                </button>
              ))}
          </div>
          {adminButtonState && (
            <button
              className="btn btn-primary"
              style={{
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setAdminButtonState(false)}
            >
              <AddIcon style={{ fontSize: "20px" }} />
              <span>Add admins</span>
            </button>
          )}
          {!adminButtonState && (
            <Form.Control
              type="search"
              placeholder="Enter admins for this session"
              className="me-2"
              aria-label="Search"
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
        <hr className="rounded" />
        <p style={{ fontSize: "18px" }}>Participants</p>
        <Card>
          {Array.isArray(orgMembers) && !orgMembers.length ? (
            <Card.Header>
              <span style={{ paddingRight: "20px" }}>
                There are no users enrolled in this organisation. Ask your
                members to register before picking participants !
              </span>
            </Card.Header>
          ) : (
            <Card.Header>
              <input
                type="text"
                name="query"
                className="form-control my-3"
                placeholder="Search members from organisation"
                value={memberSearchQuery}
                onChange={handleSearchMember}
              />
            </Card.Header>
          )}
          <ListGroup variant="flush" className={!orgMembers.length ? "form-lisgroup-card-none" : "form-listgroup-card"}>
            {!orgMembers.length ? (
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
                      }}>
                      <p>{item.name}</p>
                  {item.sessions_enrolled.indexOf(props.form_type==="edit"?props.selectedSession._id:sessionId) !==
                    -1 ? (<Button variant="danger" onClick = {()=>handleRemovingOrgMembers(item._member_id)}>Remove</Button>):(<Button variant="primary" onClick = {()=>handleAddingOrgMembers(item._member_id)}>Add</Button>)}
                    </div>
                  
                </ListGroup.Item>
              ))
            )}
            {/* 
            <ListGroup.Item className="form-listgroup-item">
                <div style={{display:"flex",justifyContent: "space-between",alignItems:"center"}}>
              <span style={{alignSelf:"center"}}>Hello</span>
              <Button style={{alignSelf:"center"}} variant="danger">Remove</Button>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="form-listgroup-item">
                <div style={{display:"flex",justifyContent: "space-between",alignItems:"center"}}>
              <p>Hello</p>
              <Button variant="danger">Remove</Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="form-listgroup-item">
                <div style={{display:"flex",justifyContent: "space-between",alignItems:"center"}}>
              <p>Hello</p>
              <Button variant="danger">Remove</Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="form-listgroup-item">
                <div style={{display:"flex",justifyContent: "space-between",alignItems:"center"}}>
              <p>Hello</p>
              <Button variant="danger">Remove</Button>
              </div>
            </ListGroup.Item> */}
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
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.hide}>
          Close
        </button>
        <button className="btn btn-primary" onClick={() => saveSession(props)}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionForm;
