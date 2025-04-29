import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, PlayCircle, Lock } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const params = useParams();
  const { courseId } = params;
  const {data,isLoading,isError} = useGetCourseDetailsWithStatusQuery(courseId);  
  const course = data?.course;
  const purchased = data?.purchased;
  const navigate = useNavigate();

  const continueCourseHandler = ()=>{
    if (purchased) {
      navigate(`/course-progress/${courseId}`)
    }
  }
  
  

  if (isLoading) {
    <h2>Loading....</h2>
  }
  if (isError) {
    <h2>Error while fetching</h2>
  }
  

  return (
    <div className="my-20 min-h-screen">
      <div className="bg-gray-800 w-full px-5 md:px-20 lg:px-52 text-white py-5 space-y-1">
        <h2 className="text-3xl font-bold w-3/4">{course?.title}</h2>
        <h5 className="text-lg font-normal">{course?.subtitle}</h5>
        <p className="text-md font-semibold space-x-2">
          Created by
          <span className="text-blue-500 underline italic">{course?.creator[0]?.name}</span>
        </p>
        <div className="flex gap-2 items-center">
          <BadgeInfo className="size-4" />
          <p className="font-semibold">
            Last updated <span className="font-mono">{course?.createdAt.split("T")[0]}</span>
          </p>
        </div>
        <p className="font-medium">Student Enrolled {course?.enrolledStudents.length}</p>
      </div>
      <div className="flex items-center flex-col px-5 gap-5 md:px-20 lg:px-52 w-full justify-between  lg:flex-row mt-10">
        <div className="lg:w-[60%] space-y-8">
          <h2 className="text-xl font-bold">Description</h2>
          <p className="text-md font-sans" dangerouslySetInnerHTML={{__html:course?.description}}>
           
          </p>
          <Card className={'lg:w-[75%]'}>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Lecture {course?.lectures.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {course?.lectures.map((lecture, idx) => (
                  <div key={idx} className="flex items-center gap-3 mt-2">
                    <h5>
                      {lecture?.isPreview ? (
                        <PlayCircle className="size-4" />
                      ) : (
                        <Lock className="size-4" />
                      )}
                    </h5>
                    <p>{lecture?.lectureTitle}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-[40%] h-full mt-5 md:mt-0  ">
          <Card className={"p-4"}>
            <CardContent>
              <div className="w-full aspect-video my-3">
                <ReactPlayer height={"100%"} width={"100%"} controls={true} url={course?.lectures[0]?.videoUrl}/>
              </div>
              <h1 className="text-md font-semibold">1 . {course?.lectures[0]?.lectureTitle}</h1>
              <Separator className="my-2" />
              <p className="text-xl font-bold">Price</p>
            </CardContent>
            <CardFooter>
              {data?.purchased ? (
                <Button onClick={continueCourseHandler} className={"w-full"}>Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
