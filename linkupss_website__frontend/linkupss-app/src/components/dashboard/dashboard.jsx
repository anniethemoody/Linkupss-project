import React, { Component ,useState} from 'react';
import SideBar from '../sidebar';
import FloatingActionButton from '../floatingActionButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SessionGrid from './sessionGrid';
import { getSession, getSessions } from '../../services/sessionService';
import SessionForm from './sessionForm';
const Dashboard = () =>{
    const [sessions,setSessions] = useState(getSessions());
    const [sessionFormType,setSessionFormType] = useState("view");
    const [sessionFormState,setSessionFormState] = useState(false);
    const [selectedSession,setSelectedSession] = useState({});
    const handleNewSessionForm = () =>{
        setSessionFormType("new");
        setSelectedSession({});
        setSessionFormState(true);
    }
    const handleDeleteSession = ({session}) => {
        const {_id} = session;
        const new_sessions = sessions.filter(m => m._id !== _id)
        setSessions(new_sessions);   
    }
    const handleSessionEditClicked = ({session}) => {
        //console.log(session);
       // const {_id,name,desc,participants,admins,org_id,session_time,day_of_week,meeting_link} = session;
        setSelectedSession(session);
       // console.log(selectedSession);
        setSessionFormType("edit");
        setSessionFormState(true);
    }
    const handleSavingSession = ({session_saved}) =>{
        const session_new = {...session_saved};
        const new_sessions = [];
        for (var i of sessions) {
            new_sessions.push(i);
        }
        if(sessionFormType ==="new" ){
            new_sessions.push(session_new);
            setSessions(new_sessions);
        } 
        if(sessionFormType ==="edit"){
            const index = sessions.indexOf(getSession(session_new._id));
            new_sessions[index] = session_new;
            setSessions(new_sessions);

        }

    }
        return (
            <div className="below-nav row">
            <SideBar className="onTop col"/>
            <div className="col main-content-box">
            <div className="info-bar row" style={{display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                <span className="col-2">Organisation: SLEC</span>
                <span className="col-6">Hello Ray Gilbert Welcome Back !</span>
                <span className="col"><FilterAltIcon/></span>
                <span className="col"><FilterAltIcon/></span>
                <span className="col"><FilterAltIcon/></span>
                <span className="col"><FilterAltIcon/></span>
               

            
            </div>
            <div className= "content-box row">
            <FloatingActionButton createNewSession = {handleNewSessionForm}/>
            <SessionForm show = {sessionFormState} hide = {()=>(setSessionFormState(false))} selectedSession = {selectedSession} form_type = {sessionFormType} saveSession={handleSavingSession}/>
            <SessionGrid sessions={sessions} sessionEditClicked={handleSessionEditClicked}/>



            </div>
            </div>
            </div>
        );
    
}
 
export default Dashboard;