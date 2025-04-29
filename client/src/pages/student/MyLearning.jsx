import React from 'react'
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';

const MyLearning = () => {
    const { data, isLoading,refetch } = useLoadUserQuery();
   const myLearning =data?.user?.enrolledCourse || [];
   const user = data?.user;
   
   
    
    const myLearningCourses = [];
  return (
    <div className='py-32 mx-10 md:mx-20 lg:mx-52'>
        <h2 className='text-2xl font-bold'>MyLearning</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-2'>
            {
                isLoading?<MyLearningSkeleton/>:myLearning.length === 0 ?<p>You are not enrolled any courses yet.</p>:(myLearning.map((course,index)=>(<Course course={course} user={user}/>)))
            }
        </div>
    </div>
  )
}

export default MyLearning;


// Skeleton component for loading state
const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );