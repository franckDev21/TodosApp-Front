import axios, { AxiosInstance } from "axios";

const http = (token: string) : AxiosInstance => {
  return axios.create({
    baseURL: 'https://my-todolist-api-test.herokuapp.com/',
    // baseURL: ' https://my-todolist-api-test.herokuapp.com/',
    headers: {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    }
  });
}

export default http;