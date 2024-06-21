import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const FaceId = () => {
  const [activeTab1, setActiveTab1] = useState(true);
  const [activeTab2, setActiveTab2] = useState(false);



  return (
    <div>
      <div className="mt-7 w-5/12 m-auto">
        <div role="tablist" className="tabs tabs-boxed">
          <Link
            role="tab"
            className={`${
              activeTab1 && "tab-active !text-white"
            } tab font-poppins !text-accent font-medium`}
            to="/dashboard/face-id/"
            onClick={() => {
              setActiveTab1(true);
              setActiveTab2(false);
            }}
          >
            Upload Photo
          </Link>
          <Link
            role="tab"
            className={`${
              activeTab2 && "tab-active !text-white"
            } tab font-poppins !text-accent font-medium`}
            to="/dashboard/face-id/webcam"
            onClick={() => {
              setActiveTab2(true);
              setActiveTab1(false);
            }}
          >
            Webcam
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default FaceId;
