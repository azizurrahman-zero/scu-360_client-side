import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../firebase.init";

import { toast } from "react-toastify";

const AddCourseForm = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (errors) {
    Object.values(errors).map((error) =>
      toast.error(error.message, {
        position: "bottom-center",
      })
    );
  }

  const onSubmit = (data) => {
    data.lecturer = user?.email;
    fetch("http://localhost:5000/add-course", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("Adding course failed!", {
            position: "bottom-center",
          });
        }
        return res.json();
      })
      .then(() => {
        toast.success("Course added Successfully!", {
          position: "bottom-center",
        });
      })
      .catch(() => {
        toast.error("Adding course failed!", {
          position: "bottom-center",
        });
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Course Name"
          className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8"
          {...register("courseName", {
            required: {
              value: true,
              message: "Enter Course Name!",
            },
            minLength: {
              value: 3,
              message: "Enter more than 3 character in Course Name!",
            },
          })}
        />
      </div>
      <div className="form-control">
        <input
          type="number"
          onWheel={(e) => e.target.blur()}
          placeholder="Course Code"
          className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8 mt-5"
          {...register("courseCode", {
            required: {
              value: true,
              message: "Enter Course Code!",
            },
            minLength: {
              value: 3,
              message: "Enter a valid Course Code!",
            },
            pattern: {
              value: /^[0-9\b]+$/,
              message: "Enter a valid Course Code!",
            },
          })}
        />
      </div>
      <div className="form-control">
        <input
          type="number"
          onWheel={(e) => e.target.blur()}
          placeholder="Course Session"
          className="input border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8 mt-5"
          {...register("courseSession", {
            required: {
              value: true,
              message: "Enter Course Session!",
            },
            minLength: {
              value: 4,
              message: "Enter a valid Course Session!",
            },
            pattern: {
              value: /^[0-9\b]+$/,
              message: "Enter a valid Course Session!",
            },
          })}
        />
      </div>
      <div className="form-control mt-10">
        <input
          className="btn rounded-xl font-poppins text-base font-normal btn-primary disabled:bg-primary-100 disabled:pointer-events-auto disabled:cursor-no-drop disabled:hover:bg-primary-100 disabled:text-disable-100 disabled:hover:text-disable-100"
          type="submit"
          value="Add Course"
          // disabled={loading}
        />
      </div>
    </form>
  );
};

export default AddCourseForm;
