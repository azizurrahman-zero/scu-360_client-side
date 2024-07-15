import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Format from "./Format";
import auth from "../../firebase.init";
import useToken from "../../Hooks/useToken";

import { IoEyeOff, IoEye } from "react-icons/io5";

import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [type, setType] = useState("password");
  const [token] = useToken(user);

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
    createUserWithEmailAndPassword(email, password).then(() => {
      delete data.password;
      fetch("http://localhost:5000/add-user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Sign Up Successful!", {
            position: "bottom-center",
          });
        })
        .catch(() => {
          toast.error("Sign Up Failed!", {
            position: "bottom-center",
          });
        });
    });
  };

  return (
    <Format
      heading="Sign Up"
      slogan="Enter your personal details"
      form={
        <form onSubmit={handleSubmit(onSubmit)} className="pt-14">
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8"
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
          <div className="form-control">
            <input
              type="text"
              placeholder="First Name"
              className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8 mt-5"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Enter your First Name!",
                },
                minLength: {
                  value: 3,
                  message: "Enter more than 3 character in First Name!",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Enter a valid First Name!",
                },
              })}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Last Name"
              className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8 mt-5"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Enter your Last Name!",
                },
                minLength: {
                  value: 3,
                  message: "Enter more than 3 character in Last Name!",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Enter a valid Last Name!",
                },
              })}
            />
          </div>
          <div className="w-full flex justify-between mt-5">
            <div className="w-1/2">
              <input
                type="radio"
                value="0"
                id="student"
                className="hidden peer"
                {...register("role", {
                  required: true,
                })}
                defaultChecked
              />
              <label
                className="text-black-100 w-full block font-poppins border-b border-b-black-200 pb-[3.5px] peer-checked:border-b-2"
                for="student"
              >
                Student
              </label>
            </div>
            <div className="w-1/2">
              <input
                type="radio"
                value="1"
                id="lecturer"
                className="hidden peer"
                {...register("role", {
                  required: true,
                })}
              />
              <label
                className="text-black-100 w-full block font-poppins border-b border-b-black-200 pb-[3.5px] peer-checked:border-b-2"
                for="lecturer"
              >
                Lecturer
              </label>
            </div>
          </div>
          <div className="form-control">
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder="Identity Number"
              className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8 mt-5"
              {...register("idNumber", {
                required: {
                  value: true,
                  message: "Enter your Identity Number!",
                },
                minLength: {
                  value: 13,
                  message: "Enter a valid Identity Number!",
                },
                pattern: {
                  value: /^[0-9\b]+$/,
                  message: "Enter a valid Identity Number!",
                },
              })}
            />
          </div>
          <div className="form-control relative">
            <input
              type={type}
              placeholder="Password"
              className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8 mt-5"
              {...register("password", {
                required: {
                  value: true,
                  message: "Enter a Password!",
                },
                minLength: {
                  value: 6,
                  message: "Enter more than 6 character in Password!",
                },
              })}
            />
            <span className="flex justify-end items-end">
              <span className="absolute right-2">
                <label className="swap text-black-100">
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
          </div>
          <div className="form-control mt-10">
            <input
              className="btn rounded-xl font-poppins text-base font-normal btn-primary disabled:bg-primary-100 disabled:pointer-events-auto disabled:cursor-no-drop disabled:hover:bg-primary-100 disabled:text-disable-100 disabled:hover:text-disable-100"
              type="submit"
              value="Sign up"
              disabled={loading}
            />
          </div>
        </form>
      }
      footer={
        <div className="flex items-center gap-8 justify-center pt-12">
          <span className="text-black-100 font-poppins">
            Don’t have an account?
          </span>
          <Link
            to="/login"
            className="btn font-poppins text-base font-normal btn-primary px-6"
          >
            Login
          </Link>
        </div>
      }
    />
  );
};

export default Signup;
