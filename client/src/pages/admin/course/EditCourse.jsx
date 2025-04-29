import React from "react";
import CourseTab from "./CourseTab";
import { useNavigate } from "react-router-dom";

const EditCourse = () => {
  const navigate = useNavigate();
  return (
    <div className="lg:pr-20">
      <div className="flex justify-between items-center">
        <h1 className="text-md md:text-xl font-bold ">
          Add Details of Regarding Course
        </h1>
        <p
          onClick={() => navigate("lecture")}
          className="hover:text-blue-500 hover:underline"
        >
          Go to Lecture Page
        </p>
      </div>
      <div className="mt-5">
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;
