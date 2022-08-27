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

const SessionForm = (props) => {
  //----------All fields
  const [adminButtonState, setAdminButtonState] = useState(true);
  const [adminList, setAdminList] = useState([]);
  const [sessionParticipants, setSessionParticipants] = useState([]);
  const [filteredOrgMembers, setFilteredOrgMembers] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [orgMembers, setOrgMembers] = useState([]);
  //console.log(orgMembers);
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
      if (i !== item) {
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
      props.removeSelfFromSession();
    } else {
      console.log(_admin_id);
      let new_admin_list = [];
      for (var i of adminList) {
        if(i !== _admin_id){
            console.log("check")
        new_admin_list.push(i);
        }
      }
      //new_admin_list.splice(_admin_id, 1);
      console.log(new_admin_list);
      setAdminList(new_admin_list);
      console.log(adminList);
    }
  };

  const handleAddingOrgMembers = (_member_id) => {
    // let session_id_passed="";
    // console.log(getOrgMember(_member_id));
    // const index = orgMembers.indexOf(getOrgMember(_member_id));
    // const new_org_members = [];
    // for (var i of orgMembers) {
    //     new_org_members.push(i);
    //   }
    //   if(props.form_type == "new"){
    //     session_id_passed = sessionId;
    //   }
    //   else{
    //     session_id_passed = props.selectedSession._id
    //   }

    //   new_org_members[index].sessions_enrolled.push(session_id_passed);
    //   setOrgMembers(new_org_members);
    const new_participant_list = [];
    for (var i of sessionParticipants) {
      new_participant_list.push(i);
    }
    new_participant_list.push(_member_id);
    setSessionParticipants(new_participant_list);

    // console.log(new_org_members);
  };
  const handleRemovingOrgMembers = (_member_id) => {
    // let session_id_passed="";
    // const index = orgMembers.indexOf(getOrgMember(_member_id));
    // console.log(index);
    // const new_org_members = [];
    // for (var i of orgMembers) {
    //     new_org_members.push(i);
    //   }
    //   if(props.form_type == "new"){
    //     session_id_passed = sessionId;
    //   }
    //   else{
    //     session_id_passed = props.selectedSession._id
    //   }

    //   const session_index = new_org_members[index].sessions_enrolled.indexOf(getSession(session_id_passed));
    //   new_org_members[index].sessions_enrolled.splice(session_id_passed,1);
    //   setOrgMembers(new_org_members);

    const new_participant_list = [];
    for (var i of sessionParticipants) {
      new_participant_list.push(i);
    }
    new_participant_list.splice(_member_id, 1);
    setSessionParticipants(new_participant_list);
  };
  const handleValidation = (input) => {
    if (input === "name") {
      if (sessionName.length > 10) {
      }
      if (sessionName === "") {
      }
    }
    if (input === "desc") {
      if (sessionDesc.length > 18) {
      }
    }
    if (input === "meeting-link") {
      if (sessionLink === "") {
      }
    }
  };

  const saveSession = (props) => {
    console.log(props.selectedSession);
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
      //   let temp_admin = [];
      //   let temp_participants = [];
      //   temp_admin = temp_admin.concat(props.selectedSession.admins);
      //   temp_participants = temp_participants.concat(
      //     props.selectedSession.participants
      //   );
      //setAdminList(temp_admin);
      setSessionName(props.selectedSession.name);
      setSessionDesc(props.selectedSession.desc);
      setSessionLink(props.selectedSession.meeting_link);
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
        setOrgMembers(getOrgMembersByOrg(props.userinfo.org_id));
        setFilteredOrgMembers(getOrgMembersByOrg(props.userinfo.org_id));
      } else {
        setOrgMembers([]);
        setFilteredOrgMembers([]);
      }

      setSessionDayOfWeek("Select day of week for session");
      setSessionTime("00:00");
      setDatePickerTime(new Date(null, null, null, 0, 0));
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
                placeholder="Search members from your organisation"
                value={memberSearchQuery}
                onChange={handleSearchMember}
              />
            </Card.Header>
          )}
          <ListGroup
            variant="flush"
            className={
              !orgMembers.length || orgMembers.length <= 2
                ? "form-lisgroup-card-none"
                : "form-listgroup-card"
            }
          >
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
                    }}
                  >
                    <p>{item.name}</p>
                    {sessionParticipants.indexOf(item._member_id) !== -1 ? (
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
