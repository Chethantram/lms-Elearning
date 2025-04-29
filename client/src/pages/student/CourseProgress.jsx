import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useGetCourseProgressQuery,
  useMarkAsCompleteMutation,
  useMarkAsInCompleteMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle2, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const { courseId } = params;
  const [currentLecture, setCurrentLecture] = useState(null);

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress, {}] = useUpdateLectureProgressMutation();
  const [
    markAsComplete,
    { data: markAsCompleteData, isSuccess: markAsCompleteSuccess },
  ] = useMarkAsCompleteMutation();
  const [
    markAsInComplete,
    { data: markAsInCompleteData, isSuccess: markAsInCompleteSuccess },
  ] = useMarkAsInCompleteMutation();

  if (isLoading) {
    <p>Loading...</p>;
  }
  if (isError) {
    <p>Failed to fetch the data</p>;
  }

  const courseDetails = data?.data?.courseDetails;
  const completed = data?.data?.completed;

  const progress = data?.data?.progress;

  const initialLecture =
    currentLecture || (courseDetails?.lectures && courseDetails?.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleUpdateLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = async (lecture) => {
    setCurrentLecture(lecture);
    handleUpdateLectureProgress({ courseId, lectureId: lecture._id });
  };

  const handleCompleteProgress = async () => {
    await markAsComplete(courseId);
  };

  const handleInCompleteProgress = async () => {
    await markAsInComplete(courseId);
  };

  useEffect(() => {
    if (markAsCompleteSuccess) {
      refetch();
      toast.success(markAsCompleteData?.message);
    }
    if (markAsInCompleteSuccess) {
      refetch();
      toast.success(markAsInCompleteData?.message);
    }
  }, [
    markAsCompleteData,
    markAsCompleteSuccess,
    markAsInCompleteData,
    markAsInCompleteSuccess,
  ]);

  return (
    <div className="mt-24 mx-5 md:mx-20 lg:mx-52">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{courseDetails?.title}</h2>
        <Button
          variant={completed ? "outline" : "default"}
          onClick={
            completed ? handleInCompleteProgress : handleCompleteProgress
          }
        >
          {completed ? (
            <div className="flex gap-3 items-center">
              <CheckCircle2 />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>
      <div className="lg:flex justify-between  my-5 gap-10 ">
        <div className="flex flex-col my-3 md:my-0 gap-2 justify-center lg:w-3/5 shadow-md rounded-md p-5 border">
          <video
            className="w-full h-auto"
            src={currentLecture?.videoUrl || initialLecture?.videoUrl}
            controls={true}
            onPlay={() =>
              handleUpdateLectureProgress(
                currentLecture?._id || initialLecture._id
              )
            }
          />
          <h1 className="shadow-md rounded-md p-3 border text-lg mt-4 font-semibold">
            {`Lecture ${
              courseDetails?.lectures.findIndex(
                (lec) =>
                  lec._id === (currentLecture?._id || initialLecture?._id)
              ) + 1
            } : ${
              currentLecture?.lectureTitle || initialLecture?.lectureTitle
            }`}
          </h1>
        </div>
        <div className="flex flex-col gap-3 lg:w-2/5 shadow-xl rounded-xl p-5 border">
          <h4 className="text-xl font-bold">Course Lectures</h4>
          <div>
            {courseDetails?.lectures?.map((lecture, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between mt-2 shadow-md rounded-md p-3 border ${
                  lecture?._id === currentLecture?._id
                    ? "bg-gray-200 dark:bg-secondary"
                    : ""
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <div className="flex items-center gap-3">
                  <h5>
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 className="size-4 text-green-600" />
                    ) : (
                      <PlayCircle className="size-4" />
                    )}
                  </h5>
                  <p className="text-lg font-semibold">
                    Lecture {idx + 1} : {lecture?.lectureTitle}
                  </p>
                </div>
                <div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className={"text-white bg-green-600"}
                    >
                      Completed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
