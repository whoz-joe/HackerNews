import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return <div>
        <h1 className="header">Hacker News</h1>
        <div className="nav-link">
        <NavLink to="/" active>
          Top Stories
        </NavLink>
        <NavLink to="/search" >
          Search
        </NavLink>
      </div>
    </div>
} 