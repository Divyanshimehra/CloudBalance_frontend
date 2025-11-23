import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {

    const role = localStorage.getItem("role")
    const validRoles = ["admin", "readonly", "customer"];
    
    if(!role || !validRoles.includes(role)){
        return <Navigate to ="/" replace />
    }

  return (
    <Outlet/>
  )
}