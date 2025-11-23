import MenuIcon from '@mui/icons-material/Menu';
import ckLogo from '/src/assets/ck.svg'
import userPic from '/src/assets/userPic.jpeg'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

export default function NavBar({ toggleSidebar }) {
    // const userName = localStorage.getItem("username") || "User";
    const {userName} = useContext(AppContext);

    return (
        <div className="flex items-center justify-between h-20 px-6 bg-white shadow">

            <div className="flex items-center gap-4">
                <img src={ckLogo} className='w-50'/>
                <button onClick={toggleSidebar}><MenuIcon fontSize='medium'/></button>
            </div>

            <div className='flex items-center gap-2'>
                <img src={userPic} className='w-10 h-10 rounded-full' alt='profile_pic'/>
                <h3 className='text-gray-700'>
                    Welcome, <span className="font-semibold">{userName}</span>
                </h3>
                <button className='flex items-center gap-1 border border-blue-700 px-3 py-1 rounded text-blue-700 font-medium cursor-pointer'>
                    <LogoutIcon fontSize="small" />
                    Logout
                </button>
            </div>
        </div>
    )
}