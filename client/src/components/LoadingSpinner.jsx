import { LoaderIcon } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <LoaderIcon className="animate-spin text-blue-600 dark:text-white w-12 h-12 mb-4" />
      <p className="text-blue-600 text-lg dark:text-white font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
