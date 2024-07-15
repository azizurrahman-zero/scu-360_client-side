import React, { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/UserContext";
import Loader from "../../Components/Loader";

import { toast } from "react-toastify";

const Profile = () => {
  const [user, auth, userData, isLoading, refetch] = useOutletContext();
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const { setChangedData } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    const setDefaultValues = (fields) => {
      fields.forEach((field) => {
        setValue(field, userData[field] || "");
      });
    };
    if (!isLoading && userData) {
      setDefaultValues(["firstName", "lastName", "idNumber"]);
    }
  }, [isLoading, userData, setValue]);

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

  if (updating) {
    return <Loader />;
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imageStorageKey = "397851d6cd61b243461cdf4717c2905e";
    if (!file) {
      toast.error("No file selected!", { position: "bottom-center" });
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageStorageKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        const imageUrl = data.data.url;
        await updateProfile({ photoURL: imageUrl });
        setChangedData({ updating });
        toast.success("Profile photo Changed!", {
          position: "bottom-center",
        });
      } else {
        toast.error("Failed to Upload!", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error("Failed to Upload!", {
        position: "bottom-center",
      });
    }
  };

  const onSubmit = (data) => {
    const userId = userData?._id;
    const url = `http://localhost:5000/update-user-data?id=${userId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        authorization: localStorage.getItem("accessToken"),
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        refetch();
        toast.success("Updated successfully!", {
          position: "bottom-center",
        });
      })
      .catch(() => {
        toast.error("Failed to Update!", {
          position: "bottom-center",
        });
      });
  };
  return (
    <div className="mt-6 flex gap-11 bg-white rounded-2xl shadow-2xl p-10">
      <div className="flex flex-col items-center">
        <div
          className={
            "avatar w-72 h-72 rounded-full ring-4 ring-primary ring-offset-base-100"
          }
        >
          {user?.photoURL ? (
            <img className="rounded-full" src={user?.photoURL} alt="User" />
          ) : (
            <p className="flex justify-center items-center text-9xl font-poppins font-bold h-full w-full">
              <p>{userData?.firstName[0]}</p>
            </p>
          )}
        </div>
        <div className="aspect-auto mt-[-3.2rem] z-10">
          <label
            className="cursor-pointer font-roboto text-base font-semibold text-primary bg-white px-4 py-1 rounded"
            htmlFor="files"
          >
            Change
          </label>
          <input
            className="invisible absolute"
            type="file"
            id="files"
            onChange={handleImageChange}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              className="input disabled:bg-transparent border-b bg-white focus:outline-0 border-black-200 text-black-100 placeholder:text-black-100 border-0 rounded-none p-0 font-poppins h-8"
              value={user?.email}
              disabled
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
          <div className="form-control mt-10">
            <input
              className="btn rounded-xl font-poppins text-base font-normal btn-primary disabled:bg-primary-100 disabled:pointer-events-auto disabled:cursor-no-drop disabled:hover:bg-primary-100 disabled:text-disable-100 disabled:hover:text-disable-100"
              type="submit"
              value="Update"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
