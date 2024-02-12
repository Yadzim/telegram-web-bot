import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from '../utils';
import { message } from 'antd';
import { ResponseError } from './errors';

let instance = axios.create();

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const access_token: string = localStorage.getItem('access_token') ?? '';
    config.baseURL = BASE_URL;

    if (!config.url?.includes('auth/login')) {
        config.headers.Authorization = `${access_token}`;
    }
    // config.headers!.Accept = 'application/json';
    // config.headers!['Content-Type'] = 'application/json';
    // config.headers!['Access-Control-Allow-Origin'] = '*';
    // config.headers!['Access-Control-Allow-Credentials'] = true;
    return config;
}

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
    new ResponseError(error);
    return Promise.reject(error);
}
const onResponse = (response: AxiosResponse): AxiosResponse => {


    switch (response.status) {
        case 201:
            // message.success("Ma'lumot qo'shildi!");
            break;
        case 200:
            if (response.config.method?.toUpperCase().includes('PUT')) {
                //     message.success("Ma'lumot o'zgartirildi!");
                // } else if (response.config.method?.toUpperCase().includes('POST')) {
                //     if (response.config.url !== "/auth/login") {
                //         //   message.success("Ma'lumot qo'shildi!");
                //     }
            }
            break;
        case 204:
            message.success("Ma'lumot o'chirildi!");
            break;
        case 401:
            // store.dispatch(AUTH_ACTIONS.signOut())
            // logOut()
            break;
    }
    return response;
}

function logOut() {
    // message.error("Login  yoki parol xato!");
    // localStorage.removeItem("access_token");
    // // Navigate("/signin");
    // store.dispatch(AUTH_ACTIONS.signOut());
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {

    new ResponseError(error);
    return Promise.reject(error);
}

instance.interceptors.request.use(onRequest, onRequestError)
instance.interceptors.response.use(onResponse, onResponseError)



export default instance;