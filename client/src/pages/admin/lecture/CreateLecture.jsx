import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetLectureByCourseQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = React.useState("");
  const [createLecture, { data, isLoading, isSuccess, isError, error}] =
    useCreateLectureMutation();
  const { data: getLectureData, isLoading: getLectureLoading,refetch } =
    useGetLectureByCourseQuery(courseId, {
      refetchOnMountOrArgChange: true,
    });
  const createLectureHandler = async (e) => {
    e.preventDefault();

    await createLecture({ lectureTitle, courseId });
    setLectureTitle("");
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Lecture created successfully");
    }
    if (isError) {
      toast.error(error?.data?.message || "Lecture creation failed");
    }
  }, [isSuccess, isError, data, error]);

  return (
    <div className="w-full mx-5">
      <h1 className="text-xl font-bold mb-1">
        Let's Add Lecture, add some basic lecture details for your new course
      </h1>
      <p className="mb-4 text-gray-600">
        The heading above guides you to provide essential information required
        to create a new lecture in the system.
      </p>
      <div className="space-y-4 w-[500px] lg:w-full">
        <Label>Title</Label>
        <Input
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          type="text"
          placeholder="Enter course title"
        />

        <div className="flex gap-4 mt-4">
          <Button
            variant={"outline"}
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={createLectureHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
      </div>
      <div className="mt-10">
        {getLectureLoading ? (
          <>
            <p className="text-md font-medium">Lecture Loading....</p>
          </>
        ) : getLectureData?.lectures?.length === 0 ? (
          <>
            <p>No lecture Available</p>
          </>
        ) : (
          getLectureData?.lectures?.map((lecture,index) => {
            return <Lecture key={lecture._id} lecture={lecture} index={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
