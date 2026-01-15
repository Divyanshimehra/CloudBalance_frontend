import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';

export default function ProtectedRoutes() {
  const {user, loading} = useContext(UserContext);
  
    if(loading){
        return null;
    }

    if(!user){
        return <Navigate to ="/login" replace />
    }

  return (
    <Outlet/>
  )
}