import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import AuthLayout from '@layouts/auth/classic';
import { loginUserPageRoute } from '@pages/login/login-user.page.route';
import { registerUserPageRoute } from '@pages/register/register.page.route';
import GuestGuard from '@auth/guard/LoginPageGuard';
import { SplashScreen } from 'shared/ui';

// ----------------------------------------------------------------------

// JWT

export const authRoutes: RouteObject = {
  element: (
    <GuestGuard>
      <AuthLayout>
        <Suspense fallback={<SplashScreen loadingText="Almost there! Hang tight.." />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    </GuestGuard>
  ),
  children: [loginUserPageRoute, registerUserPageRoute],
};
