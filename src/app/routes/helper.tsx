import { lazy } from "react";

import { RouteObject } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import PrivateLayout from "../../layouts/PrivateLayout";
import GuardRoute from "@app/routes/GuardRoute.tsx";
import { PAGE_ROUTES_PRIVATE, PAGE_ROUTES_PUBLIC } from "@app/routes/types";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("@pages/ForgotPasswordPage"));
const OverviewPage = lazy(() => import("@pages/OverviewPage"));
const SettingsPage = lazy(() => import("@pages/SettingsPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));
const publicRoutes: RouteObject[] = [
  {
    path: PAGE_ROUTES_PUBLIC.HOME,
    element: (
      <GuardRoute
        redirectPath={PAGE_ROUTES_PRIVATE.HOME}
        check={(isAuthenticated) => isAuthenticated}
      >
        <LoginPage />
      </GuardRoute>
    ),
  },
  {
    path: PAGE_ROUTES_PUBLIC.LOGIN,
    element: (
      <GuardRoute
        redirectPath={PAGE_ROUTES_PRIVATE.HOME}
        check={(isAuthenticated) => isAuthenticated}
      >
        <LoginPage />
      </GuardRoute>
    ),
  },
  {
    path: PAGE_ROUTES_PUBLIC.FORGOT_PASSWORD,
    element: (
      <GuardRoute
        redirectPath={PAGE_ROUTES_PRIVATE.HOME}
        check={(isAuthenticated) => isAuthenticated}
      >
        <ForgotPasswordPage />
      </GuardRoute>
    ),
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: PAGE_ROUTES_PRIVATE.HOME,
    element: (
      <GuardRoute
        redirectPath={PAGE_ROUTES_PUBLIC.HOME}
        check={(isAuthenticated) => !isAuthenticated}
      >
        <OverviewPage />
      </GuardRoute>
    ),
  },
  {
    path: PAGE_ROUTES_PRIVATE.OVERVIEW,
    element: (
      <GuardRoute
        redirectPath={PAGE_ROUTES_PUBLIC.HOME}
        check={(isAuthenticated) => !isAuthenticated}
      >
        <OverviewPage />
      </GuardRoute>
    ),
  },
  {
    path: PAGE_ROUTES_PRIVATE.SETTINGS,
    element: (
      <GuardRoute
        redirectPath={PAGE_ROUTES_PUBLIC.HOME}
        check={(isAuthenticated) => !isAuthenticated}
      >
        <SettingsPage />
      </GuardRoute>
    ),
  },
];

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: publicRoutes,
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: privateRoutes,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
