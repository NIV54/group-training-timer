import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NEW_TRAINING, HOME } from "../../app/routes";

type NavItem = typeof NEW_TRAINING | typeof HOME;

export const Navbar = () => {
  const location = useLocation();

  const [activeNavItem, setActiveNavItem] = useState<NavItem>("/");
  useEffect(() => {
    setActiveNavItem(location.pathname as NavItem);
  }, [location.pathname]);

  const isActive = (navItem: NavItem) => navItem === activeNavItem;

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={"nav-item"}>
            <Link
              className={`nav-link ${isActive(HOME) ? "active" : ""}`}
              to={HOME}
            >
              My Trainings
            </Link>
          </li>
          <li className={`nav-item ${isActive(NEW_TRAINING) ? "active" : ""}`}>
            <Link className="nav-link" to={NEW_TRAINING}>
              New Training
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
