import { Helmet } from 'react-helmet-async';
import { AccountSettingsWidget } from 'widgets/account-settings';

export default function SettingPage() {
  return (
    <>
      <Helmet>
        <title>Settings - Account</title>
      </Helmet>

      <AccountSettingsWidget />
    </>
  );
}
