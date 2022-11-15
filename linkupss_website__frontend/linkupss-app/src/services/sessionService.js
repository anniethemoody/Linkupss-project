import { v4 as uuidv4 } from 'uuid';
import { getAdminInfo } from './adminService';

export const sessions = [
    //desc max character count:88 chars
  // {
  //   _id: "akjshfbboqihroia",
  //   name: "Yoga",
  //   desc:"Yoga session held by Heidi, will be doing a series of physical exercise",
  //   participants: ["kjabsdjiubfe129837"],
  //   admins: ["96383888"],
  //   org_id: "cvsb18273gdiasdbasduqwe",
  //   session_time: "15:00",
  //   day_of_week: "Saturday",
  //   meeting_link: "yogalink",
  //   recurring: "false",

  //  },
  // {
  //   _id: uuidv4(),
  //   name: "Bingo",
  //   desc:"Who doesn't like playing bingo, win a prize with us tonight!",
  //   participants: [],
  //   admins: ["96383888"],
  //   org_id: "cvsb18273gdiasdbasduqwe",
  //   session_time: "08:30",
  //   day_of_week: "Friday",
  //   meeting_link: "bingolink",
  //   recurring: "false",
  // },
  //  {
  //   _id: uuidv4(),
  //   name: "Arts & Crafts",
  //   desc:"Build your favourite necklace for your loved ones",
  //   participants: [],
  //   admins: ["96383888"],
  //   org_id: "cvsb18273gdiasdbasduqwe",
  //   session_time: "12:00",
  //   day_of_week: "Thursday",
  //   meeting_link: "artsandcraftslink",
  //   recurring: "false",
  // },
  // {
  //   _id: uuidv4(),
  //   name: "Yushi Making",
  //   desc:"Make your own sushi",
  //   participants: [],
  //   admins: ["96383888"],
  //   org_id: "cvsb18273gdiasdbasduqwe",
  //   session_time: "15:00",
  //   day_of_week: "Friday",
  //   meeting_link: "yushilink",
  //   recurring: "false",
  // },
  // {
  //   _id: uuidv4(),
  //   name: "French class",
  //   desc:"Learn how to speak in french",
  //   participants: [],
  //   admins: ["96383888"],
  //   org_id: "cvsb18273gdiasdbasduqwe",
  //   session_time: "10:00",
  //   day_of_week: "Friday",
  //   meeting_link: "frenchclasslink",
  //   recurring: "false",
  // }

  


];

export function getSessions(id,admin_id) {
  return sessions.filter((m) => m.org_id === id).filter((m)=>m.admins.includes(admin_id));;
}

export function getSession(id) {
  return sessions.find((m) => m._id === id);
}
export function getSessionParticipants(id){
    if (id===0 || typeof (sessions.find((m) => m._id === id).participants) === "undefined"){
        return;
    }
    return sessions.find((m) => m._id === id).participants;
}
export function getAllSessions(retrieved_sessions){
  const new_sessions = retrieved_sessions.map((item)=>{
       return { 
    _id: item.session_id,
    name: item.name,
    desc:item.tag,
    participants: [],
    admins: String(localStorage.getItem("adminId")).split("").map((item)=>{
      return Number(item)
    }),
    org_id: JSON.stringify(item.org_id),
    session_time: item.start_time,
    day_of_week: item.day_of_week,
    meeting_link: JSON.stringify(item.code),
    recurring: item.recurring==0?false:true,}
    }

  )
  return new_sessions;

}