import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) =>{
    e.preventDefault();
    if (searchText.trim() !== "") {
      navigate(`/course/search?query=${searchText}`);
    }

  }
  return (
    <div className=" bg-gradient-to-r from-blue-500 to-indigo-500 w-full mt-20 md:mt-40 dark:from-background dark:to-secondary text-center px-5 md:px-20 py-10">
      <div className="mx-5 md:max-w-3xl md:mx-auto text-white">
        <h2 className="text-xl md:text-3xl font-bold">
          Discover the Best Courses for You
        </h2>

        <p className="text-md md:text-lg mt-2 text-gray-300">
          Learn, grow, and achieve your goals with our curated selection of
          courses.
        </p>
      </div>
      <form onSubmit={searchHandler} className="flex justify-center bg-white dark:bg-accent-foreground rounded-3xl  max-w-2xl mx-auto mt-10 ">
        <Input placeholder="Search here" value={searchText} onChange={(e)=>setSearchText(e.target.value)} type={"text"} className=" bg-white focus-visible:ring-0 outline-0 rounded-r-none px-6 text-black rounded-l-3xl shadow-lg "/>
        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-800 rounded-r-3xl rounded-l-none ">Search</Button>
      </form>

      <Button onClick = {()=>navigate(`/course/search?query`)} className="text-blue-600 mt-5 bg-white hover:bg-gray-200">Explore Course</Button>
    </div>
  );
};

export default HeroSection;
