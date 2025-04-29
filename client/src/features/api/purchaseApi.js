import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_URL = "http://localhost:5000/api/purchase";

const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PURCHASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({courseId}) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: {courseId},
      }),
    }),
    getCourseDetailsWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getAllPurchasedCourse: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),

  }),
});

export const { useCreateCheckoutSessionMutation ,useGetAllPurchasedCourseQuery,useGetCourseDetailsWithStatusQuery} = purchaseApi;
export { purchaseApi };
