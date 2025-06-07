import axios from "axios";
import { toast } from "react-toastify";
import gc from "../utils/gc";
import { Cookies } from "react-cookie";

const BASE_URL = `${gc.baseURL}/api/`;
const cookies = new Cookies();
let authToken: string | null = cookies.get('userData')?.token || null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {

  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (authToken) {
    config.headers['Authorization'] = `${authToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const response = error.response;
      const errorData = response.data as {
        errors?: Record<string, string[] | string>,
        message?: string
      };

      let message = 'Something went wrong';
      
      if (errorData?.errors) {
        const errorValues = Object.values(errorData.errors);
        if (Array.isArray(errorValues[0]) && errorValues[0].length) {
          message = errorValues[0][0];
        } 
        else if (typeof errorValues[0] === 'string') {
          message = errorValues[0];
        }
      } else if (errorData?.message) {
        message = errorData.message;
      }

      toast.error(message);
      return Promise.reject(new Error(message));
    } else if (error.request) {
      console.error('Network error:', error.request);
      toast.error('Network error');
      return Promise.reject(new Error('Network error'));
    } else {
      console.error('Request error:', error.message);
      toast.error('Request error');
      return Promise.reject(error);
    }
  }
);

export const api = {
  get: (endpoint: string) => apiClient.get(endpoint),
  post: (endpoint: string, data: any) => apiClient.post(endpoint, data),
};