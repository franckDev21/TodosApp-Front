import { AxiosInstance } from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../core/model/user.model'
import http from '../core/utils/http-client';

function AuthService() {

  const navigate = useNavigate();

  const getToken = () => {
    const token = sessionStorage.getItem('token') || ""
    if(token !== ""){
      const userToken = JSON.parse((token))
      return userToken
    }else{
      return ""
    }
  }

  const getUser = () => {
    const userString = sessionStorage.getItem('user') || ""
    if(userString !== ''){
      const userInfo = JSON.parse((userString))
      return userInfo
    }else{
      return {}
    }
    
  }

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  }


  const [token,setToken] = useState<string>(getToken());
  const [user,setUser] = useState<User>(getUser);

  const saveToken = (user :User,token :string) => {
    sessionStorage.setItem('token',JSON.stringify(token))
    sessionStorage.setItem('user',JSON.stringify(user))

    setToken(token)
    setUser(user)
    navigate('/dashboard');
  }

  const isLogin = (): boolean =>{
    if((user && user.email) && token !== '') return true;
    return false;
  }

  const httpClient : AxiosInstance = http(token);
  

  return {
    setToken : saveToken,
    user : user,
    token : token,
    getToken,
    getUser,
    isLogin,
    logout,
    http : httpClient
  }
}

export default AuthService