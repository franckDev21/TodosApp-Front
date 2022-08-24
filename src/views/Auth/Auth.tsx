import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./Auth.scss";
import AuthService from "../../services/AuthService";
import { User } from "../../core/model/user.model";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type ResponseAuth = {
  access_token : string,
  expires_in : number,
  token_type : string,
  user : User
}

const Auth = () => {

  const navigate = useNavigate();

  const [mode,setMode] = useState('LOGIN'); 
  const [loading,setLoading] = useState(false);

  const { http, isLogin, setToken } = AuthService();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorAuth,setErrorAuth] = useState<string>('');

  const passwordFieldRef = useRef(null);
  const [showPassword,setShowPassWord] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    }

    if(mode === 'LOGIN'){
      setLoading(true);
      http.post('https://my-todolist-api-test.herokuapp.com/api/login',credentials).then((res) => {
        const data : ResponseAuth = res.data;
        
        setToken(data.user,data.access_token);
        setLoading(false);
      }).catch(err => {
        if(err.response.data!.error && err.response.data!.error === 'Unauthorized'){
          setErrorAuth('Incorrect username or password');
        }
        setLoading(false);
      });
    }else{
      setLoading(true);
      http.post('https://my-todolist-api-test.herokuapp.com/api/register',{...credentials,name}).then((res) => {
        setMode('LOGIN');
        setLoading(false);
      }).catch(err => {
        if(err.response.data.errors){
          setErrorAuth(err.response.data.message)        
        }
        setLoading(false);
      });
    }
    
  };

  useEffect(() => {
    if(showPassword){
      if(passwordFieldRef.current){
        (passwordFieldRef.current as HTMLInputElement).type = 'text';
      }
    }else{
      if(passwordFieldRef.current){
        (passwordFieldRef.current as HTMLInputElement).type = 'password';
      }
    }
  },[showPassword])

  useEffect(()=>{
    if(isLogin()){
      navigate('/dashboard');
    }
  },[isLogin,navigate]);

  return (
    <form onSubmit={handleLogin} className="auth rounded-lg mt-14 mx-5 sm:mx-auto bg-white shadow-md p-5  sm:max-w-sm  ">
      <h1 className='auth__title text-4xl text-gray-600 pt-4 pb-4 font-extrabold'>
        {mode === 'LOGIN' ? 
        <>
          <span><span className="text-indigo-500">Lo</span><span className="text-fuchsia-500">gin</span></span>
        </> : <>
          <span><span className="text-indigo-500">Regi</span><span className="text-fuchsia-500">ster</span></span>
        </>}
      </h1>
      <div className="h-[.5px] w-full bg-gray-200 rounded-md mb-4"></div>
      {errorAuth && 
        <Error message={errorAuth} />
      }

      {mode === 'REGISTER' && 
        <div className='mb-4'>
          <input value={name}  onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' className='block border px-3 py-2 w-full outline-none ring-0 focus:ring-0 focus:outline-none rounded-md' />
        </div>
      }

      <div className='mb-4'>
        <input value={email}  onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email adress' className='block border px-3 py-2 w-full outline-none ring-0 focus:ring-0 focus:outline-none rounded-md' />
      </div>

      <div className="relative">
        <input ref={passwordFieldRef} value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='block border px-3 py-2 w-full outline-none ring-0 focus:ring-0 focus:outline-none rounded-md' />
        <span onClick={(e) => {
          setShowPassWord(!showPassword);
        }} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2">
          {!showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
        </span>
      </div>

      <div className="my-3 flex justify-end ">
        <span> 
          {mode === 'LOGIN' ? (
            <>
              No account?
              <span 
                className="text-indigo-400 hover:underline pl-2 cursor-pointer" 
                onClick={() => setMode('REGISTER')}>
                  Sign up now
              </span>
            </>
          ):(
            <>
              Already registered ? 
              <span 
                className="text-indigo-400 hover:underline pl-2 cursor-pointer" 
                onClick={() => setMode('LOGIN')}>
                  sign in
              </span>
            </>
          )}
        </span>
      </div>
      <button type='submit' className={` ${loading ?'disabled':''} text-center flex items-center justify-center w-full  transition-all active:scale-[97%] hover:bg-indigo-600 bg-indigo-500 text-white px-4 py-3 rounded-lg mt-4`}>
        
        {loading ? (
          <Loader size={25} />
        ):<>
          {mode === 'LOGIN' ? 'Login' : 'Register'}
        </>}
      </button>
    </form>
  );
};

export default Auth;
