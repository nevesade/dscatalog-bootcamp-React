import axios, {Method} from 'axios';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';
import qs from 'qs';
//import history from './history';

type RequestParams = {
    method?: Method;
    url:string;
    data?: object | string;
    params?: object;
    headers?: object;
}


type LoginData = {

    username: string;
    password: string;
}

const BASE_url = 'http://localhost:8080';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log('A response deu certo');
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx (200) cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 ){
        //console.log('Redirecionar o usuário para Login');
        //history.push('/auth/login');
        logout();


    }
    return Promise.reject(error);
  });


 export const makeRequest = ({method ='GET', url, data, params, headers } : RequestParams) =>{

    return axios({
        method,
        url: `${BASE_url}${url}`,
        data,
        params,
        headers
    });
}


export const makePrivateRequest = ({method ='GET', url, data, params } : RequestParams) => {

    const sessionData = getSessionData();

    const headers = {
        
        'Authorization' : `Bearer ${sessionData.access_token}`
    }


    return makeRequest({method, url, data, params, headers })
}

export const makeLogin = (loginData: LoginData) => {


    //headers
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }


    //payload  or body request
    // '/oauth/token'

    //username=maria@gmail.com&password=123456&grant_type=password

    const payload = qs.stringify({...loginData, grant_type: 'password' });

    return makeRequest({ url: '/oauth/token', data: payload,  method: 'POST', headers });

}