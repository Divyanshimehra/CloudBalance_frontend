import MenuIcon from '@mui/icons-material/Menu';
import ckLogo from '/src/assets/ck.svg'
import userPic from '/src/assets/userPic.jpeg'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function NavBar({ toggleSidebar }) {
    const { user, activeAccount, setActiveAccount } = useContext(UserContext);

    const userName = user ? user.firstName : "Guest";
    const role = user?.role;
    const isCustomer = role === "CUSTOMER";
    const accounts = user?.accounts || [];

    const handleAccountChange = (e) => {
        const accountId = Number(e.target.value);
        const account = accounts.find(a => a.id === accountId);
        setActiveAccount(account);
    };

    useEffect(() => {
        if (isCustomer && accounts.length > 0 && !activeAccount) {
            setActiveAccount(accounts[0]);
        }
    }, [isCustomer, accounts, activeAccount, setActiveAccount]);


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        return navigate("/login");
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 min-h-20 px-6 bg-white shadow">
            <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
                <img src={ckLogo} className='w-50'/>
                <button onClick={toggleSidebar}><MenuIcon fontSize='medium'/></button>
            </div>
            
            {isCustomer && accounts.length > 0 && (
                <div className="flex items-center space-x-8">
                    <div className="flex flex-col text-sm">
                        <h4 className="font-semibold text-gray-700 leading-none">
                            AWS Account
                        </h4>
                        <div className="relative inline-block">
                            <select
                            value={activeAccount ? activeAccount.id : ""}
                            onChange={handleAccountChange}
                            className="appearance-none text-gray-800 focus:outline-none pr-6 text-base bg-transparent">
                                {accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.accountName}
                                    </option>
                                ))}
                            </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-blue-500">
                            <KeyboardArrowDownIcon fontSize="medium" />
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>



            <div className='flex items-center gap-2'>
                <img src={userPic} className='w-10 h-10 rounded-full' alt='profile_pic'/>
                <h3 className='text-gray-700'>
                    Welcome, <span className="font-semibold">{userName}</span>
                </h3>
                <button onClick={handleLogout} className='flex items-center gap-1 border border-blue-700 px-3 py-1 rounded text-blue-700 font-medium cursor-pointer'>
                    <LogoutIcon fontSize="small" />
                    Logout
                </button>
            </div>
        </div>
    )
}