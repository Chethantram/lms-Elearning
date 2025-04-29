import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course,user }) => {
  return (
        <Link to={`course-details/${course?._id}`}>
    <Card className="pt-0 overflow-hidden rounded-lg dark:bg-secondary bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            className="object-cover mx-auto h-36 w-full   rounded-t-lg"
            src={course?.courseThumbnail}
            alt="course"
          />
        </div>
        <div className="px-4 space-y-3">
          <h2 className="font-md text-md truncate hover:underline">
            {course?.title}
          </h2>
          <div className="flex justify-between items-center ">
            <div className="flex gap-2 items-center ">
              <Avatar className="size-8">
                <AvatarImage
                  src={
                    user?.photoUrl ||
                    course?.creator[0]?.photoUrl ||
                    "https://github.com/shadcn.png"
                  }
                  alt="Logo"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2 className="text-md font-medium">{course?.creator[0]?.name || user?.name}</h2>
            </div>
            <div>
              <Badge>{course?.courseLevel}</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">₹{course?.coursePrice}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Course;
