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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_URL = 'http://localhost:5000/api/media';

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState({});
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [editLecture,{data,isError,isSuccess,isLoading,error}] = useEditLectureMutation();
  const params = useParams();
  const {courseId,lectureId} = params;
  const [removeLecture,{data:removeLectureData,isLoading:removeLectureLoading,isSuccess:removeLectureSuccess,isError:removeLectureError,error:removeError}] = useRemoveLectureMutation();
  const {data:lectureData,refetch} = useGetLectureQuery(lectureId);
  const lecture = lectureData?.lecture;

  

  const onEditLectureHandler=async()=>{
    await editLecture({
      courseId,lectureId,lectureTitle:title, isPreview:isFree, videoInfo:uploadVideoInfo
    })
  }

  const onRemoveLectureHandler = async()=>{
    await removeLecture(lectureId);
  }


  const onFileChangeHandler = async(e)=>{
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file",file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_URL}/upload-video`,formData,{
          onUploadProgress:({loaded,total})=>{
            setUploadProgress(Math.round(loaded*100/total));
          }
        });
        if (res.data.success) {
          setUploadVideoInfo({videoUrl:res.data.data.url,publicId:res.data.data.public_id});
          setBtnDisabled(true);
          toast.success(res.data.message)
        }

      } catch (error) {
        console.log(error);
        toast.error("video upload failed");
        
      }
      finally{
        setMediaProgress(false);
      }
    }
  }

  

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Lecture updated successfully")
    }
   
    if (isError) {
      toast.error(error.data.message || "Failed to update");
    }
    
  }, [isSuccess,isError,data,error]);

  useEffect(() => {
    if (removeLectureSuccess) {
      toast.success(removeLectureData.message || "Lecture removed successfully")
    }
    if (removeLectureError) {
      toast.error(removeError.data.message || "Failed to delete");
    }
  }, [removeLectureData,removeLectureError,removeLectureSuccess,removeError]);

  useEffect(() => {
    if (lecture) {
      refetch();
      setTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreview);
      setUploadVideoInfo(lecture.videoUrl);
    }
  }, [lectureData])
  return (
    <Card className={"mt-5"}>
      <CardHeader>
        <CardTitle>Edit Lecture</CardTitle>
        <CardDescription>
          Make changes and click save when you have done.
        </CardDescription>
        <div>
          <Button disabled={removeLectureLoading} onClick={onRemoveLectureHandler} variant={"destructive"}>{removeLectureLoading?<><Loader2 className="mr-2 w-4 h-4 animate-spin"/>Please Wait</>:<>Remove Lecture</>}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input  value={title} onChange={(e)=>setTitle(e.target.value)} id="name" placeholder="Name of your project" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">
              Video <span className="text-red-500">*</span>
            </Label>
            <Input type={"file"} onChange={onFileChangeHandler} id="name" placeholder="Name of your project" />
          </div>
          <div className="flex items-center space-x-3">
            <Switch checked={isFree} onCheckedChange={setIsFree}  id="preview" />
            <Label htmlFor="preview">Is Preview?</Label>
          </div>
          {
            mediaProgress && (
              <div className="mt-5">
                <Progress value={uploadProgress}/>
                <p>{uploadProgress}% uploaded</p>
              </div>
            )
          }
          <div className="space-y-4">
          <Button disabled={isLoading} onClick={onEditLectureHandler}>{isLoading?<><Loader2 className="mr-2 w-4 h-4 animate-spin"/>Please Wait</>:<>Update Lecture</>}</Button></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
