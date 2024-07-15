import React from "react";
import { Link } from "react-router-dom";

const DashboardNavBar = ({ user, userData }) => {
  return (
    <div className="navbar p-0">
      <div className="flex-1">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input rounded-3xl drop-shadow-2xl border-0 focus:border-0 focus:border-black-100 focus:outline-[2.5px] w-72 placeholder:text-right placeholder:pr-5 font-poppins text-black-300"
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/profile"
              className="avatar btn p-0 hover:bg-transparent btn-ghost h-auto"
            >
              <div
                className={
                  "w-14 rounded-full ring-4 ring-primary ring-offset-base-100"
                }
              >
                {user?.photoURL ? (
                  <img src={user?.photoURL} alt="User" />
                ) : (
                  <div className="flex justify-center items-center text-3xl font-poppins font-bold h-full">
                    <p>{userData?.firstName[0]}</p>
                  </div>
                )}
              </div>
            </Link>
            <div>
              <h3 className="font-poppins font-semibold">
                {userData?.firstName + " " + userData?.lastName}
              </h3>
              <p className="font-poppins text-black-300">
                {userData?.idNumber.substring(0, 4)} Batch
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
