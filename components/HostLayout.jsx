import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const HostLayout = () => {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <>
      {/* <nav className="host-nav">
        <Link to="/host">Dashboard</Link>
        <Link to="/host/income">Income</Link>
        <Link to="/host/reviews">Reviews</Link>
      </nav>
      <Outlet /> */}

      <nav className="host-nav">
        <NavLink
          to="."
          style={({ isActive }) => (isActive ? activeStyles : null)}
          end
        >
          Dashboard
        </NavLink>

        {/* <NavLink
          to="/host"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          end
        >
          Dashboard
        </NavLink> */}

        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Income
        </NavLink>

        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Vans
        </NavLink>

        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default HostLayout;
