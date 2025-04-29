import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ index, lecture }) => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-2 my-2 bg-gray-100 dark:bg-secondary rounded-md">
      <h1 className="text-md font-semibold">Lecture {index+1} : {lecture.lectureTitle}</h1>
      <Edit onClick={()=>navigate(`${lecture._id}`)} className="size-5 text-black dark:text-white"/>
    </div>
  );
};

export default Lecture;
