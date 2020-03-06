import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="App-header">
      <nav className="p-3">
        <div className="nav-wrapper">
          <ul className="left">
            <li>
              <NavLink
                activeClassName="nav-active"
                className="m-r2"
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-active" to="/addRecipe">
                Add Recipe
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
