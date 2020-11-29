import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAllowedByRole, isAuthenticated, Role } from '../../utilis/auth';

type Props = {

  children: React.ReactNode;
  path: string;
  allowedRoutes?: Role[]


}

const PrivateRoute = ({ children, path, allowedRoutes }: Props) => {

  //const isAuthenticated = false;

  // "authData" no localStorage
  //acess_token não pode estar espirado


  return (
    <Route
      path={path}
      render={({ location }) => {
        if(!isAuthenticated()){
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: location }
              }}
            />
          )
        } else if(isAuthenticated()  && !isAllowedByRole(allowedRoutes)) {
          return (
            <Redirect  to={{ pathname: "/admin"}} />


          )

        }

        return children;
      }}
    />
  );
}

export default PrivateRoute;
