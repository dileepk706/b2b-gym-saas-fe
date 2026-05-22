import OnboardingView from 'features/onboarding/onboarding.view';
import { Helmet } from 'react-helmet-async';

export default function OnboardingUserPage() {
  return (
    <>
      <Helmet>
        <title>Onboarding</title>
      </Helmet>
      <OnboardingView />
    </>
  );
}
