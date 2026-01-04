import React from 'react'
import { routesByRole } from '../Routes/routesByRole';
import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';

export default function MainDashboard() {
  const role = localStorage.getItem("role");
  

  // if (!role || !routesByRole[role]) {
  //   return <Navigate to="/login" replace />;
  // }

  const allowedRoutes = routesByRole[role];
  return (
  <Routes>

    <Route path="*" element={<Layout />}>

      {allowedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}
      <Route index element={<h1>Welcome to Dashboard</h1>} />
    </Route>
  </Routes>
  )

}
