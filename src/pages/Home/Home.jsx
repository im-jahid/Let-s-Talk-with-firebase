import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from '../../components/Sidebar/Sidebar';
import GroupList from '../../components/GroupList/GroupList';

const Home = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false)


  useEffect(() => {
    if (!data) {
      navigate('/login')
    }
  }, [])
  onAuthStateChanged(auth, (user) => {
    console.log(user, 'ussssssssssssssssser');
    if (user.emailVerified) {
      setVerify(true)
    }
  });


  return (
    <div>
      {
        verify ?
          <div className='flex'>
            <div className='w-[186px]'>
              <Sidebar />
            </div>
            <div className='w-[427px]'>
              <GroupList/>
            </div>
            <div className='w-[344px]'>fkgjfjg</div>
            <div className='w-[344px]'>fkgjfjg</div>
          </div>
          :
          <div className='h-screen w-full bg-primary flex justify-center items-center'>
            <div className='bg-white rounded w-[700px] p-20'>
              <h1 className='font-nun font-bold text-[#11175D] text-[34px]' >Please verify your email</h1>
              <button>
                <Link to='/login'>Back to Login</Link>
              </button>
            </div>
          </div>


      }
    </div>
  )
}

export default Home
