import React from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';



// let user = JSON.parse(localStorage.getItem(accesstoken));
// console.log(user);
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    let ask = window.confirm("Are You Sure Want to logout?");
    if(ask){
      console.log("Came")
      localStorage.removeItem("token");
      navigate("/")
    }
    
}

  // let user = JSON.parse (localStorage.getItem("token"));
  // console.log(user)
  return (
    <div className="navbar">
    <div className='wrapper'>
       <div className='heading'>Bookkeeping App</div>
       <div className='items'> 
       <div className='item'>
        <p className='welcomeText'>Welcome User!!</p>
       </div>

       <div className='item'>
       <FontAwesomeIcon  className="userIcon" icon={faUser}></FontAwesomeIcon> 
       
       <div className='arrow'>
       <FontAwesomeIcon   icon={faArrowRightFromBracket}></FontAwesomeIcon><button  onClick={handleLogout} className='logoutButton'>Logout</button>
       </div>
       </div>
       
       </div>
   
    </div>
    </div>
  )
}

export default Navbar