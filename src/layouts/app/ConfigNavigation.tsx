import { useMemo } from 'react';
import { useLocales } from '@locales';
import { pathKeys } from 'shared/routes';
import { IconsElement } from 'shared/ui/iconify/icons';

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: '',
        items: [
          {
            title: t('dashboard'),
            path: pathKeys.dashboard().root,
            icon: IconsElement.dashboard,
          },
          {
            title: t('members'),
            path: pathKeys.members(true).root,
            icon: IconsElement.users,
          },
          {
            title: t('staffs'),
            path: pathKeys.staff.root,
            icon: IconsElement.employee,
          },
          {
            title: t('gym'),
            path: pathKeys.gym(true).schedule,
            icon: IconsElement.gym,
          },
          {
            title: t('account'),
            path: pathKeys.account(true).setting,
            icon: IconsElement.account,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
