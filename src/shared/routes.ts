const memberRoot = `/members`;
const staffRoot = `/staffs`;
const gymRoot = `gym`;
const accountRoot = `/account`;

export const pathKeys = {
  root: '/',
  login: '/login/',
  register: '/register/',
  page404: '/404/',
  onboarding: '/onboarding/',
  billing: '/billing/',
  // dashboard
  dashboard(root?: boolean) {
    return {
      root: `/`,
    };
  },

  gym(root?: boolean) {
    return {
      root: gymRoot,
      schedule: root ? `${gymRoot}/schedule` : `schedule`,
      staffs: root ? `${gymRoot}/staffs` : `staffs`,
      byStaffId: (id: string) => (root ? `${gymRoot}/staffs/${id}` : `staffs/${id}`),
    };
  },

  // members
  members(root?: boolean) {
    return {
      root: memberRoot,
      checkIn: root ? `${memberRoot}/check-in/` : `check-in/`,
      byMemberId: (id: string) => (root ? `${memberRoot}/${id}/` : `${id}/`),
    };
  },

  // staffs
  staff: {
    root: '/staffs',
    RByStaffId: (id: string) => (id ? `staffs/${id}/` : `staffs/:id/`),
    RUpdate: (id?: string) => (id ? `staffs/update/${id}/` : `staffs/update/:id/`),
    byStaffId: (id: string) => (id ? `${id}/` : `:id/`),
    update: (id?: string) => (id ? `update/${id}/` : `update/:id/`),
    RRoles: '/staffs/roles',
    RPayrolls: '/staffs/payrolls',
    roles: '/roles',
  },

  // account
  account(root?: boolean) {
    return {
      root: accountRoot,
      setting: root ? `${accountRoot}/setting/` : `setting/`,
      plan: root ? `${accountRoot}/plan/` : `plan/`,
    };
  },

  // auth
  auth: {
    memberLogin: '/:gymId/member/login/',
    staffLogin: '/:gymId/staff/login/',
    userLogin: '/login/',
    userRegister: '/register/',
  },
} as const;
