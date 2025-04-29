import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
    const params = useParams();
    const courseId = params.courseId;
  return (
    <div>
      <div className="flex items-center gap-7">
        <Link to={`/admin/course/${courseId}/lecture`}>
          <Button variant={'outline'} className={'rounded-full'}>
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Update Lectures</h1>
      </div>
      <LectureTab/>
    </div>
  );
};

export default EditLecture;
