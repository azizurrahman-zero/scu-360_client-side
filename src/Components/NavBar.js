import React from "react";
import { Link } from "react-router-dom";

import logo from "../Assets/Icons/logo.png";

const NavBar = () => {
  return (
    <div className="w-[1024px] m-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  className="text-[#0C0C0C] hover:text-[#0C0C0C] font-roboto font-medium"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#0C0C0C] hover:text-[#0C0C0C] font-roboto font-medium"
                  to={{
                    pathname: "https://global.scu.edu.cn/oso/article/index/5",
                  }}
                  target="_blank"
                >
                  Admission
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#0C0C0C] hover:text-[#0C0C0C] font-roboto font-medium"
                  to="/events"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn p-0 hover:bg-transparent btn-ghost text-xl flex items-center h-auto gap-1.5"
          >
            <img className="w-10" src={logo} alt="logo" />
            <span className="font-bebas text-6xl text-accent pt-2">360</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                className="text-[#0C0C0C] hover:text-[#0C0C0C] font-roboto font-medium"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-[#0C0C0C] hover:text-[#0C0C0C] font-roboto font-medium"
                to={{
                  pathname: "https://global.scu.edu.cn/oso/article/index/5",
                }}
                target="_blank"
              >
                Admission
              </Link>
            </li>
            <li>
              <Link
                className="text-[#0C0C0C] hover:text-[#0C0C0C] font-roboto font-medium"
                to="/events"
              >
                Events
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to="/login"
            className="btn rounded-lg hover:!text-[#f8d7d1] !text-white font-poppins font-medium bg-[#BE2619] hover:bg-[#AD2317] px-8"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
