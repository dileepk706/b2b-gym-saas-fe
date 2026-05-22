import LoginUserView from 'features/auth/login/view/login.user.view';
import { Helmet } from 'react-helmet-async';

export default function UserLoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginUserView />
    </>
  );
}
