//displaying different items in Sidebar based on Role

import { NavLink } from "react-router-dom";
import {ManageAccounts, DashboardCustomize, DisplaySettings } from "@mui/icons-material";

export default function SideBar({isSideBarOpen}) {
    
    const role = localStorage.getItem("role");
    const menuByRole = {
        admin: [
            {label:"Users", path:"/dashboard/users", icon:<ManageAccounts/>}, 
            {label:"Module Control Grid", path:"/dashboard/module-control-grid", icon:<DisplaySettings/>}, 
            {label:"Dashboard Control Grid", path:"/dashboard/dashboard-control-grid", icon:<DashboardCustomize/>}
        ],
        readonly: [
            {label:"Read Only Dashboard", path:"readonly-dashboard"}, 
            {label:"Users", path: "readonly-users"}, 
            {label:"Module Overview", path: "readonly-modules"}
        ],
        customer: [
            {label:"Customer Dashboard", path:"customer-dashboard"}, 
            {label:"View Reports", path:"view-reports"}, 
            {label:"Analytics", path:"analytics"}
            ],
    };
    
    const menu = menuByRole[role] || [];
    
    return (
    <aside className={`mt-5 flex flex-col gap-5 items-center ${isSideBarOpen ? "w-16" : "w-64"}`}>
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
