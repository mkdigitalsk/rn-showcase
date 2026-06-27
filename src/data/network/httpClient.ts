import axios, { AxiosInstance, AxiosError } from 'axios';
import { Preferences } from '../local/Preferences';
import { SESSION_STORAGE_ID } from '../local/SessionPreferences';

const BASE_URL = 'https://kmp-showcase-production.up.railway.app/api/v1';
const TIMEOUT_MS = 30000;
const AUTH_TOKEN_KEY = 'auth_token';

// Read directly from storage (not via DI) to avoid a container ↔ axios module cycle.
const tokenStore = new Preferences(SESSION_STORAGE_ID);

export const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach bearer token + log
httpClient.interceptors.request.use(
  (config) => {
    const token = tokenStore.getString(AUTH_TOKEN_KEY);
    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
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
