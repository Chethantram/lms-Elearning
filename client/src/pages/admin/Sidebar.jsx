import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=' flex mt-14 md:mt-16  '>
        <div className='w-[18%] md:w-[21%] lg:w-[25%] bg-[#f0f0f0] dark:bg-background  pt-12 border-gray-500 border-2 min-h-screen'><Link to={"/admin/dashboard"} className='flex items-center gap-2 p-4 hover:bg-gray-200 hover:dark:bg-secondary'>
            <ChartNoAxesColumn className='size-4'/>
            <h3 className='hidden md:block'>DashBoard</h3>
        </Link>
        <Link to={"/admin/course"} className='flex items-center gap-2 p-4 hover:bg-gray-200 hover:dark:bg-secondary'>
            <SquareLibrary className='size-4'/>
            <h3 className='hidden md:block'>Courses</h3>
        </Link></div>
        <div className='w-[82%] md:w-[79%] lg:w-[75%] mx-3 md:mx-10 lg:mx-20 mt-10'><Outlet/></div>
    </div>
  )
}

export default Sidebar