import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import React, { useState } from 'react';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import registration from '../../assets/registration.png';

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const [emailerr, setEmailerr] = useState('')
  const [fullNameerr, setFullNameerr] = useState('')
  const [passworderr, setPassworderr] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState('')

  const [loading, setLoading] = useState(false)
  const handleEmail = (e) =>{
    setEmail(e.target.value);
    setEmailerr('')
  }
  const handleFullName = (e) =>{
    setFullName(e.target.value);
    setFullNameerr('')
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
    if(!fullName){
      setFullNameerr('Full name is Required')
    }

    if(!password){
      setPassworderr('Password is Required')
    }

    if(email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){

      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
        toast.success('registration done & please verify your email');
              setEmail('');
              setFullName('');
              setPassword('');
              setTimeout(()=>{
                setLoading(false)
                navigate('/login')
              },3000)
        });
 
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode.includes('auth/email-already-in-use')){
          setEmailerr('Email is already in used');
        }
        setLoading(false)
      });
  
    }
  }
  return (
    <div className='flex items-center'>
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
       <div className=''>
        <h2 className='font-nun font-bold text-[#11175D] text-[34px]'>Get started with easily register</h2>
        <p className='font-nun text-[#7F7F7F] text-[20px]'>Free register and you can enjoy it</p>   
        

        <div className='relative mt-[60px] w-96'>
          <input onChange={handleEmail} value={email} className='w-full border border-[#b8bacf] rounded-lg outline-none py-[26px] px-[52px]' type="email"/>
          <p className='absolute top-[-8px] left-[34px] px-[18px] font-nun font-semibold text-[#11175D] text-[13px] tracking-[1px] bg-white'>Email Address</p>
          {
            emailerr &&
            <p className='font-nun font-semibold bg-red-500 w-96 p-[5px] rounded mt-[5px] text-white'>{emailerr}</p>
          }
        </div>

        <div className='relative mt-[60px] w-96'>
         <input onChange={handleFullName} value={fullName} className='w-full border border-[#b8bacf] rounded-lg outline-none py-[26px] px-[52px]' type="text"/>
         <p className='absolute top-[-8px] left-[34px] px-[18px] font-nun font-semibold text-[#11175D] text-[13px] tracking-[1px] bg-white'>Full Name</p>
         {
          fullNameerr &&
          <p className='font-nun font-semibold bg-red-500 w-96 p-[5px] rounded mt-[5px] text-white'>{fullNameerr}</p>
         }
        </div>

        <div className='relative mt-[60px] w-96'>
         <input onChange={handlePassword} value={password} className='w-full border border-[#b8bacf] rounded-lg outline-none py-[26px] px-[52px]' type={ showPassword ? 'text' : 'password'}/>
         <p className='absolute top-[-8px] left-[34px] px-[18px] font-nun font-semibold text-[#11175D] text-[13px] tracking-[1px] bg-white'>Password</p>
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
        {
          loading ? 
          <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        :
        <div onClick={handleSubmit} className='bg-primary rounded-full cursor-pointer'>
        <button className='inline-block  font-nun font-semibold text-white text-[20px] py-[20px]' href="">Sign up</  button>
        </div>
        }
                  
            <p className='font-sans text-[#03014C] text-[13px] mt-[35px]'>Already  have an account ? <span className='text-[#EA6C00] font-bold'><Link to='/login'>Sign In</Link></span></p>
        </div>
       </div>
       
      </div>
      <div className='w-1/2'>
        <img className=' h-screen w-full object-cover' src={registration} alt="" />
      </div>
    </div>
  )
}

export default Registration
