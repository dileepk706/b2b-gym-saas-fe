import { Helmet } from 'react-helmet-async';
import { AccountSettingsWidget } from 'widgets/account-settings';
import { GymSettingsWidget } from 'widgets/gym-settings';

export default function GymSettingPage() {
  return (
    <>
      <Helmet>
        <title>Settings - Gym</title>
      </Helmet>

      <GymSettingsWidget />
    </>
  );
}
