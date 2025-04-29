import { Button } from "@/components/ui/button";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [createCourse, { data, isError, isSuccess, error, isLoading }] =
    useCreateCourseMutation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const getCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    try {
      await createCourse({ title, category });
    } catch (err) {
      console.log(err);
      
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Created.");
      navigate("/admin/course");
    }
    if (isError) {
      toast.error(error?.message || "Something went wrong.");
      
    }
  }, [isSuccess,error,isError,data]);
  return (
    <div className="mx-5 md:mx-0">
      <h1 className="text-xl font-bold mb-1  md:w-auto">
        Let's Add course, add some basic course details for your new course
      </h1>
      <p className="mb-4 text-gray-600">
        The heading above guides you to provide essential information required
        to create a new course in the system.
      </p>
      <div className="space-y-4 w-[500px]">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className={'w-[280px] md:w-auto'}
          placeholder="Enter course title"
        />
        <Label>Category</Label>
        <Select onValueChange={getCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="nextJs">NextJs</SelectItem>
              <SelectItem value="dataScience">DataScience</SelectItem>
              <SelectItem value="frontend Development">
                Frontend Development
              </SelectItem>
              <SelectItem value="fullStack Development">
                FullStack Development
              </SelectItem>
              <SelectItem value="mernStack Development">
                MernStack Development
              </SelectItem>
              <SelectItem value="docker">Docker</SelectItem>
              <SelectItem value="backend Development">
                Backend Development
              </SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="mongoDb">MongoDb</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-4 mt-4">
          <Button variant={"outline"} onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Create Course"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
