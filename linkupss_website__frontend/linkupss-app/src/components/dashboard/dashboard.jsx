import React, { Component, useState, useRef, useCallback } from "react";
import useAsyncEffect from "use-async-effect";
import SideBar from "../sidebar";
import axios from "axios";
import FloatingActionButton from "../floatingActionButton";
import SessionGrid from "./sessionGrid";
import SessionLaunchedPopUp from "./sessionLaunchedPopUp";

import {
  getSession,
  getSessions,
  getAllSessions,
} from "../../services/sessionService";
import { getOrgInfo } from "../../services/orgCollectionService";
import SessionForm from "./sessionForm";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import InfoBar from "./infobar";
import LeftSideBar from "./leftSideBar";
import DeletePopUp from "./confirmDeletePopUp";
import { getAdminInfo } from "../../services/adminService";
import { useEffect } from "react";
import _, { set } from "lodash";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import httpService from "../../services/httpService";
import getCurrentUser from "../../services/authService";
import jwtDecode from "jwt-decode";
import ConfirmLogOutPopUp from "./confirmLogOutPopUp";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({
    _admin_id: "",
    admin_name: "",
    org_id: "",
    role: "admin",
  });
  const [orgId, setOrgId] = useState(0);
  const [adminName, setAdminName] = useState("");
  const [orgInfo, setOrgInfo] = useState(getOrgInfo("cvsb18273gdiasdbasduqwe"));
  const [showOffCanvas, setOffCanvasState] = useState(false);
  const [offCanvasContent, setOffCanvasContent] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userSessions, setUserSessions] = useState();
  const [sessions, setSessions] = useState(
    getSessions(orgId, userInfo._admin_id)
  );
  const mounted = useRef(0);
  const [showNotification, setShowNotification] = useState(true);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [needData, setNeedData] = useState(false);
  const [sessionFormType, setSessionFormType] = useState("view");
  const [sessionFormState, setSessionFormState] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  const [confirmSessionDeleteState, setConfirmSessionDeleteState] =
  useState(false);
  const [confirmLogOutState,setConfirmLogOutState] = useState(false);
  const [launchSessionState,setLaunchSessionState] = useState(false);
  const [deleteSession, setDeleteSession] = useState({});
  function useStateWithCallBack(initlaValue, callBack) {
    const [state, setState] = useState(initlaValue);
    useEffect(() => callBack(state), [state]);
    return [state, setState];
  }
  //const [response,setResponse] = useStateWithCallBack({},callBack);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log(token);
    setUserToken(token);
    console.log(userToken);
    //localStorage.setItem("needData",1);
      console.log(needData)
  }, [userToken]);

     const  fetchData = () => {
      const authtoken = "Bearer " + localStorage.getItem("userToken");
      console.log(authtoken);
      setUserToken(localStorage.getItem("userToken"));
      var config = { headers: { Authorization: authtoken } };
      console.log(localStorage.getItem("adminId"));

      const response =  axios.post(
        "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/fetchinfo",
        {
          admin_id: localStorage.getItem("adminId"),
        },
        config
      ).then(
        result=>{


         console.log(result)
          var adminUsername = "";
          var orgnID = "";
          var sessions_ew = {};
          adminUsername = result.data.orgdata[0]?.name;
          orgnID = result.data.orgdata[0]?.org_id;
          sessions_ew = result.data.sessions;
          sessions_ew = getAllSessions(sessions_ew);

          console.log(sessions_ew)
          setOrgId(orgnID);
          setAdminName(adminUsername);
          setUserInfo({
            _admin_id: localStorage.getItem("adminId"),
            admin_name: adminUsername,
            org_id: orgnID,
            role: "admin",
          })
          setSessions(sessions_ew);
         setFilteredSessions(sessions_ew);
          //response.current = reuslt;
        }
      ).catch(
        error=>{
          console.log(error)
          window.alert("Oops it seems like you're disconnected or not logged in :(\n Please try logging in or try again later");
          window.location.href = "/adminloginregister";
        }
      )


    }
      
    useEffect(() => {

      fetchData();
      console.log("fetching")


    },[]);


  const handleNewSessionForm = () => {
    setSessionFormType("new");
    setSelectedSession({});
    setSessionFormState(true);
  };
  const handleDeleteSession = async (session) => {
    console.log(session);
    const delete_id = session.id;
    //const { _id } = session;
    const authtoken = "Bearer " + localStorage.getItem("userToken");
    var config = { headers: { Authorization: authtoken } };

    const new_sessions = sessions.filter((m) => m._id !== session._id);
    setSessions(new_sessions);
    setFilteredSessions(new_sessions);
    try{
      const response = await axios.post("https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/deletesession",
      {
        session_id: session._id
      },
      config
      )
      const result = await response;
      console.log(result);
    }
    catch(err){
      window.alert(alert);
    }
    if (sessionFormState === true) {
      setSessionFormState(false);
    }
    setConfirmSessionDeleteState(false);
  };
  const handleConfirmDeleteSession = ({ session }) => {
    //console.log(selectedSession);
    //setDeleteSession(session);
    if (!sessionFormState) {
      setSelectedSession(session);
    }
    if (sessionFormState) {
      setSessionFormState(false);
    }

    //console.log({deleteSession});
    setConfirmSessionDeleteState(true);
    console.log(session);
  };

  const handleSessionEditClicked = ({ session }) => {
    //console.log(session);
    // const {_id,name,desc,participants,admins,org_id,session_time,day_of_week,meeting_link} = session;
    setSelectedSession(session);
    console.log({ selectedSession });
    setSessionFormType("edit");
    setSessionFormState(true);
    console.log(selectedSession);
  };
  const handleSavingSession = async ({ session_saved }) => {
    const session_new = { ...session_saved };

    const new_sessions = [];
    for (var i of sessions) {
      new_sessions.push(i);
    }
    if (sessionFormType === "new") {
      new_sessions.push(session_new);
      console.log(session_saved);
      const authtoken = "Bearer " + localStorage.getItem("userToken");

      var config = { headers: { Authorization: authtoken } };
      const recurring = session_new.recurring ? 1 : 0;

      console.log(session_new._id);
      console.log(session_new.desc);
      console.log(session_new.meeting_link);
      console.log(session_new.session_time);
      console.log(session_new.recurring);
      console.log(session_new.day_of_week);
      console.log(orgId);
      console.log(recurring);
      try {
        var data = {
          name: session_new.name,
          org_id: orgId,
          tag: session_new.desc,
          code: session_new.meeting_link,
          start_time: session_new.session_time,
          recurring: recurring,
          password: session_new.meeting_link,
          day_of_week: session_new.day_of_week,
        };
        const response = await axios.post(
          "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/createsession",
          data,
          config
        );

        console.log(response);
        console.log(userSessions);
      } catch (err) {
        console.log("cannot post session");
      }
      // make api call to /createSession

      setSessions(new_sessions);
      setFilteredSessions(new_sessions);
      fetchData();
    }
    if (sessionFormType === "edit") {
      const index = new_sessions.indexOf(
        new_sessions.find((m) => m._id === session_saved._id)
      );
      console.log(index);
      console.log(session_new);
      const returned = Object.assign(new_sessions[index], session_saved);

      console.log(new_sessions[index]);
      setFilteredSessions(new_sessions);
      console.log(sessions);
    }
  };
  const handleSearchSession = (query) => {
    if (query !== "") {
      setFilteredSessions(
        sessions.filter((m) =>
          m.name.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else {
      setFilteredSessions(sessions);
    }
  };
  const handleOffCanvas = (content) => {
    setOffCanvasState(true);
    setOffCanvasContent(content);
  };
  const handleFilteringSessionsButton = (filter) => {
    if (filter === "name") {
      const new_sessions = [];
      for (var i of sessions) {
        new_sessions.push(i);
      }
      new_sessions.sort((a, b) => a.name.localeCompare(b.name));
      setFilteredSessions(new_sessions);
    } else if (filter === "time") {
      const new_sessions = [];
      const days = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7,
      };
      for (var i of sessions) {
        new_sessions.push(i);
      }
      new_sessions.sort(function sortByTime(a, b) {
        let time1 = parseInt(a.session_time.substring(3, 5));
        let time2 = parseInt(b.session_time.substring(3, 5));
        return time1 - time2;
      });
      new_sessions.sort(function sortByTime(a, b) {
        let time1 = parseInt(a.session_time.substring(0, 2));
        let time2 = parseInt(b.session_time.substring(0, 2));
        return time1 - time2;
      });
      new_sessions.sort(function sortByDay(a, b) {
        let day1 = a.day_of_week;
        let day2 = b.day_of_week;
        return days[day1] - days[day2];
      });
      console.log(new_sessions);
      setFilteredSessions(new_sessions);
    } else if (filter === "none") {
      setFilteredSessions(sessions);
    }
  };
  const handleLaunchingSession =()=>{
    setLaunchSessionState(true);
  }
  //RENDERER
  return (
    <div className="below-nav row">
      <ToastContainer>
        <Toast
          onClose={() => setShowNotification(false)}
          show={showNotification}
          delay={3000}
          autohide
          bg = "info"
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Greetings, {adminName} !</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Welcome back to your dashboard. Get started with managing your online sessions!</Toast.Body>
        </Toast>
      </ToastContainer>

      <LeftSideBar
        show={showOffCanvas}
        hide={() => setOffCanvasState(false)}
        content={offCanvasContent}
        userinfo={userInfo}
        sessions={sessions}
        filterSessionByButton={handleFilteringSessionsButton}
      />
      <div className="col main-content-box">
        <InfoBar
          orgInfo={orgInfo}
          handleSearchSession={handleSearchSession}
          logout = {()=>setConfirmLogOutState(true)}
          openOffcanvas={handleOffCanvas}
        />
        <div
          className={!sessions.length ? "content-box-none" : "content-box row"}
        >
          <FloatingActionButton createNewSession={handleNewSessionForm} />
          <DeletePopUp
            show={confirmSessionDeleteState}
            hide={() => setConfirmSessionDeleteState(false)}
            selectedSession={selectedSession}
            deleteSession={handleDeleteSession}
          />
          <SessionLaunchedPopUp
            show={launchSessionState}
            hide={() => setLaunchSessionState(false)}
            selectedSession={selectedSession}
          />
          <ConfirmLogOutPopUp
          show={confirmLogOutState}
          hide={() => setConfirmLogOutState(false)}
          />
          <SessionForm
            show={sessionFormState}
            hide={() => setSessionFormState(false)}
            selectedSession={selectedSession}
            form_type={sessionFormType}
            saveSession={handleSavingSession}
            removeSelfFromSession={handleConfirmDeleteSession}
            userinfo={userInfo}
          />

          { !sessions.length ? (

              
              
              <span className="no-sessions-text">
                <span style={{ fontSize: "30px", color: "" }}>
                  
                  There are no sessions set up for your organisation{" "}
                  <SentimentDissatisfiedIcon className="sad-icon" /> <br /> Click
                  Create Session to start connecting with your members !
                </span>
              </span>

            
          ) : (
            <SessionGrid
              sessions={filteredSessions}
              sessionEditClicked={handleSessionEditClicked}
              confirmDeleteSession={handleConfirmDeleteSession}
              launchSession = {handleLaunchingSession}
              numOfSessions={filteredSessions.length}
            />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
