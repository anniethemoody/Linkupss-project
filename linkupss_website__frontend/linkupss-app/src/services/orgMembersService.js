export const org_members = [
  {
    _member_id: "kjabsdjiubfe129837",
    name: "Ambrose",
    email: "lingambrose@gmail.com",
    org_enrolled: "cvsb18273gdiasdbasduqwe",
  },
  {
    _member_id: "kjabsdjiubfe129838",
    name: "Sahil",
    email: "sahilamin@gmail.com",
    org_enrolled: "cvsb18273gdiasdbasduqwe",
  },
  // {
  //   _member_id: "kjabsdjiubfe129839",
  //   name: "David",
  //   email: "sahilamin@gmail.com",
  //   org_enrolled: "cvsb18273gdiasdbasduqwe",
  // },
  // {
  //   _member_id: "kjabsdjiubfe129840",
  //   name: "Renee",
  //   email: "reneeslen@gmail.com",
  //   org_enrolled: "cvsb18273gdiasdbasduqwe",
  // },
  // {
  //   _member_id: "kjabsdjiubfe129841",
  //   name: "Annie",
  //   email: "annieli@gmail.com",
  //   org_enrolled: "cvsb18273gdiasdbasduqwe",
  // },
  // {
  //   _member_id: "kjabsdjiubfe129842",
  //   name: "Andrew",
  //   email: "andrewabdelmalak@gmail.com",
  //   org_enrolled: "cvsb18273gdiasdbasduqwe",
  // },
  // {
  //   _member_id: "kjabsdjiubfe129843",
  //   name: "Arman",
  //   email: "arman@gmail.com",
  //   org_enrolled: "cvsb18273gdiasdbasduqwe",
  // },
  // {
  //   _member_id: "kjabsdjiubfe129844",
  //   name: "Amy",
  //   email: "amy@gmail.com",
  //   org_enrolled: "cvsb18273gdiasdbasduqwe",
  // },
];

export function getOrgMembers() {
  return org_members;
}

export function getOrgMember(id) {
  return org_members.find((m) => m._member_id === id);
}

export function getOrgMembersByOrg(id) {
  return org_members.filter((m) => m.org_enrolled === id);
}