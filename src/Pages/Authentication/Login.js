import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Format from "./Format";
import auth from "../../firebase.init";
import useToken from "../../Hooks/useToken";
import ResetPasswordModal from "../../Components/ResetPasswordModal";

import { toast } from "react-toastify";

import { IoEyeOff, IoEye } from "react-icons/io5";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const [token] = useToken(user);
  const [resetModal, setResetModal] = useState(false);

  if (errors) {
    Object.values(errors).map((error) =>
      toast.error(error.message, {
        position: "bottom-center",
      })
    );
  }

  if (error) {
    toast.error(
      error.message
        .substring(22)
        .replace(/[()']+/g, "")
        .replace(/[-']+/g, " ")
        .charAt(0)
        .toUpperCase() +
        error.message
          .substring(22)
          .replace(/[()']+/g, "")
          .replace(/[-']+/g, " ")
          .slice(1),
      {
        position: "bottom-center",
      }
    );
  }

  if (token) {
    navigate("/dashboard");
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
  };

  const [type, setType] = useState("password");
  return (
    <>
      <Format
        heading="Login"
        slogan="Enter your account details"
        form={
          <form onSubmit={handleSubmit(onSubmit)} className="pt-14">
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                className="input border-b bg-white focus:outline-0 border-[#22283166] text-[#22283180] placeholder:text-[#22283180] border-0 rounded-none p-0 font-poppins h-8"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Enter your Email!",
                  },
                  pattern: {
                    value:
                      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
                    message: "Enter a valid Email!",
                  },
                })}
              />
            </div>
            <div className="form-control relative">
              <input
                type={type}
                placeholder="Password"
                className="input border-b bg-white focus:outline-0 border-[#22283166] text-[#22283180] placeholder:text-[#22283180] border-0 rounded-none p-0 font-poppins h-8 mt-5"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Enter your Password!",
                  },
                })}
              />
              <span className="flex justify-end items-end">
                <span className="absolute right-2">
                  <label className="swap text-[#22283180]">
                    <input type="checkbox" />
                    <IoEye
                      onClick={() => setType("text")}
                      className="swap-on fill-current w-6 h-6"
                    />
                    <IoEyeOff
                      onClick={() => setType("password")}
                      className="swap-off fill-current w-6 h-6"
                    />
                  </label>
                </span>
              </span>

              <label
                htmlFor="reset-modal"
                onClick={() => setResetModal(true)}
                className="link link-hover mt-7 font-poppins text-[#22283180]"
              >
                Forgot password?
              </label>
            </div>
            <div className="form-control mt-10">
              <input
                className="btn rounded-xl font-poppins text-base font-normal btn-primary disabled:bg-[#be2719b3] disabled:pointer-events-auto disabled:cursor-no-drop disabled:hover:bg-[#be2719b3] disabled:text-[#f8d7d1] disabled:hover:text-[#f8d7d1]"
                type="submit"
                value="Login"
                disabled={loading}
              />
            </div>
          </form>
        }
        footer={
          <div className="flex items-center gap-8 justify-center pt-12">
            <span className="text-[#22283180] font-poppins">
              Don’t have an account?
            </span>
            <Link
              to="/sign-up"
              className="btn font-poppins text-base font-normal btn-primary px-6"
            >
              Sign up
            </Link>
          </div>
        }
      />
      {resetModal && <ResetPasswordModal setResetModal={setResetModal} />}
    </>
  );
};

export default Login;
