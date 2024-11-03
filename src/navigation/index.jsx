import React from "react";
import  { Sidebar } from "./sidebar";
import { useLocation } from 'react-router-dom';
import  SidebarItem  from "./sidebarItem";
import { LayoutDashboard, MapPinPlus, Earth } from "lucide-react";

export default function Index(){
  const location = useLocation();

  return(
    <Sidebar>
      <SidebarItem icon={<LayoutDashboard size={20} />} text={"Dashboard"} link={"/"} active={location.pathname === "/"}/>
      <SidebarItem icon={<Earth size={20}/>} text={"Globe"} link={"/globe"} active={location.pathname === "/globe"}/>
      <SidebarItem icon={<MapPinPlus size={20} />} text={"Country"} link={"/country"} active={location?.pathname?.startsWith("/country")}/>
    </Sidebar>
  )
}