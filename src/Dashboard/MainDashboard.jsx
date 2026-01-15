import React, { useContext } from 'react'
import { routesByRole } from '../Routes/routesByRole';
import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import App from '../App';
import { UserContext } from '../Context/UserContext';

export default function MainDashboard() {

  const {user} = useContext(UserContext);
  const role = user ? user.role : null;

  if (!role || !routesByRole[role]) {
    return <Navigate to="/login" replace />;
  }

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
      <Route index element={<Navigate to ={
        role === "CUSTOMER" ? "cost-explorer" : "users"
      } replace />
      } />
    </Route>
  </Routes>
  )

}
