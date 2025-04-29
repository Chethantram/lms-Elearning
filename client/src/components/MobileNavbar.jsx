import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DarkMode from "./DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export function MobileNavbar() {
  const [logoutUser, { data, isSuccess, isError }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
  };

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout Successfully");
      navigate("/login");
    }
    if (isError) {
      toast.error(data?.message || "Logout Failed");
    }
  }, [data, isSuccess, isError]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu
          size={"icon"}
          className=" bg-gray-300 dark:bg-secondary w-7 p-1.5 rounded-full h-7"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" flex justify-between items-center px-2 mt-10 text-xl font-bold">
            E-Learning <DarkMode />
          </SheetTitle>

          <nav className="px-2 mt-5 ">
            <ul className="flex flex-col gap-4 text-md font-normal">
              <Link to={"/my-learning"}>My learning</Link>
              <Link to={"/profile"}>Edit Profile</Link>
              <Link onClick={handleLogout}>Logout</Link>
            </ul>
          </nav>
          {user?.role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Link to={'/admin/dashboard'}><Button className={'w-full block'}  type="submit">DashBoard</Button></Link>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
