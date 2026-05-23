import Iconify from './iconify';

const icon = (name: string) => <Iconify icon={`${name}`} />;

export const inconString = {
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
};

export const ICONS = {
  openai: icon('logos:openai-icon'),
  //
  email: icon(inconString.email),
  password: icon('solar:lock-outline'),
  eye: icon('solar:eye-outline'),
  eyeOff: icon('solar:eye-off-outline'),
  user: icon(inconString.user),
  dashboard: icon(inconString.dashboard),
  users: icon(inconString.users),
  gym: icon(inconString.gym),
  account: icon(inconString.account),
  arrowRight: icon(inconString.arrowRight),
  city: icon(inconString.city),
  building: icon(inconString.building),
};

