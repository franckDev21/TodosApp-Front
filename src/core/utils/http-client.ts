import axios, { AxiosInstance } from "axios";

const http = (token: string) : AxiosInstance => {
  return axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    }
  });
}

export default http;