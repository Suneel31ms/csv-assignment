import React from "react";
import { NavLink } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  
  return (
    <div className="navbar">
      <div>
        <NavLink to="/">
          <img src="s_logo.png" alt="logo" />
        </NavLink>
      </div>
      <div className="navlinks">
        {/* { username ? 
   <div>
        <li>
      <NavLink to="/odi">Odi</NavLink>
    </li>
    <li>
      <NavLink to="/batting">Batting</NavLink>
    </li>
    <li>
      <NavLink to="/fielding">Fielding</NavLink>
    </li>
   </div>
    :
    <div>
      <li>
        <NavLink to="/signin">SignIn</NavLink>
      </li>
       <li>
       <NavLink to="/login">LogIn</NavLink>
     </li>
    </div>
    }*/}

        <li>
          <NavLink to="/odi">Odi</NavLink>
        </li>
        <li>
          <NavLink to="/batting">Batting</NavLink>
        </li>
        <li>
          <NavLink to="/fielding">Fielding</NavLink>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
