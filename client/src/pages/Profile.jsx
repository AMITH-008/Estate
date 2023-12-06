import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUser } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'

export default function Profile() {
  const {currentUser, loading, error} = useSelector(state => state.user);
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError , setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if(data.success === false ) {
        dispatch(updateUserFailure(data));
        return
      }
      setUpdateSuccess(true);
      dispatch(updateUserSuccess(data));
    }catch(error) {
      console.log(error);
      dispatch(updateUserFailure(error));
    }
  }

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageUploadProgress(Math.round(progress));
    }, (error) => {

      setImageUploadError(true);

    }, async () => {
        const dlURL = await getDownloadURL(storageRef);
        setFormData({
          ...formData,
          profileImg:dlURL
        });
        console.log(dlURL);
    } )
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, 
        {
          method:'DELETE'
        });
      const data = await res.json();
      if(data.success === false ) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }catch(err) {
      dispatch(deleteUserFailure(err));
    }
  }

  const handleSignout = async () => {
    try {
      await fetch('/api/auth/signout', {
        method:'GET'
      });
      dispatch(signOutUser());
    }catch (error)  {
      console.log(error);
    }
  }

  useEffect(() => {
    if(image) {
      handleFileUpload(image)
    }
  }, [image])

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2'>
        <input 
          type='file' 
          ref={fileRef} 
          hidden 
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}/>
        <img 
          onClick={() => fileRef.current.click()}
          src={imageUploadProgress===100 && !imageUploadError ? formData.profileImg :currentUser.profileImg} 
          alt="profileImage" 
          className='h-24 w-24 rounded-full object-cover cursor-pointer self-center'/>
        <p className='text-sm self-center'>
          {imageUploadError ? 
            (<span className='text-red-500'>Error Uploading Image</span>) :
            imageUploadProgress > 0 && imageUploadProgress < 100 ? 
            (<span className='text-blue-400'>{`Uploading:  ${imageUploadProgress}%`}</span>):
            imageUploadProgress === 100 ?
            <span className='text-green-400'> Image Uploaded Successfully</span>:
            ''
          }
        </p>
        <input 
          type="text" 
          id="username" 
          placeholder='Username' 
          defaultValue={currentUser.username} 
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}/>
        <input 
          type="text" 
          id="email" 
          placeholder='Email' 
          defaultValue={currentUser.email}  
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}/>
        <input 
          type="password" 
          id="password" 
          placeholder='Password'  
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}/>
          <button className=' p-3 rounded-lg hover:opacity-90 font-semibold text-md bg-gradient-to-r from-blue-500 to-green-500 disabled:opacity-80'>{loading?"Loading......":"Update"}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAccount} className='text-red-500 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something Went Wrong!"}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && "User updated successfully"}</p>
    </div>
  )
}
