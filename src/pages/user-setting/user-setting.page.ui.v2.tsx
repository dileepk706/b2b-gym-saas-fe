import { Helmet } from 'react-helmet-async';
import Subheading from 'shared/ui/subheading/subheading';
import { AccountSettingsWidget } from 'widgets/account-settings';

export default function UserSettingPage() {
  return (
    <>
      <Helmet>
        <title>Settings - User</title>
      </Helmet>

      <AccountSettingsWidget />
    </>
  );
}
