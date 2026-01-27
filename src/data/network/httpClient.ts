import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TIMEOUT_MS = 30000;

export const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`[HTTP] ${response.status} ${response.config.url}`);
      console.log('[HTTP] Response:', JSON.stringify(response.data, null, 2));
    }
    return response;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error(`[HTTP] Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);
