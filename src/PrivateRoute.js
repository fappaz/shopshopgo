import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "./context/AuthenticationProvider";

/**
 * A route that will render the component if the account is NOT authenticated, or redirect to a path otherwise.
 */
const PrivateRoute = ({ component: RouteComponent, redirectPath = "/login", ...props }) => {
  const { account } = useContext(AuthenticationContext);
  return (
    <Route
      {...props}
      render={(routeProps) => (
        !!account ?
          <RouteComponent {...routeProps} />
        :
          <Redirect to={redirectPath} />
      )}
    />
  );
};

export default PrivateRoute;
