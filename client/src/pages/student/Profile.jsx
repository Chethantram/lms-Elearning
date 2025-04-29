import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const { data, isLoading,refetch } = useLoadUserQuery();
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserLoading, error, isError, isSuccess },
  ] = useUpdateUserMutation();

  // Ensure hooks are not conditionally rendered
  const user = data && data?.user; // Provide a default value for `user`
  
  

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photoUrl", photoUrl);
    await updateUser(formData);
  };

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoUrl(file);
    }
  };

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile.");
    }
  }, [isSuccess, isError, updateUserData, error]);

  if (isLoading) {
    return <h1>Profile Loading....</h1>;
  }

  return (
    <div className="py-20 mx-10 md:mx-20 lg:mx-72">
      <h1 className="text-2xl font-bold my-5">PROFILE</h1>
      <div className="md:flex md:items-center gap-7">
        <div>
          <Avatar className="size-32 mx-auto md:mx-0">
            <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} alt="Logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full mx-10  md:max-w-none md:mx-0 mt-7 md:mt-0">
          <p className="flex items-center mx-auto md:mx-0">
            <b>Name</b>
            <span className="text-md font-normal">: {user.name}</span>
          </p>
          <p className="flex items-center mx-auto md:mx-0">
            <b>Email</b>
            <span className="text-md font-normal">: {user.email}</span>
          </p>
          <p className="flex items-center mx-auto md:mx-0">
            <b>Role</b>
            <span className="text-md font-normal">: {user.role?.toUpperCase()}</span>
          </p>
          <Dialog className="mx-auto">
            <DialogTrigger asChild>
              <Button className={"mt-4 "} variant="outline">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name || user?.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="photo" className="text-right">
                     <span className="hidden md:block">Profile</span>Photo
                  </Label>
                  <Input
                    type={"file"}
                    accept="image/*"
                    onChange={onChangeHandler}
                    id="photo"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserLoading} onClick={updateUserHandler}>
                  {updateUserLoading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Please Wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl mt-10">Enrolled Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {user?.enrolledCourse?.length === 0 ? (
            <p>You haven't enrolled yet</p>
          ) : (
            user?.enrolledCourse.map((course) => <Course course={course} user={user} key={course._id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

