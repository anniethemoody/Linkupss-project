import { v4 as uuidv4 } from 'uuid';
export const admins_info = [
    {
        _admin_id:"96383888",
        admin_name:"Ambrose",
        org_id: "cvsb18273gdiasdbasduqwe",
        role:"admin",

    },
    {
        _admin_id:"93287163",
        admin_name:"Jayson",
        org_id: "cvsb18273gdiasdbasduqwe",
        role:"admin",

    },
    {
        _admin_id:"91211113",
        admin_name:"Carly",
        org_id: "cvsb18273gdiasdbasduqwe",
        role:"admin",

    },

]
export function getAdminInfo(id) {
    return admins_info.find((m) => m._admin_id === id);
  }

  export function getAdminInfoByOrg(id) {
    return admins_info.filter((m) => m.org_id === id);
  }