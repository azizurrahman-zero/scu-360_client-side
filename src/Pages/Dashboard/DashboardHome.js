import React from "react";
import { format } from "date-fns";

// Image
import banner from "../../Assets/dashboard-banner.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const DashboardHome = () => {
  const [user] = useAuthState(auth);
  const date = format(new Date(), "MMMM dd, yyyy");
  return (
    <div>
      <div
        style={{
          background: "linear-gradient(99deg, #BE2619 53.12%, #DFCFF7 155.43%)",
        }}
        className="rounded-3xl drop-shadow-2xl px-10 pt-8 mt-6 flex"
      >
        <div className="w-6/12 flex flex-col pb-8 justify-between">
          <p className="text-[#FFFFFFBF] font-poppins">{date}</p>
          <div>
            <h3 className="text-white font-poppins font-semibold text-3xl">
              Welcome back, {user?.displayName.split(" ")[0]}!
            </h3>
            <p className="text-[#FFFFFFBF] font-poppins text-lg">
              Always stay updated with SCU 360
            </p>
          </div>
        </div>
        <div className="w-6/12">
          <img src={banner} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
