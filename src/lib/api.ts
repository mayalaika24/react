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

const getHeaders = (data?: any) => {
  const headers: Record<string, string> = {};

  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (authToken) {
    headers['Authorization'] = `${authToken}`;
  }

  return headers;
};

export const api = {
  get: (endpoint: string) =>
    fetch(`${BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    }),

  post: (endpoint: string, data: any) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(data),
      body: data,
    }).then(async (res) => {
      if (!res.ok) {
       try {
          const error = await res.json() as {
            errors?: Record<string, string[] | string>,
            message?: string
          };
          
          let message = 'Something went wrong';
          
          if (error?.errors) {
            const errorValues = Object.values(error.errors);
            if (Array.isArray(errorValues[0]) && errorValues[0].length) {
              message = errorValues[0][0];
            } 
            else if (typeof errorValues[0] === 'string') {
              message = errorValues[0];
            }
          } else if (error?.message) {
            message = error.message;
          }
          
          toast.error(message);
          throw new Error(message);
        } catch (e) {
          console.error('Error processing response:', e);
          throw new Error('Network error');
        }               
      }
      return res.json();
    }).catch(e => {
      toast.error('Network Error')
      console.log(e)
    }),
};