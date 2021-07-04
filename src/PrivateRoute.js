import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "./context/AuthenticationProvider";

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const { account } = useContext(AuthenticationContext);
  return (
    <Route
      {...props}
      render={(routeProps) => (
        !!account ?
          <RouteComponent {...routeProps} />
        :
          <Redirect to="/login" />
      )}
    />
  );
};

export default PrivateRoute;
