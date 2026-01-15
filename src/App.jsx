import { BrowserRouter } from 'react-router-dom'
import OverallRoutes from './Routes/OverallRoutes'
import './style.css' 
import UserProvider from './Context/UserProvider'
import AccountProvider from './Context/AccountProvider'
import { useEffect, useState } from 'react'
import { setAuthErrorHandler } from './api/apiClient'
import AuthExpiredDialog from './api/AuthExpiredDialog'
// import { AccountProvider } from './Context/AccountProvider'

export default function App() {
  const [authExpired, setAuthExpired] = useState(false);

  useEffect(() => {
    setAuthErrorHandler(() => {
      setAuthExpired(true);
    });
  }, []);

  return (
   <>
     <BrowserRouter>
       <AuthExpiredDialog open={authExpired} />
          <UserProvider>
            <AccountProvider>
              <OverallRoutes/>
            </AccountProvider>
          </UserProvider>
     </BrowserRouter>
   </>
  )
}
