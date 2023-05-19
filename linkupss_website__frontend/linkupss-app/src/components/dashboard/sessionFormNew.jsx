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
import axios from "axios";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from 'dayjs';

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
import jwtDecode from "jwt-decode";
const DayOfWeek = new Map([
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
    [7, "Sunday"],
  ]);
  const Recurrence = new Map([
    [1, "Every day at this time"],
    [2, "Every week at this time"],
    [3, "Every bi-weekly at this time"],
    [4, "Every Month at this time"],
    [5, "Every Bi-Monthly at this time"],
  ]);
const SessionFormNew = (props) => {
  //----------All fields
  //const [adminButtonState, setAdminButtonState] = useState(true);
 // const [adminList, setAdminList] = useState([]);
  const [sessionParticipants, setSessionParticipants] = useState([]);
  const [filteredOrgMembers, setFilteredOrgMembers] = useState([]);
//   const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [orgMembers, setOrgMembers] = useState([]);

//   const [orgAdmins, setOrgAdmins] = useState(
//     getAdminInfoByOrg(props.userinfo.org_id)
//   );
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  //const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [sessionId, setSessionId] = useState(uuidv4());
  const [sessionName, setSessionName] = useState("");
  //const [sessionDesc, setSessionDesc] = useState("");
  const [sessionDayOfWeek, setSessionDayOfWeek] = useState(
    "Select day of week for session"
  );
  const [sessionReccuring, setSessionRecurring] = useState(false);
  const [sessionRecurringFreq, setSessionRecurringFreq] = useState("How often?");
  const [sessionNameVal, setSessionNameVal] = useState("");
//   const [sessionDescVal, setSessionDescVal] = useState("");
//   const [sessionLinkVal, setSessionLinkVal] = useState("");
  const [sessionTime, setSessionTime] = useState(" ");
  const [datePickerTime, setDatePickerTime] = useState(
    dayjs()
  );
  const [sessionLink, setSessionLink] = useState("");
 // const [newSession, setNewSession] = useState({});
  const [errors, setErrors] = useState({
    name: "",
    desc: "",
    meeting_link: "",
  });
  const [sessionAdvancedSettings,setSessionAdvancedSettings] = useState(false);
  //validation variables
  const [sessionNameValid, setSessionNameValid] = useState(false);
  const [sessionDayOfWeekValid, setSessionDayOfWeekValid] = useState(false);
  const [fullFormValid, setFullFormValid] = useState(false);

  //focuesd
  const [sessionNameFocused, setSessionNameFocused] = useState(false);
  const [sessionMeetingType, setSessionMeetingType] = useState(0);
  //----------
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       const ingred_item = e.target.value;

//       const new_admin_list = [];
//       for (var i of adminList) {
//         new_admin_list.push(i);
//       }

//       new_admin_list.push(ingred_item);
//       setAdminList(new_admin_list);
//       setAdminButtonState(true);
//     }
//   };
const handleSessionRecurringFreq = (e) => {

setSessionRecurringFreq(Recurrence.get(parseInt(e)));

}



  const handleSessionName = (e) => {
    console.log(e.target.value);
    setSessionNameVal(e.target.value);
    //console.log(sessionNameVal);
    if (handleValidation("name", e.target.value)) {
      setSessionName(e.target.value);
      //console.log(sessionName)
    }
  };
//   const handleSessionDesc = (e) => {
//     setSessionDescVal(e.target.value);
//     if (handleValidation("desc", e.target.value)) {
//       setSessionDesc(e.target.value);
//     }
//   };
//   const handleSessionLink = (e) => {
//     setSessionLinkVal(e.target.value);
//     if (handleValidation("link", e.target.value)) {
//       setSessionLink(e.target.value);
//     }
//   };
  const handleSessionTimeDateToString = (date) => {
   // console.log(date.$d);

    const time_selected =
      (date.$d.getHours() >= 9 ? date.$d.getHours() : "0" + date.$d.getHours()) +
      ":" +
      (date.$d.getMinutes() >= 9 ? date.$d.getMinutes() : "0" + date.$d.getMinutes());
    console.log(time_selected);
    //setDatePickerTime(date);
    setSessionDayOfWeek(DayOfWeek.get(date.$d.getDay()))
    setSessionTime(time_selected);
  };
//   const handleDeleteAdmin = (item) => {
//     const new_admin_list = [];
//     for (var i of adminList) {
//       if (i !== item) {
//         new_admin_list.push(i);
//       }
//     }
//     setAdminList(new_admin_list);
//   };
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
//   const handleDescFocusing = () => {
//     if (props.form_type === "new") {
//       setSessionDescFocused(true);
//     }
//   };
//   const handleLinkFocusing = () => {
//     if (props.form_type === "new") {
//       setSessionLinkFocused(true);
//     }
//   };
  const handleSearchMember = (e) => {
    const query = e.currentTarget.value;
    setMemberSearchQuery(query);
    setFilteredOrgMembers(
      orgMembers.filter((m) =>
        m.name.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };
//   const handleSearchAdmin = (e) => {
//     const query = e.currentTarget.value;
//     setAdminSearchQuery(query);
//     setFilteredAdmins(
//       orgAdmins.filter((m) =>
//         m.admin_name.toLowerCase().startsWith(query.toLowerCase())
//       )
//     );
//   };
//   const handleAddOrgAdmins = (_admin_id) => {
//     let new_admin_list = [];

//     for (var i of adminList) {
//       new_admin_list.push(i);
//     }
//     new_admin_list.push(_admin_id);
//     setAdminList(new_admin_list);
//     console.log(adminList);
//   };
//   const handleRemoveOrgAdmins = (_admin_id) => {
//     if (_admin_id === props.userinfo._admin_id) {
//       console.log("selected session: ", props.selectedSession);
//       const session = props.selectedSession;
//       props.removeSelfFromSession(session);
//     } else {
//       console.log(_admin_id);
//       let new_admin_list = [];
//       for (var i of adminList) {
//         if (i !== _admin_id) {
//           console.log("check");
//           new_admin_list.push(i);
//         }
//       }
//       //new_admin_list.splice(_admin_id, 1);
//       console.log(new_admin_list);
//       setAdminList(new_admin_list);
//       console.log(adminList);
//     }
//   };
  const handleRecurring = (e) => {
    const clicked = e.target.checked;
    setSessionRecurring(clicked);
    if(!sessionReccuring){
setSessionRecurringFreq("How Often?");
    }
  };
  const handleAddingOrgMembers = (_member_id) => {
    const new_participant_list = [];
    for (var i of sessionParticipants) {
      new_participant_list.push(i);
    }
    //orgMembers.find(_member_id=>)

    new_participant_list.push(
      orgMembers.find((m) => m._member_id === _member_id)
    );

    setSessionParticipants(new_participant_list);
    const authtoken = "Bearer " + localStorage.getItem("userToken");
    var config = { headers: { Authorization: authtoken } };
    console.log(props.selectedSession._id);
    if (props.form_type == "edit") {
    }
    const response = axios
      .post(
        "https://api.linkupss.com/addtosession",
        {
          participant_id: _member_id,
          session_id: props.selectedSession._id,
        },
        config
      )
      .then((result) => {
        return result;
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        window.alert(
          "Cannot add participant to session. Please try again later."
        );
      });
    //console.log(_member_id);

    console.log(new_participant_list);
  };
  const handleRemovingOrgMembers = (_member_id) => {
    const new_participant_list = [];
    for (var i of sessionParticipants) {
      new_participant_list.push(i);
    }
    new_participant_list.splice(
      new_participant_list.indexOf(
        orgMembers.find((m) => m._member_id === _member_id)
      ),
      1
    );
    setSessionParticipants(new_participant_list);
    const authtoken = "Bearer " + localStorage.getItem("userToken");
    var config = { headers: { Authorization: authtoken } };

    const response = axios
      .post(
        "https://api.linkupss.com/removefromsession",
        {
          session_id: props.selectedSession._id,
          participant_id: _member_id,
        },
        config
      )
      .then((result) => {
        return result;
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        window.alert(
          "Cannot remove participant from session. Please try again later."
        );
      });
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
    // if (input === "desc") {
    //   if (value.length > 99) {
    //     validated = false;
    //     return validated;
    //   } else if (value === "") {
    //     setSessionDescValid(false);
    //     if (sessionDescFocused) {
    //       setSessionDescFocused(true);
    //       return true;
    //     }
    //   } else {
    //     console.log("desc validated");
    //     setSessionDescValid(true);
    //     return validated;
    //   }
    // }
    // if (input === "link") {
    //   console.log(value);
    //   if (value.length > 11 || !+value) {
    //     // setSessionLinkValid(false);
    //     if (value == "") {
    //       validated = true;
    //       return validated;
    //     }
    //     validated = false;
    //     return validated;
    //   } else if (value === "") {
    //     setSessionLinkValid(false);
    //     if (sessionLinkFocused) {
    //       setSessionLinkFocused(true);
    //       return true;
    //     }
    //   } else {
    //     console.log("link validated");
    //     setSessionLinkValid(true);
    //     return validated;
    //   }
    // }
  };
const handleDateTimePicker = (newDateTime) => {
    console.log(datePickerTime)
    console.log(newDateTime);
    handleSessionTimeDateToString(newDateTime);
    setDatePickerTime(newDateTime);
}
  const discardChanges = (props) => {
    if (props.form_type === "edit") {
      props.hide();
      setSessionName(props.selectedSession.name);
      //setSessionDesc(props.selectedSession.desc);
      setSessionId(props.selectedSession._id);
      setSessionLink(props.selectedSession.meeting_link);
      setSessionRecurring(props.selectedSession.recurring);
      setSessionNameFocused(true);
      //setSessionDescFocused(true);
      //setSessionLinkFocused(true);
      setSessionNameVal(props.selectedSession.name);
      //setSessionDescVal(props.selectedSession.desc);
      //setSessionLinkVal(props.selectedSession.meeting_link);

      console.log(props.selectedSession.participants);
      //check that
    //   if (typeof props.selectedSession.admins !== "undefined") {
    //     setAdminList(props.selectedSession.admins);
    //   } else {
    //     setAdminList([]);
    //   }
    //   if (typeof getAdminInfoByOrg(props.userinfo.org_id) !== "undefined") {
    //     setOrgAdmins(getAdminInfoByOrg(props.userinfo.org_id));
    //     setFilteredAdmins(getAdminInfoByOrg(props.userinfo.org_id));
    //   } else {
    //     setOrgAdmins([]);
    //     setFilteredAdmins([]);
    //   }

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

    //   setDatePickerTime(
    //     new Date(
    //       null,
    //       null,
    //       null,
    //       parseInt(props.selectedSession.session_time.substring(0, 2)),
    //       parseInt(props.selectedSession.session_time.substring(3, 5))
    //     )
    //   );
    //   console.log(
    //     sessionNameVal,
    //     sessionDescVal,
    //     sessionLinkVal,
    //     sessionDayOfWeek
    //   );
      setSessionNameValid(true);
    //   setSessionDescValid(true);
    //   setSessionLinkValid(true);
      setSessionDayOfWeekValid(true);
    }
    if (props.form_type === "new") {
      props.hide();
    }
  };

  const handleSessionMeetingType = (type) => {
    if (type === 1) {
      setSessionMeetingType(1);
    } else if (type == 2) {
      setSessionMeetingType(2);
    } else if (type == 3) {
      setSessionMeetingType(3);
    }
  };
  const fetchParticipants = () => {
    const authtoken = "Bearer " + localStorage.getItem("userToken");
    var config = { headers: { Authorization: authtoken } };

    const repsonse = axios
      .post(
        "https://api.linkupss.com/participantlist",
        {
          admin_id: localStorage.getItem("adminId"),
        },
        config
      )
      .then((result) => {
        console.log(result);
        //const res = await result;
        const members = result.data.participants.map((item) => {
          return {
            _member_id: item.participant_id,
            name: item.name,
            email: null,
            org_enrolled: item.org_id,
          };
        });
        setOrgMembers(members);
        setFilteredOrgMembers(members);
      });
  };
  const saveSession = (props) => {
    console.log("validated...");
    const apiKey = "_aBiWHEhRAuxQiPIjl4dNw";
    const apiSec = "5kQbh8tobS71djafyLbp9LtKgbUVq27UCkcr";
    const meetingTopic = "Test Meeting 1";
    const start_time = new Date("2023-05-04T10:00:00Z").toISOString();
    const duration = 60;
    const timezone = "America/Los_Angeles";
    const url = `https://api.zoom.us/v2/users/me/meetings`;
    const payload = {
      iss: apiKey,
      exp: Math.floor(Date.now() / 1000) + 5000, // expiration time in seconds
    };
    const meetingdetails = {
      topic: "The title of your zoom meeting",
      type: 2,
      start_time: "2019-06-14T10: 21: 57",
      duration: "45",
      timezone: "Europe/Madrid",
      agenda: "test",

      recurrence: { type: 1, repeat_interval: 1 },
      settings: {
        host_video: "true",
        participant_video: "true",
        join_before_host: "False",
        mute_upon_entry: "False",
        watermark: "true",
        audio: "voip",
        auto_recording: "cloud",
      },
    };

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
    const repsonse = axios.post(url);

    const session_saved = {
      _id: sessionId,
      name: sessionName,
      desc: "",
      participants: sessionParticipants,
      admins: [],
      org_id: props.userinfo.org_id,
      session_time: sessionTime,
      day_of_week: sessionDayOfWeek,
      recurring: sessionReccuring,
      meeting_link: "",
    };
    console.log(session_saved)
    //setNewSession(session_saved);
    props.hide();
    props.saveSession({ session_saved });
  };
  useEffect(() => {
    console.log(props.form_type);
    if (props.form_type === "edit") {
      console.log(props.selectedSession);

      setSessionName(props.selectedSession.name);
      //setSessionDesc(props.selectedSession.desc);
      //setSessionLink(props.selectedSession.meeting_link);
      setSessionNameFocused(true);
    //   setSessionDescFocused(true);
    //   setSessionLinkFocused(true);
      setSessionRecurring(props.selectedSession.recurring);
      setSessionNameVal(props.selectedSession.name);
    //   setSessionDescVal(props.selectedSession.desc);
    //   setSessionLinkVal(props.selectedSession.meeting_link);

      console.log(props.selectedSession.participants);
      //check that

    //   if (typeof props.selectedSession.admins !== "undefined") {
    //     setAdminList(props.selectedSession.admins);
    //   } else {
    //     setAdminList([]);
    //   }
    //   if (typeof getAdminInfoByOrg(props.userinfo.org_id) !== "undefined") {
    //     setOrgAdmins(getAdminInfoByOrg(props.userinfo.org_id));
    //     setFilteredAdmins(getAdminInfoByOrg(props.userinfo.org_id));
    //   } else {
    //     setOrgAdmins([]);
    //     setFilteredAdmins([]);
    //   }

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

    //   setDatePickerTime(
    //     new Date(
    //       null,
    //       null,
    //       null,
    //       parseInt(props.selectedSession.session_time.substring(0, 2)),
    //       parseInt(props.selectedSession.session_time.substring(3, 5))
    //     )
    //   );
    //   console.log(
    //     sessionNameVal,
    //     sessionDescVal,
    //     sessionLinkVal,
    //     sessionDayOfWeek
    //   );
      setSessionNameValid(true);
    //   setSessionDescValid(true);
    //   setSessionLinkValid(true);
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
    //   setSessionDesc("");
    //   setSessionLink("");
      setSessionParticipants([]);
      setSessionRecurring(false);

    //   let new_admins = [];

    //   new_admins.push(props.userinfo._admin_id);
    //   if (typeof getAdminInfoByOrg(props.userinfo.org_id) !== "undefined") {
    //     setOrgAdmins(getAdminInfoByOrg(props.userinfo.org_id));
    //     setFilteredAdmins(getAdminInfoByOrg(props.userinfo.org_id));
    //     setAdminList(new_admins);
    //   } else {
    //     setOrgAdmins([]);
    //     setFilteredAdmins([]);
    //   }

      if (typeof getOrgMembersByOrg(props.userinfo.org_id) !== "undefined") {
        fetchParticipants();
      } else {
        setOrgMembers([]);
        setFilteredOrgMembers([]);
      }

      setSessionDayOfWeek("Select day of week for session");
      setSessionTime("00:00");
      //setDatePickerTime(new Date(null, null, null, 0, 0));
      setSessionNameValid(false);
    //   setSessionDescValid(false);
    //   setSessionLinkValid(false);
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

        <Dropdown className="meeting-type-dropdown">
          <Dropdown.Toggle variant="" id="dropdown-basic" className="">
            Meeting type
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Zoom</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Micorsoft Teams</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Google Meets</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <hr className="rounded" />
        {/*Participant card */}
        <p style={{ fontSize: "18px" }}>Participants</p>
        <Card>
          {props.form_type === "new" ? (
            <Card.Header>
              <span style={{ paddingRight: "20px" }}>
                {props.form_type === "new" && (
                  <span>
                    Add your participants on your dashboard by editing your
                    sessions !
                  </span>
                )}
                {props.form_type === "edit" && !orgMembers.length && (
                  <span>
                    There are no participants enrolled in this organisation. Ask
                    your members to register before picking participants !
                  </span>
                )}
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
              !orgMembers.length ||
              orgMembers.length <= 2 ||
              props.form_type === "new"
                ? "form-listgroup-card-none"
                : "form-listgroup-card"
            }
          >
            {!orgMembers.length || props.form_type === "new" ? (
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
        <DateTimePicker
          label="Choose the time for your meeting"
           className = "date-time-picker-style"
        value = {datePickerTime}
        onChange = {handleDateTimePicker}
        />
        {/* <DatePicker
          selected={datePickerTime}
          onChange={handleSessionTimeDateToString}
          className="date-picker"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        /> */}

        {/* <hr className="rounded" /> */}
        {/* <p style={{ fontSize: "18px" }}>Session Scheduled Day of Week</p>
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
        </DropdownButton> */}

        <hr className="rounded" />
        <p style={{ fontSize: "18px" }}>Recurring event ?</p>
        <div className="d-flex justify-content-start align-items-center">
          <Toggle
            defaultChecked={sessionReccuring}
            onChange={handleRecurring}
          />
        </div>
        {sessionReccuring &&
                    <DropdownButton
                    className = "mt-3"
                    variant="outline-primary"
                    title={sessionRecurringFreq}
                    id="input-group-dropdown-1"
                    onSelect={handleSessionRecurringFreq}
                  >
                    <Dropdown.Item eventKey="1">Every Day at this time</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Every Week at this time</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Every Bi-Weekly at this time</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Every Month at this time</Dropdown.Item>
                    <Dropdown.Item eventKey="5">Every Bi-Monthly at this time</Dropdown.Item>
                  </DropdownButton>
          }
          <hr className="rounded" />
          <p onClick = {()=>{setSessionAdvancedSettings(!sessionAdvancedSettings)}} style={{ fontSize: "13px", textAlign: "right",color:"rgb(49,108,244)",cursor:"pointer" }}>Advanced Meeting Settings</p>
          {
        sessionAdvancedSettings &&
        <p style={{ fontSize: "18px" }}>Recurring event ?</p>

          }
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => discardChanges(props)}
        >
          Close
        </button>
        <button className="btn btn-primary" onClick={() => saveSession(props)}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionFormNew;
