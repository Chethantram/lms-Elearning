import React from "react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="p-5 border border-black shadow-2xl rounded-md my-5">
      <Link to={`/course-details/${course._id}`}>
        <div className="md:flex justify-between  items-center gap-5">
          <div className="lg:flex items-center gap-6 space-y-3">
            <img
              className="w-[350px] h-[200px] object-cover rounded-md"
              src={course.courseThumbnail}
              alt=""
            /><div>
            <h2 className="text-lg font-semibold">{course?.title}</h2>
            <h5 className="text-gray-700 font-medium text-md ">
              {course?.subtitle}
            </h5>
            <p className="my-2">
              <b>Instructor</b> : {course?.creator[0].name}
            </p>
            <Badge className={'mb-2'}>{course?.courseLevel}</Badge>
          </div>
          </div>
          
          <div className="">
            <h1 className="text-xl font-bold pr-10">₹{course.coursePrice}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
