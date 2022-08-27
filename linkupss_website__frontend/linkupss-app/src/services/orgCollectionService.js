import { getOrgMembers } from "./orgMembersService";

export const org_info = [
{
_org_id:"cvsb18273gdiasdbasduqwe",
org_name:"SLEC",
admins:[]
}
]

export function getAllOrgInfo() {//probably wont be used
    return org_info;
  }
export function getOrgInfo(id) {
    return org_info.find((m) => m._org_id === id);
  }
  