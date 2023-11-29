import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import { singInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';



const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleLogin = async () => {
    try{

        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider);
        const response = await fetch('api/auth/google', {
          method:'POST',
          headers:{
            'Content-Type':'application/json',

          },
          body:JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            profileImg: result.user.photoURL
          })
        });
        const data = await response.json();
        dispatch(singInSuccess(data));
        navigate('/')
    }catch(error) {
        console.log("could not login with google", error);
    }

  }
 
  return (
    <button type='button' onClick={handleGoogleLogin} className='bg-blue-500 p-3 rounded-md text-white uppercase hover:opacity-90'>Continue with Google</button>
  )
}

export default OAuth