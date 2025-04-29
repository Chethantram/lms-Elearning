import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "./ui/skeleton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
import { useSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const { data, isLoading } = useSearchCourseQuery({
    searchQuery: query,
    categories: categories,
    sortByPrice: sortByPrice,
  });
  const handleFilterChange = (categories, sortByPrice) => {
    setCategories(categories);
    setSortByPrice(sortByPrice);
  };

  const isEmpty = !isLoading && data?.courses?.length === 0;
  return (
    <div className="mt-20 mx-5 md:mx-20 lg:mx-40">
      <div className="">
        <h1>result for {query}</h1>
        <p>
          Showing Result for <span className="text-blue-600">{query}</span>
        </p>
      </div>
      <div className="lg:flex mt-10 justify-between w-full gap-10">
        <Filter handleFilterChange={handleFilterChange} className="lg:w-1/5" />
        <div className="lg:w-4/5">
          {isLoading ? (
            [1, 2, 3].map((_, idx) => <CourseSkeleton />)
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => <SearchResult course={course} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/course/search?query" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};
