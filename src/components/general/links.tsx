import React from "react";
import { Link } from "react-router-dom";
import { HOME } from "../app/routes";

export const HomeButton = () => (
  <Link className="fixed-top nav-link" to={HOME}>
    Home
  </Link>
);
