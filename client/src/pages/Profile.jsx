import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4 mt-2'>
        <img src={currentUser.profileImg} alt="profileImage" className='h-24 w-24 rounded-full object-cover cursor-pointer self-center'/>
        <input 
          type="text" 
          id="username" 
          placeholder='Username' 
          defaultValue={currentUser.username} 
          className='bg-slate-100 rounded-lg p-3'/>
        <input 
          type="text" 
          id="email" 
          placeholder='Email' 
          defaultValue={currentUser.email}  
          className='bg-slate-100 rounded-lg p-3'/>
        <input 
          type="password" 
          id="password" 
          placeholder='Password'  
          className='bg-slate-100 rounded-lg p-3'/>
          <button className=' p-3 rounded-lg hover:opacity-90 font-semibold text-md bg-gradient-to-r from-blue-500 to-green-500 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
