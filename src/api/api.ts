import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'


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
    const response = await this.http.get('/video', {
      params: {
        action: 'list-available',
      }
    });
    
    if (response.data.success) {
      return response.data.message;
    } else {
      throw new Error(response.data.message);
    }
  }

  async processVideo(video_name: string) {
    const response = await this.http.post('/video', {
      action: 'process',
      payload: video_name,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  }

  async stopProcessing(video_name: string) {
    const respone = await this.http.post('/video', {
      action: 'stop',
      payload: video_name,
    });

    if (respone.data.success) {
      return respone.data.message;
    } else {
      throw new Error(respone.data.message);
    }
  }

  async checkVideoStatus(video_name: string) {
    const response = await this.http.get('/video', {
      params: {
        action: 'check-status',
        video_name: video_name,
      }
    });

    
    const {success, message} = response.data;
    if (success) {
      return message;
    } else {
      throw new Error(message);
    }
  }

}


export const deepViewApi = new DeepViewApi();