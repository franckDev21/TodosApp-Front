import axios, { AxiosInstance } from "axios";

const http = (token: string) : AxiosInstance => {
  return axios.create({
    // baseURL: 'https://my-todolist-api-test.herokuapp.com/',
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    }
  });
}

export default http;