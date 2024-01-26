import React, { useState, createRef } from 'react'
import profile from '../../assets/profile.png'
import { AiOutlineHome, AiFillMessage } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import { BiDotsVertical, BiUpload } from 'react-icons/bi'
import { TbLogout2 } from 'react-icons/tb'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";


const Sidebar = () => {
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  let [profilephoto,setProfilePhoto]=useState('')
  // cropperimg 


  let [profileModal, setProfileModal] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('doneeeeeeeeeeeeeee');
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }).catch((error) => {
      console.log(error.code);
    });
  }

  let handleProfileModal = () => {
    setProfileModal(true)
  }
  // imgcropper 
  const onChange = (e) => {

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, 'some-child');
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setProfilePhoto(downloadURL)
          console.log(downloadURL);
        });
      });
    }
  };
  return (

    <>
      {profileModal
        ?
        <div className='w-full h-screen bg-red-500 absolute flex justify-center items-center'>
          <div className='w-[500px] bg-white rounded-2xl  text-center p-10'>
            <h2 className='text-2xl font-bold font-pops  mt-4'> Upload your profile Photo </h2>
            <input onChange={onChange} type="file" className='mt-4 block mx-auto mb-5' />
            <div className='w-[120px] h-[120px] rounded-full mx-auto mb-5  overflow-hidden'>
              <div
                className="img-preview"
                style={{ width: "100%", float: "left", height: "300px" }}
              />

            </div>
            <div className='w-[400px] h-[300px] overflow-hidden mb-10'>
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />

            </div>

            <button onClick={getCropData} className='bg-primary py-3 px-2 text-white'>Upload</button>
            <button onClick={() => setProfileModal(false)} className='bg-red-500 py-3 px-2 text-white ml-5'>Cancel</button>
          </div>
        </div>
        :
        <div className='bg-primary h-screen  rounded-lg pt-[38px]'>
          <div className='w-[96px] h-[96px] mx-auto  rounded-full relative overflow-hidden group'>
            <img src={profilephoto} alt="" className=' w-full h-full' />

            <div onClick={handleProfileModal} className='w-0 h-full group-hover:w-full bg-[rgba(0,0,0,.4)] absolute top-0 left-0 flex justify-center items-center'>
              <BiUpload className='text-white' />
            </div>
          </div>
          <div className='relative mt-[78px] py-[20px] after:absolute after:content-[""] after:bg-white after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg before:absolute before:content-[""] before:bg-primary before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-lg'>
            <AiOutlineHome className='text-5xl mx-auto text-primary font-bold' />
          </div>

          <div className='mt-[78px]'>
            <AiFillMessage className='text-5xl mx-auto text-[#BAD1FF] font-bold' />
          </div>
          <div className='mt-[78px]'>
            <IoMdNotificationsOutline className='text-5xl mx-auto text-[#BAD1FF] font-bold' />
          </div>
          <div className='mt-[78px]'>
            <FiSettings className='text-5xl mx-auto text-[#BAD1FF] font-bold' />
          </div>
          <div className='mt-[100px]'>
            <TbLogout2 onClick={handleSignOut} className='text-5xl mx-auto text-[#BAD1FF] font-bold' />
          </div>
        </div>
      }


    </>

  )
}

export default Sidebar