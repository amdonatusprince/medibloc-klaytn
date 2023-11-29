import React from "react";
import "../css/styles.css";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";


const DashboardLayout = () => {
  return (
    <div className="app_container">
      <SideBar />
      <section>
        <Navbar />
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
