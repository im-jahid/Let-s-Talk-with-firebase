import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from 'react';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import google from '../../assets/google.png';
import login from '../../assets/login.png';
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailerr, setEmailerr] = useState('')
  const [passworderr, setPassworderr] = useState('')

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')

  const handleEmail = (e) =>{
    setEmail(e.target.value);
    setEmailerr('')
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value);
    setPassworderr('')
  }

  const handleSubmit = () =>{
    console.log('ok cool');
    if(!email){
      setEmailerr('Email is Required');
    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
        setEmailerr('Email is Invalid');
      }
    }

    if(!password){
      setPassworderr('Password is Required')
    }

    if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
      signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast.success('Login successfully done');
        console.log(user.user);
        dispatch(userLoginInfo(user.user));
        localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
        setError('');
        setTimeout(()=>{
          navigate('/')
        },3000)
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if(errorCode.includes('auth/invalid-login-credentials')){
          setError('Please give your right email & password');
        }
      });
        }
    
    }


  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then(() => {
      setTimeout(()=>{
        navigate('/')
      },3000)
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
  }


  return (
    <div className='flex'>
      <div className='w-1/2 flex justify-end mr-[69px]'>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
       <div className='mt-[100px]'>
        <h2 className='font-nun font-bold text-[#11175D] text-[34px]'>Login to your account!</h2>
        <img onClick={handleGoogleSignIn} src={google} alt="" />
        {
          error &&
          <p className='font-nun bg-red-500  text-white text-[20px] p-[10px] mt-4'>{error}</p>
        }
        <div className='relative mt-[60px] w-96'>
          <input onChange={handleEmail} value={email} className='w-full border-b border-[#b8bacf] outline-none py-[26px] ' type="email"/>
          <p className='absolute top-[-8px]  font-nun font-semibold text-[#11175D] text-[13px] tracking-[1px] bg-white'>Email Address</p>
          {
            emailerr &&
            <p className='font-nun font-semibold bg-red-500 w-96 p-[5px] rounded mt-[5px] text-white'>{emailerr}</p>
          }
        </div>

        <div className='relative mt-[60px] w-96'>
         <input onChange={handlePassword} value={password} className='w-full border-b border-[#b8bacf]  outline-none py-[26px]' type={ showPassword ? 'text' : 'password'}/>
         <p className='absolute top-[-8px] font-nun font-semibold text-[#11175D] text-[13px] tracking-[1px] bg-white'>Password</p>
         {
          showPassword ?
          <RiEyeFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-[33px] right-[23px]'/>
          :
          <RiEyeCloseFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-[33px] right-[23px]'/>

         }
         {
          passworderr &&
          <p className='font-nun font-semibold bg-red-500 w-96 p-[5px] rounded mt-[5px] text-white'>{passworderr}</p>
         }
        </div>
        <div className='w-96 text-center mt-[50px]'>
            <div onClick={handleSubmit} className='bg-primary rounded-full cursor-pointer'>
                <button className='inline-block  font-nun font-semibold text-white text-[20px] py-[20px]' href="">Login to Continue</button>
            </div>
            <p className='font-sans text-[#03014C] text-[13px] mt-[35px]'>Don’t have an account ? <span className='text-[#EA6C00] font-bold'><Link to='/registration'>Sign In</Link></span></p>
            <p className='font-sans text-[#EA6C00] font-bold cursor-pointer text-[13px] mt-[35px]'> <Link to='/forgotPassword'>Forgotton Password</Link></p>
        </div>
       </div>
       
      </div>
      <div className='w-1/2'>
        <img className='h-screen w-full object-cover' src={login} alt="" />
      </div>
    </div>
  )
}

export default Login
