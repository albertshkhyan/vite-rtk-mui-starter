import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@modules/auth";

interface GuardRouteProps {
  children: ReactNode;
  redirectPath: string;
  check: (isAuthenticated: boolean) => boolean;
}

const GuardRoute: React.FC<GuardRouteProps> = ({
  children,
  redirectPath,
  check,
}) => {
  const { isAuthenticated } = useAuth();
  const shouldRedirect = check(isAuthenticated);

  return shouldRedirect ? <Navigate to={redirectPath} /> : <>{children}</>;
};

export default GuardRoute;
