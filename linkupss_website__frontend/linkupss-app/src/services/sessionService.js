import { v4 as uuidv4 } from 'uuid';

export const sessions = [
    //desc max character count:88 chars
  {
    _id: "akjshfbboqihroia",
    name: "Yoga",
    desc:"Yoga session held by Heidi, will be doing a series of physical exercise",
    participants: [],
    admins: [],
    org_id: "cvsb18273gdiasdbasduqwe",
    session_time: "15:00",
    day_of_week: "Saturday",
    meeting_link: "",
  },
  {
    _id: uuidv4(),
    name: "Bingo",
    desc:"Who doesn't like playing bingo, win a prize with us tonight!",
    participants: [],
    admins: [],
    org_id: "cvsb18273gdiasdbasduqwe",
    session_time: "08:30",
    day_of_week: "Friday",
    meeting_link: "",
  },
  {
    _id: uuidv4(),
    name: "Arts & Crafts",
    desc:"Build your favourite necklace for your loved ones",
    participants: [],
    admins: [],
    org_id: "",
    session_time: "12:00",
    day_of_week: "Thursday",
    meeting_link: "",
  }
];

export function getSessions() {
  return sessions;
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