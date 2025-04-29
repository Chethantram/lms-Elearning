import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';

const Courses = () => {

  const {data,isLoading,error,refetch} = useGetPublishedCourseQuery();

  if (error) {
    <h1>Some error while fetching</h1>
  }

  
  
  return (
    <div className='py-20 mx-5 md:mx-20 lg:mx-40'>
        <div className='text-center'>
            <h2 className='text-2xl font-bold'>Our Courses</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   mt-10'>
            {
                isLoading?Array.from({length:8}).map((_,index)=>(

                    <CourseSkeleton key={index}/>
                )
                ) :data?.courses && data?.courses.map((course,index)=>( <Course course={course} key={index}/>)) 
            }
        </div>
    </div>
  )
}

export default Courses;

const CourseSkeleton = () => {
    return (
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
        <Skeleton className="w-full h-36" />
        <div className="px-5 py-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );
  };