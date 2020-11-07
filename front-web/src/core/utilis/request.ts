import axios, {Method} from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from './auth';
import qs from 'qs';

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

 export const makeRequest = ({method ='GET', url, data, params, headers } : RequestParams) =>{

    return axios({
        method,
        url: `${BASE_url}${url}`,
        data,
        params,
        headers
    });
}

export const makeLogin = (loginData: LoginData) => {

    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }


    // '/oauth/token'

    //username=maria@gmail.com&password=123456&grant_type=password

    const payload = qs.stringify({...loginData, grant_type: 'password' });

    return makeRequest({ url: '/oauth/token', data: payload,  method: 'POST', headers });

}