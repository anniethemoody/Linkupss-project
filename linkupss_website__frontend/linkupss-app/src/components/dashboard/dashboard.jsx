import React, { Component, useState } from "react";
import SideBar from "../sidebar";
import FloatingActionButton from "../floatingActionButton";
import SessionGrid from "./sessionGrid";
import { getSession, getSessions } from "../../services/sessionService";
import { getOrgInfo } from "../../services/orgCollectionService";
import SessionForm from "./sessionForm";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import InfoBar from "./infobar";
import LeftSideBar from "./leftSideBar";
import DeletePopUp from "./confirmDeletePopUp";
import { getAdminInfo } from "../../services/adminService";
import { useEffect } from "react";
import _ from 'lodash';
const Dashboard = () => {

  
    const [userInfo,setUserInfo] = useState(getAdminInfo("96383888"))
    const [orgId,setOrgId] = useState("cvsb18273gdiasdbasduqwe");
    const [orgInfo,setOrgInfo] = useState(getOrgInfo("cvsb18273gdiasdbasduqwe"));
    const [showOffCanvas,setOffCanvasState] = useState(false);
    const [offCanvasContent,setOffCanvasContent] = useState("");

  const [sessions, setSessions] = useState(getSessions(orgId,userInfo._admin_id));
  const [filteredSessions,setFilteredSessions] = useState(sessions);

  const [sessionFormType, setSessionFormType] = useState("view");
  const [sessionFormState, setSessionFormState] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  const [confirmSessionDeleteState,setConfirmSessionDeleteState] = useState(false);
 // const [deleteSession,setDeleteSession] = useState({});

useEffect(() => {
    setFilteredSessions(sessions);
},[sessions,selectedSession])
//HANDLERS
  const handleNewSessionForm = () => {
    setSessionFormType("new");
    setSelectedSession({});
    setSessionFormState(true);
  };
  const handleDeleteSession = ( session ) => {
    console.log(session);
    const delete_id = session.id;
    //const { _id } = session;
    const new_sessions = sessions.filter((m) => m._id !== session._id);
    setSessions(new_sessions);
    if(sessionFormState === true){
        setSessionFormState(false);
    }
    setConfirmSessionDeleteState(false);
  };
  const handleConfirmDeleteSession = ({session}) => {
    //console.log(selectedSession);
    //setDeleteSession(session);
    if(!sessionFormState){
        setSelectedSession(session);
    }
    if(sessionFormState){
        setSessionFormState(false);
    }
    
   
    //console.log({deleteSession});
    setConfirmSessionDeleteState(true);
    console.log(session)
    
  }

  const handleSessionEditClicked = ({ session }) => {
    //console.log(session);
    // const {_id,name,desc,participants,admins,org_id,session_time,day_of_week,meeting_link} = session;
    setSelectedSession(session);
    console.log({selectedSession});
    setSessionFormType("edit");
    setSessionFormState(true);
    console.log(selectedSession);
  };
  const handleSavingSession = ({ session_saved }) => {
    const session_new = { ...session_saved };

    const new_sessions = [];
    for (var i of sessions) {
      new_sessions.push(i);
    }
    if (sessionFormType === "new") {
      new_sessions.push(session_new);
      setSessions(new_sessions);
      setFilteredSessions(new_sessions);
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
    if(query !==""){
    setFilteredSessions(sessions.filter(m=>m.name.toLowerCase().startsWith(query.toLowerCase())))
    }
    else{
        setFilteredSessions(sessions);
    }
};
const handleOffCanvas = (content) => {
    setOffCanvasState(true);
    setOffCanvasContent(content);
}
const handleFilteringSessionsButton = (filter) => {
    if(filter === "name"){
        const new_sessions = [];
        for (var i of sessions){
            new_sessions.push(i);
        }
        new_sessions.sort((a, b) => a.name.localeCompare(b.name));
        setFilteredSessions(new_sessions);
    }
    else if (filter === "time"){
        const new_sessions = [];
        const days ={"Monday":1,"Tuesday":2,"Wednesday":3,"Thursday":4,"Friday":5,"Saturday":6,"Sunday":7}
        for (var i of sessions){
            new_sessions.push(i);
        }
        new_sessions.sort(function sortByTime(a, b){
            let time1 = parseInt(a.session_time.substring(3,5));
            let time2 = parseInt(b.session_time.substring(3,5));
            return time1-time2;
        })
        new_sessions.sort(function sortByTime(a, b){
            let time1 = parseInt(a.session_time.substring(0,2));
            let time2 = parseInt(b.session_time.substring(0,2));
            return time1-time2;
        })
        new_sessions.sort(function sortByDay(a, b) {
            let day1 = a.day_of_week;
            let day2 = b.day_of_week;
            return days[day1] - days[day2];
          })
              console.log(new_sessions)
        setFilteredSessions(new_sessions);
    }
    else if(filter === "none"){
        setFilteredSessions(sessions);
    }
}
    
  //RENDERER
  return (
    <div className="below-nav row">
      <LeftSideBar show={showOffCanvas} hide = {()=>setOffCanvasState(false)} content = {offCanvasContent} userinfo = {userInfo} sessions = {sessions} filterSessionByButton={handleFilteringSessionsButton}/>
      <div className="col main-content-box">
        <InfoBar orgInfo={orgInfo} handleSearchSession={handleSearchSession} openOffcanvas={handleOffCanvas} />
        <div className={!sessions.length ? "content-box-none":"content-box row"}>
          <FloatingActionButton createNewSession={handleNewSessionForm} />
          <DeletePopUp show = {confirmSessionDeleteState} hide = {()=>setConfirmSessionDeleteState(false)} selectedSession = {selectedSession} deleteSession = {handleDeleteSession}/>
          <SessionForm
            show={sessionFormState}
            hide={() => setSessionFormState(false)}
            selectedSession={selectedSession}
            form_type={sessionFormType}
            saveSession={handleSavingSession}
            removeSelfFromSession = {handleConfirmDeleteSession}
            userinfo = {userInfo}
          />
          {!sessions.length ? (
            <span className="no-sessions-text">
              <span style={{fontSize:"30px",color:""}}>There are no sessions set up for your organisation <SentimentDissatisfiedIcon className="sad-icon"/> <br /> Click
              Create Session to start connecting with your members !
              </span>
            </span>
          ) : (
            <SessionGrid
              sessions={filteredSessions}
              sessionEditClicked={handleSessionEditClicked}
              confirmDeleteSession = {handleConfirmDeleteSession}
              numOfSessions = {filteredSessions.length}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
