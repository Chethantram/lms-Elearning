import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL = "http://localhost:5000/api/course/";

const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_course","Refetch_lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ title, category }) => ({
        url: "create",
        method: "POST",
        body: { category, title },
      }),
      invalidatesTags: ["Refetch_course"],
    }),
    searchCourse: builder.query({
      query:({searchQuery,categories,sortByPrice})=>{
          let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

          //if categories 
          if (categories && categories.length > 0) {
            const categoryString = categories.map(encodeURIComponent);
            queryString += `&categories=${categoryString}`;
          }

          //if sortByPrice 

          if (sortByPrice) {
            queryString+= `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
          }
          return{
            url:queryString,
            method:"GET"
          }

      }
    }),
    getPublishedCourse: builder.query({
      query: () => ({
        url: "published-course",
        method: "GET",
      }),
      providesTags: ["Refetch_course"],
    }),
    removeCourse: builder.mutation({
      query: ({courseId}) => ({
        url: "remove-course",
        method: "DELETE",
        body:{courseId}
      }),
      
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "get",
        method: "GET",
      }),
      providesTags: ["Refetch_course"],
    }),
    updateCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `update-course/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `get-course/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_course"],
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      providesTags:["Refetch_lecture"]
    }),
    getLectureByCourse: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
    }),
    editLecture: builder.mutation({
      query: ({courseId,lectureId,lectureTitle, isPreview, videoInfo}) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body:{lectureTitle, isPreview, videoInfo}
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags:["Refetch_lecture"]
    }),
    getLecture: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({courseId,query}) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useSearchCourseQuery,
  useGetPublishedCourseQuery,
  useRemoveCourseMutation,
  useGetCreatorCourseQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetLectureByCourseQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureQuery,
  usePublishCourseMutation,
} = courseApi;
export { courseApi };
