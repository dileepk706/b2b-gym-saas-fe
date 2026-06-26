import Iconify from './iconify';

const icon = (name: string) => <Iconify icon={`${name}`} />;

export const icons = {
  email: 'fluent:mail-20-regular',
  eye: 'solar:eye-outline',
  eyeOff: 'solar:eye-off-outline',
  user: 'solar:user-bold-duotone',
  dashboard: 'solar:widget-3-outline',
  users: 'solar:users-group-rounded-outline',
  gym: 'solar:dumbbell-outline',
  account: 'solar:user-circle-outline',
  arrowRight: 'solar:arrow-right-outline',
  city: 'solar:map-point-outline',
  building: 'solar:buildings-outline',
  thunder: 'solar:bolt-bold',
  employee: 'clarity:employee-line',
  search: 'si:search-line',
  delete: 'solar:trash-bin-trash-bold',
  edit: 'solar:pen-bold',
};

export const IconsElement = {
  openai: icon('logos:openai-icon'),
  //
  email: icon(icons.email),
  password: icon('solar:lock-outline'),
  eye: icon('solar:eye-outline'),
  eyeOff: icon('solar:eye-off-outline'),
  user: icon(icons.user),
  dashboard: icon(icons.dashboard),
  users: icon(icons.users),
  gym: icon(icons.gym),
  account: icon(icons.account),
  arrowRight: icon(icons.arrowRight),
  city: icon(icons.city),
  building: icon(icons.building),
  thunder: icon(icons.thunder),
  employee: icon(icons.employee),
  search: icon(icons.search),
};
