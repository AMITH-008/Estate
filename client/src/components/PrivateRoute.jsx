import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    console.log("Inside PrivateRoute");
    const {currentUser} = useSelector(state => state.user)
    console.log("Inside PrivateRoute, currentUser-> ", currentUser);
  return currentUser ?<Outlet /> : <Navigate to='/sign-in'/>
}