import { Route, Routes } from 'react-router-dom'
import Error404 from '../ErrorHandling/Error404'
import Login from '../Dashboard/Login'
import ProtectedRoutes from './ProtectedRoutes'
import MainDashboard from '../Dashboard/MainDashboard'


export default function OverallRoutes(){

    return(
        <Routes>
            {/* public route */}
            <Route path ="/" element={<Login />} />

            {/* protected dashboard */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard/*" element={<MainDashboard />}/>
            </Route>

            {/* 404 Error */}
            <Route path="*" element={<Error404 />}/>

        </Routes>
    )
    
}