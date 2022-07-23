import React, { FormEvent, useEffect, useState } from "react";
import "./Auth.scss";
import AuthService from "../../services/AuthService";
import { User } from "../../core/model/user.model";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

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

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    }

    if(mode === 'LOGIN'){
      setLoading(true);
      http.post('http://localhost:8000/api/login',credentials).then((res) => {
        const data : ResponseAuth = res.data;
        console.log(data.user,data.access_token);
        
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
      http.post('http://localhost:8000/api/register',{...credentials,name}).then((res) => {
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
  

  useEffect(()=>{
    if(isLogin()){
      navigate('/dashboard');
    }
  },[isLogin,navigate]);

  return (
    <form onSubmit={handleLogin} className="auth rounded-lg mt-10 mx-5 sm:mx-auto bg-white shadow-md p-5  sm:max-w-sm  ">
      <h1 className='auth__title text-2xl text-gray-600 pt-4 pb-4 font-bold'>
        {mode === 'LOGIN' ? 'Login' : 'Register'}
      </h1>

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

      <div>
        <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='block border px-3 py-2 w-full outline-none ring-0 focus:ring-0 focus:outline-none rounded-md' />
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
