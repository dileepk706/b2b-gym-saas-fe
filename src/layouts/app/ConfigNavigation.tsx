import { useMemo } from 'react';
import { useLocales } from '@locales';
import { pathKeys } from 'shared/routes';
import { ICONS } from 'shared/ui/iconify/icons';

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
            icon: ICONS.dashboard,
          },
          {
            title: t('members'),
            path: pathKeys.members(true).root,
            icon: ICONS.users,
          },
          {
            title: t('gym'),
            path: pathKeys.gym(true).schedule,
            icon: ICONS.gym,
          },
          {
            title: t('account'),
            path: pathKeys.account(true).root,
            icon: ICONS.account,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
