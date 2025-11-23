import { BrowserRouter } from 'react-router-dom'
import OverallRoutes from './Routes/OverallRoutes'
import './style.css' 

function App() {

  return (
    <>
    <BrowserRouter>
        <OverallRoutes/>
    </BrowserRouter>
    </>
  )
}

export default App
