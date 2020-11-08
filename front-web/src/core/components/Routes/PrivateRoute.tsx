import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../../utilis/auth';

type Props = {

    children: React.ReactNode;
    path: string;


}

const PrivateRoute = ({ children, path }: Props) => {
    
    //const isAuthenticated = false;

    // "authData" no localStorage
    //acess_token não pode estar espirado


    return (
      <Route
      path={path}
        render={({ location }) =>
        isAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin/auth/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;
