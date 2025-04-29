import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { isLoading,data,isSuccess,isError,error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession({courseId});
  };
  

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      }
      else{
        toast.error("invalid response");
      }
    }
    if (isError) {
      toast.error(error?.data?.message ||"Failed to get checkout");
    }
  }, [data,isSuccess,isError,error])
  return (
    <div className="w-full">
      <Button onClick={purchaseCourseHandler} disabled={isLoading} className={"w-full"}>{
        isLoading?<><Loader2 className="mr-2 w-4 h-4"/>Please Wait</>:<>Purchase Course</>
        }</Button>
    </div>
  );
};

export default BuyCourseButton;
