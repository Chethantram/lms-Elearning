import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const Filter = ({ handleFilterChange }) => {
  const categories = [
    { id: "frontend development", label: "Frontend Development" },
    { id: "dataScience", label: "Data Science" },
    { id: "fullstack development", label: "Fullstack Development" },
    { id: "mernstack development", label: "MERN Stack Development" },
    { id: "backend development", label: "Backend Development" },
    { id: "java", label: "Java" },
    { id: "python", label: "Python" },
    { id: "docker", label: "Docker" },
    { id: "mongodb", label: "MongoDB" },
    { id: "html", label: "HTML" },
    { id: "nextJs", label: "Next.js" },
  ];

  const [category, setCategory] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCheckChange = (categoryId) => {
    setCategory((prevCategory) => {
      const newCategory = prevCategory.includes(categoryId)
        ? prevCategory.filter((id) => id !== categoryId)   // remove it if already selected
        : [...prevCategory, categoryId];   // add it if not already selected
        handleFilterChange(newCategory,sortByPrice);
        return newCategory;
    });
  };

  const handleSortByPrice = (selectedValue) =>{
    setSortByPrice(selectedValue);
    handleFilterChange(category,selectedValue);
  }
  return (
    <div className="">
      <div className="flex items-center gap-5 ">
        <h1>Filter by option</h1>
        <Select onValueChange={handleSortByPrice}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by prices</SelectLabel>
              <SelectItem value="low">low to high</SelectItem>
              <SelectItem value="high">High to low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className={"my-5"} />

      <div>
        <h1 className="text-xl font-bold">CATEGORY</h1>
        <div>
          {categories.map((category) => (
            <div className="flex items-center my-2 space-x-3">
              <Checkbox
                id={category.id}
                className={"border-2 border-gray-700"}
                onCheckedChange={() => handleCheckChange(category.id)}
              />
              <Label
                className={
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                }
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
