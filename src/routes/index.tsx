import { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, redirect, useRouteError } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading-screen';
import NotFoundPage from '@pages/404';
import { pathKeys } from '../shared/routes';
import { authRoutes } from './modules/auth';
import { onboardingRoutes, userRoutes } from './modules/user';

export function BootstrappedRouter() {
  const [router, setRouter] = useState<ReturnType<typeof browserRouter> | null>(null);

  useEffect(() => {
    setRouter(browserRouter());
  }, []);

  if (!router) {
    return <SplashScreen loadingText="Initializing routes" />;
  }

  return <RouterProvider router={router} fallbackElement={<SplashScreen />} />;
}

const browserRouter = () =>
  createBrowserRouter([
    {
      errorElement: <BubbleError />,
      children: [
        // auth
        authRoutes,

        // user routes
        userRoutes,

        // onboarding
        onboardingRoutes,

        {
          path: '/404',
          element: <NotFoundPage />,
        },
        {
          path: '*',
          loader: async () => redirect(pathKeys.page404),
        },
      ],
    },
  ]);

function BubbleError(): null {
  const error = useRouteError();

  if (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
    }
  }
  return null;
}
