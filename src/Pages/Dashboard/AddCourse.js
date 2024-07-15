import React from "react";

import banner from "../../Assets/add-course-banner.png";
import AddCourseForm from "../../Components/AddCourseForm";

const AddCourse = () => {
  return (
    <div className="hero mt-6">
      <div className="hero-content w-full gap-20 max-w-none flex-col-reverse lg:flex-row-reverse p-0">
        <div className="w-6/12 bg-white shadow-2xl rounded-2xl p-6">
          <AddCourseForm />
        </div>
        <div className="card w-6/12">
          <img src={banner} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
