import React from "react";

const Format = ({ heading, slogan, form, footer }) => {
  return (
    <div
      className="hero min-h-screen bg-[url('/src/Assets/login-banner.png')]"
      style={{ placeItems: "unset" }}
    >
      <div className="hero-overlay"></div>
      <div className="">
        <div className="flex">
          <div className="w-5/12 bg-white">
            <div className="rounded-none w-10/12 min-h-screen bg-white card-body m-auto flex justify-center">
              <div>
                <h3 className="font-poppins text-5xl font-bold text-[#222831]">
                  {heading}
                </h3>
                <h6 className="text-[#000000B2] font-poppins font-medium pt-3">
                  {slogan}
                </h6>
                {form}
              </div>
              {footer}
            </div>
          </div>
          <div className="w-7/12 pt-20 pl-10">
            <h1 className="text-base-100 font-poppins font-normal text-6xl">
              <span className="font-bold">Welcome to</span>
              <br />
              student portal
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Format;
