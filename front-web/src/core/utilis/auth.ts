import jwtDecode from 'jwt-decode';
import history from './history';



export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
export const CLIENT_SECRET=  process.env.REACT_APP_CLIENT_SECRET ??'dscatalog123';


type LoginResponse = {
    
    access_token: string;
    token_type : string
    expires_in : number
    scope  : string;
    userId : number;
    userFisrtName : string;
}



export type  Role = 'ROLE_OPERATOR' |  'ROLE_ADMIN';



type AcessToken = {

    
  exp: number;
  user_name: string;
  authorities:Role[]
  }
  
   
export const saveSessionData = (loginResponse: LoginResponse) => {

    localStorage.setItem('authData', JSON.stringify(loginResponse));

}


export const getSessionData = () => {

    const sessionData = localStorage.getItem('authData') ?? '{}';
    const parsedSessionData = JSON.parse(sessionData);
    
    return parsedSessionData as LoginResponse;
}


export const getAcessTokenDecoded = () => {

    const sessionData = getSessionData();

    try{
        const tokenDecoded = jwtDecode(sessionData.access_token);

        return tokenDecoded as AcessToken;

    }catch(error){

        return {} as AcessToken;
    }

    

}



export const  isTokenValid= () =>{

    const { exp } = getAcessTokenDecoded();

    // or option  bottom
    //const  acessToken= getAcessTokenDecoded();
    //acessToken.exp();

     return Date.now() <= exp * 1000;


}

export const isAuthenticated = () => {

      // "authData" no localStorage
    //acess_token não pode estar espirado

    const sessionData = getSessionData();

    return sessionData.access_token && isTokenValid();

}

export const isAllowedByRole = (routeRoles: Role[] = []) => {

    if(routeRoles.length === 0 ) {
        return true;
    }


    /*

    // or option on botton

    const userToken = getAcessTokenDecoded();
    const userRoles = userToken.authorities;


    */

    const { authorities } = getAcessTokenDecoded();

    return routeRoles.some(role => authorities?.includes(role));
   

}

export const logout = () => {
    localStorage.removeItem('authData');
    history.replace('/auth/login');
}