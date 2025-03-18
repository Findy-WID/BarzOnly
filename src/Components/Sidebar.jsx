import React from 'react'
import profile from '../assets/profile.jpg'
import "../Styles/Sidebar.css"
import SidebarButton from './SidebarButton'
import { MdLibraryMusic } from "react-icons/md";
import { HiFire } from "react-icons/hi";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { PiSignOutLight } from "react-icons/pi";



export default function Sidebar() {
  return (
    <div className='sidebarCont'>
      <img src= {profile} alt="" />
      <div>
        <SidebarButton title = "library" to = "/library" icon = {<MdLibraryMusic />
} />
        <SidebarButton title = "player" to = "/player" icon = {<TbPlayerPlayFilled />} />
        <SidebarButton title = "trending" to = "/trending" icon = {<HiFire />
} />
      </div>
      <SidebarButton title = "sign out" to = "" icon = {<PiSignOutLight />} />
    </div>
  )
}
