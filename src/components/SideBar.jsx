//displaying different items in Sidebar based on Role

import { NavLink } from "react-router-dom";
import {ManageAccounts, DashboardCustomize, DisplaySettings, Laptop, AttachMoney, CloudQueue } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function SideBar({isSideBarOpen}) {
    
    const {user} = useContext(UserContext);
    const role = user ? user.role : null;
    
    const menuByRole = {
        ADMIN: [
            {label:"User Management", path:"/dashboard/users", icon:<ManageAccounts/>}, 
            {label:"User Onboarding", path:"/dashboard/onboarding", icon:<Laptop/>}, 
            {label:"Cost Explorer", path:"/dashboard/cost-explorer", icon:<AttachMoney/>},
            {label:"AWS Service", path:"/dashboard/AWS-service", icon:<CloudQueue/>}, 

        ],
        READONLY: [
            {label:"User Management", path:"/dashboard/users", icon:<ManageAccounts/>}, 
            {label:"User Onboarding", path:"/dashboard/onboarding", icon:<Laptop/>}, 
            {label:"Cost Explorer", path:"/dashboard/cost-explorer", icon:<AttachMoney/>},
            {label:"AWS Service", path:"/dashboard/AWS-service", icon:<CloudQueue/>}, 
        ],
        CUSTOMER: [
            {label:"Cost Explorer", path:"/dashboard/cost-explorer", icon:<AttachMoney/>},
            {label:"AWS Service", path:"/dashboard/AWS-service", icon:<CloudQueue/>}, 
            ],
    };
    
    const menu = menuByRole[role] || [];
    
    return (
    <aside className={` pt-25 flex flex-col gap-5 items-center ${isSideBarOpen ? "min-w-16" : "min-w-64"} h-[calc(100vh-5rem)]`}>
        <nav className="w-full flex flex-col gap-5">
            {menu.map((item) => (
                <NavLink 
                key={item.label} 
                to={item.path} 
                className={({ isActive }) => 
                    `flex item-center gap-3 px-5 py-2 rounded 
                    hover:bg-blue-100 
                    ${isActive ? "text-blue-700 font-semibold bg-blue-200" : ""}`
                }>
                <span>{item.icon}</span>
                {!isSideBarOpen && <span>{item.label}</span>}
                </NavLink>
            ))}
        </nav>
    </aside>
  );
}
