import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig } from 'axios'


function authenticate(config: AxiosRequestConfig<any>) {
  const getCsrftoken = () => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken'))
    return cookie ? cookie.split('=')[1] : ''
  };

  const csrftoken = getCsrftoken();
  config.xsrfCookieName = 'csrftoken';
  config.xsrfHeaderName = 'X-CSRFToken'
  config.headers = {
    'X-CSRFToken': csrftoken,
    'Content-Type': 'application/json'
  }


  return config;

}


export class DeepViewApi {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:8000/deepcom/',
      withCredentials: true,
    });

    this.http.interceptors.request.use(authenticate);
  }

  async fetchAvailableVideos() {
    const response = await this.http.get('/available-videos/');  
    return response.data;
  }


}


export const deepViewApi = new DeepViewApi();