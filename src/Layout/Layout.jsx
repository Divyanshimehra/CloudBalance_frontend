import { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function Layout(){
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    return (
    <div className="h-screen flex flex-col">
      <NavBar toggleSidebar={() => setSideBarOpen(!isSideBarOpen)}/>
      <div className="flex flex-1">
        <SideBar isSideBarOpen={isSideBarOpen} />
        <main className="flex-1 bg-gray-100">
          <Outlet/>
        </main>
      </div>
    </div>
    )
}