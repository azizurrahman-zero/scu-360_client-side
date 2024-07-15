import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useCourses from "../../Hooks/useCourses";

import { toast } from "react-toastify";

import { RiFileCopyFill } from "react-icons/ri";

const Courses = () => {
  const [user, , userData, ,] = useOutletContext();
  const { courses } = useCourses(user);
  const [tooltipText, setTooltipText] = useState("Click to Copy!");

  const handleCopy = async (id) => {
    try {
      await navigator.clipboard.writeText(
        `I am inviting you to the Course. Join with the Id: ${id}`
      );
      setTooltipText("Copied!");
      toast.success("Share the Id with students now!", {
        position: "bottom-center",
      });
      setTimeout(() => setTooltipText("Click to Copy!"), 2000);
    } catch (err) {
      toast.error("Failed to Copy!", { position: "bottom-center" });
    }
  };

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="table bg-white rounded-xl">
          <thead>
            <tr className="border-white-100 *:text-black-500 font-roboto *:font-bold *:text-base *:p-3.5">
              <th></th>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Session</th>
              {userData?.role === "0" && <th>Lecturer</th>}
              <th>Joining Id</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course, index) => (
              <tr
                key={course._id}
                className="hover border-white-100 *:text-black-600 font-roboto *:text-[15px]"
              >
                <th className="p-3.5 text-center">{index + 1}</th>
                <td className="p-3.5">{course.courseName}</td>
                <td className="p-3.5">{course.courseCode}</td>
                <td className="p-3.5">{course.courseSession}</td>
                {userData?.role === "0" && <td>{course.lecturer}</td>}
                <td className="p-3.5">
                  {course._id.slice(0, 5) + "***** "}
                  <div
                    className="tooltip tooltip-primary tooltip-right"
                    data-tip={tooltipText}
                    onClick={() => handleCopy(course._id)}
                  >
                    <RiFileCopyFill />
                  </div>
                </td>
                <td className="p-0 text-right pr-3.5">
                  <button className="btn btn-primary btn-outline font-roboto rounded-full px-5 py-[1px] text-base font-medium min-h-0 h-auto mr-2">
                    Details
                  </button>
                  {userData?.role === "0" ? (
                    <button className="btn btn-primary font-roboto rounded-full px-5 py-[1px] text-base font-medium min-h-0 h-auto">
                      Leave
                    </button>
                  ) : (
                    <button className="btn btn-primary font-roboto rounded-full px-5 py-[1px] text-base font-medium min-h-0 h-auto">
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
