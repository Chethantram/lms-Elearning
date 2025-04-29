import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
  useUpdateCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { act, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [updateCourse, { data, isError, isSuccess, error, isLoading }] =
    useUpdateCourseMutation();
  const params = useParams();
  const courseId = params.courseId;

  const {
    data: getByCourseId,
    isLoading: getByCourseLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    coursePrice: "",
    courseLevel: "",
    courseThumbnail: "",
  });
  const selectCategory = (value) => {
    setInput((prev) => ({ ...prev, category: value }));
  };
  const selectLevel = (value) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  const [publishCourse] = usePublishCourseMutation();

  const [
    removeCourse,
    {
      data: removeCourseData,
      error: removeCourseError,
      isSuccess: removeCourseSuccess,
      isError: removeCourseIsError,
      isLoading: removeCourseLoading,
    },
  ] = useRemoveCourseMutation();

  const removeCourseHandler = async () => {
    await removeCourse({ courseId });
  };

  useEffect(() => {
    if (removeCourseSuccess) {
      navigate("/admin/course");
      toast.success(removeCourseData?.message || "Course removed successfully");
    }
    if (removeCourseIsError) {
      toast.success(removeCourseError?.data?.message || "Error");
    }
  }, [
    removeCourseData,
    removeCourseError,
    removeCourseIsError,
    removeCourseSuccess,
  ]);
  useEffect(() => {
    if (getByCourseId?.course) {
      const course = getByCourseId.course;
      setInput({
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [getByCourseId]);

  const onFileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("subtitle", input.subtitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await updateCourse({ formData, courseId });
  };

  const publishCourseHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("course publish or Unpublish is failed");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
    }
    if (isError) {
      toast.error(error?.data?.message || "Course update failed");
    }
  }, [data, isError, isSuccess, error]);

  if (getByCourseLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-xl font-bold">Loading....</p>
      </div>
    );
  }
  return (
    <div className="">
      <Card className={"w-full overflow-x-scroll"}>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Edit your Course details</CardTitle>
            <CardDescription>make sure after published</CardDescription>
          </div>
          <div className="md:space-x-2 flex flex-col gap-3 md:block ">
            <Button
              disabled={getByCourseId?.course.lectures.length === 0}
              variant={"outline"}
              onClick={() =>
                publishCourseHandler(
                  getByCourseId?.course.isPublished ? "false" : "true"
                )
              }
            >
              {getByCourseId?.course.isPublished ? "Unpublish:" : "Publish"}
            </Button>
            <Button disabled={isLoading} onClick={removeCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Remove Course"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Title</Label>
            <Input
              onChange={onChangeHandler}
              name="title"
              value={input.title}
              placeholder="ex : Fullstack Developer"
              type={"text"}
            />
            <Label>Subtitle</Label>
            <Input
              onChange={onChangeHandler}
              name="subtitle"
              value={input.subtitle}
              placeholder="ex : Fullstack Developer"
              type={"text"}
            />
            <Label>Description</Label>
            <Input
              onChange={onChangeHandler}
              name="description"
              value={input.description}
              placeholder="ex : Fullstack Developer"
              type={"text"}
            />

            <div className=" flex flex-col md:flex gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={selectCategory}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="nextJs">NextJs</SelectItem>
                      <SelectItem value="dataScience">DataScience</SelectItem>
                      <SelectItem value="frontend development">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="fullStack development">
                        FullStack Development
                      </SelectItem>
                      <SelectItem value="mernStack development">
                        MernStack Development
                      </SelectItem>
                      <SelectItem value="docker">Docker</SelectItem>
                      <SelectItem value="backend development">
                        Backend Development
                      </SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="mongoDb">MongoDb</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>CourseLevel</Label>
                <Select onValueChange={selectLevel}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="select Course Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>CourseLevel</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Course Price</Label>
                <Input
                  onChange={onChangeHandler}
                  name="coursePrice"
                  value={input.coursePrice}
                  placeholder="ex : 999"
                  type={"number"}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Course Thumbnail</Label>
              <Input
                onChange={onFileChangeHandler}
                type={"file"}
                accept="image/*"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-52 h-32 object-cover mt-2"
                />
              )}
            </div>
            <div className="space-x-4">
              <Button
                variant={"outline"}
                onClick={() => navigate("/admin/course")}
              >
                Cancel
              </Button>
              <Button onClick={(e) => onSubmitHandler(e)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
