import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import AuthLayout from '@layouts/auth/classic';
import { SplashScreen } from '@components/loading-screen';
import { loginUserPageRoute } from '@pages/login/login-user.page.route';
import { registerUserPageRoute } from '@pages/register/register.page.route';
import LoginPageGuard from '@auth/guard/LoginPageGuard';

// ----------------------------------------------------------------------

// JWT

export const authRoutes: RouteObject = {
  element: (
    <LoginPageGuard>
      <AuthLayout>
        <Suspense fallback={<SplashScreen loadingText="Almost there! Hang tight.." />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    </LoginPageGuard>
  ),
  children: [loginUserPageRoute, registerUserPageRoute],
};
