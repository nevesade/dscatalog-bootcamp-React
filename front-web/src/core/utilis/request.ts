import axios, {Method} from 'axios';


type RequestParams = {
    method?: Method;
    url:string;
    data?: object;
    params?: object;
}

const BASE_url = 'http://localhost:3003';

 export const makeRequest = ({method ='GET', url, data, params } : RequestParams) =>{

    return axios({
        method,
        url: `${BASE_url}${url}`,
        data,
        params,
    });
}