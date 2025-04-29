import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseTable = () => {
      const navigate = useNavigate();
      const {data,isLoading} = useGetCreatorCourseQuery({},{refetchOnMountOrArgChange:true});
      if (isLoading) {
        return <div className='flex justify-center items-center h-screen'><h1 className='text-2xl font-bold'>Loading...</h1></div>
      }
      
  return (
    <div>
        <Button onClick={()=>navigate('/admin/course/create')}>Create a Course</Button>
        <Table className="mt-4  overflow-x-hidden scroll-m-0">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-start">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.courses.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course?.coursePrice  || "NA"}</TableCell>
            <TableCell><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
            <TableCell>{course.title}</TableCell>
            <Button className={'mt-2'} variant={'ghost'} size={"30"} onClick={()=>navigate(`${course._id}`)}><Edit/></Button>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  )
}

export default CourseTable