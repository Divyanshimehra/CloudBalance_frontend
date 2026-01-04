import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {

    // const role = localStorage.getItem("role")
    // const validRoles = ["admin", "readonly", "customer"];
    
    const token = localStorage.getItem("token");

    // if(!role || !validRoles.includes(role)){
    //     return <Navigate to ="/login" replace />
    // }

    if(!token){
        return <Navigate to ="/login" replace />
    }

  return (
    <Outlet/>
  )
}