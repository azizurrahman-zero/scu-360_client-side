import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../firebase.init";

import { toast } from "react-toastify";

import { IoClose } from "react-icons/io5";

const ResetPasswordModal = ({ setResetModal }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  if (errors) {
    Object.values(errors).map((error) =>
      toast.error(error.message, {
        position: "bottom-center",
      })
    );
  }

  const onReset = async (data) => {
    const { email } = data;
    await sendPasswordResetEmail(email);
    toast.success("Reset link sent to your Email!", {
      position: "bottom-center",
    });
  };
  return (
    <>
      <input type="checkbox" id="reset-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <div className="flex justify-between">
            <div>
              <h3 className="font-poppins text-4xl font-bold text-[#222831]">
                Reset Password
              </h3>
              <h6 className="text-[#000000B2] font-poppins font-medium pt-3">
                Enter your registered email
              </h6>
            </div>
            <label
              onClick={() => setResetModal(false)}
              className="btn btn-sm btn-primary btn-circle text-2xl"
            >
              <IoClose />
            </label>
          </div>
          <form onSubmit={handleSubmit(onReset)} className="pt-10">
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
            <div className="form-control mt-6">
              <input
                className="btn rounded-xl font-poppins text-base font-normal btn-primary disabled:bg-primary-100 disabled:pointer-events-auto disabled:cursor-no-drop disabled:hover:bg-primary-100 disabled:text-disable-100 disabled:hover:text-disable-100"
                type="submit"
                value="Reset"
                disabled={sending}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordModal;
