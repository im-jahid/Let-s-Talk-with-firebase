import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [emailerr, setEmailerr] = useState('');

    const handleEmail = (e) =>{
        setEmail(e.target.value);
        setEmailerr('')
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
    
    
        if(email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('send');
                setEmail('')
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
        }
        
        }

  return (
    <div className='h-screen w-full bg-primary flex justify-center items-center'>
      <div className='bg-white w-1/2 rounded p-5'>
      <h2 className='font-nun font-bold text-[#11175D] text-[34px]'>Forgot Password</h2>
      <div className='relative mt-[60px] w-96'>
          <input onChange={handleEmail} value={email} className='w-full border-b border-[#b8bacf] outline-none py-[26px] ' type="email"/>
          <p className='absolute top-[-8px]  font-nun font-semibold text-[#11175D] text-[13px] tracking-[1px] bg-white'>Email Address</p>
          {
            emailerr &&
            <p className='font-nun font-semibold bg-red-500 w-96 p-[5px] rounded mt-[5px] text-white'>{emailerr}</p>
          }
        </div>

  
             <div className='mt-[20px]'>
             <button onClick={handleSubmit} className='font-nun font-semibold text-white text-[16px] py-[20px] bg-primary p-5 rounded-lg' href="">Reset</button>
                <button className='ml-[20px] font-nun font-semibold text-white text-[16px] py-[20px] bg-primary p-5 rounded-lg' href=""><Link to='/login'>Back to Login</Link></button>
             </div>
     
      </div>
    </div>
  )
}

export default ForgotPassword
