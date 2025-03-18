import React from 'react'
import "../Styles/SidebarButton.css"
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";

export default function SidebarButton(props) {
  return (
    <Link to={props.to}>
          <IconContext.Provider value ={{className: "Provider"}}>
          <div className='btnCont'>
              {props.icon}
              <p className='btntitle'>{props.title}</p>
            </div>
          </IconContext.Provider>
        
    </Link>
    
  )
}
