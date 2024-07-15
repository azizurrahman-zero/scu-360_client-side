import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

import logo from "../../Assets/Icons/logo_full.svg";

import {
  MdSpaceDashboard,
  MdLibraryBooks,
  MdAddToPhotos,
} from "react-icons/md";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { TbFaceId } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";
import DashboardNavBar from "../../Components/DashboardNavBar";
import useUserData from "../../Hooks/useUserData";
import Loader from "../../Components/Loader";
import { UserContext } from "../../Context/UserContext";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const { userData, isLoading, refetch } = useUserData(user);
  const { uploading } = useContext(UserContext);
  const [signOut] = useSignOut(auth);

  if (loading || isLoading || uploading) {
    return <Loader />;
  }

  const menus = [
    {
      link: "/dashboard",
      icon: MdSpaceDashboard,
      text: "Dashboard",
    },
    {
      link: "/dashboard/courses",
      icon: MdLibraryBooks,
      text: "Courses",
    },
    {
      link: "/dashboard/notice",
      icon: HiChatBubbleBottomCenterText,
      text: "Notice",
    },
  ];

  if (userData?.role === "0") {
    menus.splice(4, 0, {
      link: "/dashboard/face-id",
      icon: TbFaceId,
      text: "Face Id",
    });
  }
  if (userData?.role === "1") {
    menus.splice(1, 0, {
      link: "/dashboard/add-course",
      icon: MdAddToPhotos,
      text: "Add Course",
    });
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mt-4 mx-8">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <DashboardNavBar user={user} userData={userData} />
        {/*{pathname.includes(`dashboard/${"*"}`) && <DashboardNavBar />} */}
        <Outlet context={[user, auth, userData, isLoading, refetch]} />
      </div>
      <div
        className="drawer-side m-4 mr-0 h-[calc(100vh-2rem)] rounded-3xl "
        style={{
          background:
            "linear-gradient(0deg, #be2619 80.26%, rgba(146, 95, 226, 0) 143.39%, #be2619 143.39%)",
        }}
      >
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-white drop-shadow-2xl w-36 h-36 mx-auto mt-10 rounded-2xl">
          <Link
            to="/"
            className="btn p-4 hover:bg-transparent btn-ghost flex items-center h-auto"
          >
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="menu mt-5 grid gap-4 p-4 w-56">
          {menus.map((menu, i) => (
            <li key={i}>
              <Link to={menu?.link}>
                <menu.icon className="text-2xl text-white" />
                <span className="font-poppins text-white font-semibold text-base mt-0.5">
                  {menu.text}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link onClick={() => signOut()}>
              <FaSignOutAlt className="text-2xl text-white" />
              <span className="font-poppins text-white font-semibold text-base mt-0.5">
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
