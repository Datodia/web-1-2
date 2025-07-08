import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 6 * 10000,
});


export const createEventSource = (endpoint: string, token: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`);
  const eventSource = new EventSource(url.toString(), {
    withCredentials: true,
  });
  
  return eventSource;
};