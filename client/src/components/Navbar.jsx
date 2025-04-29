import { School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "./DarkMode";
import { MobileNavbar } from "./MobileNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [logoutUser,{data,isSuccess,isError}] = useLogoutUserMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout Successfully");
      navigate('/login');
    }
    if (isError) {
      toast.error(data?.message || "Logout Failed");
    }
  }, [data,isSuccess,isError])
  const {user} = useSelector((state) => state.auth);

  
  return (
    <div className="w-full  bg-white px-5 md:px-20 lg:px-40 dark:bg-background border-b p-3 dark:border-b-gray-800 fixed top-0 right-0 left-0 z-10">
      {/* Desktop */}
      <div className="flex justify-between items-center ">
        {/* Logo */}
       <Link to={'/'}><div className="flex items-center gap-3">
          <School />
          <h2 className="text-xl hidden md:block font-bold">E-learning</h2>
        </div></Link> 
        {/* userIcon and light and dark icon */}
        <div className="hidden md:flex items-center gap-7">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-9">
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="Logo" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to={'/my-learning'}>My learning</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to={'/profile'}>Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
                
                {
                  user.role === "instructor" && (
                    <><DropdownMenuSeparator />
                    <DropdownMenuItem><Link to={'/admin/dashboard'}>Dashboard</Link></DropdownMenuItem></>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-3">
              <Button onClick={()=>navigate('/login')} variant={"outline"}>Login</Button>
              <Button onClick={()=>navigate('/login')}>SignUp</Button>
            </div>
          )}
          <DarkMode />

        </div>
          {/* Mobile */}
          <div className="md:hidden">
            <MobileNavbar />
          </div>
      </div>
    </div>
  );
};

export default Navbar;
