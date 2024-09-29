import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use the environment variable for the base URL
const baseUrl = "https://back-end-dashboard.vercel.app"; // Fallback if the env variable is not set
console.log(baseUrl);

export const api = createApi({
 baseQuery: fetchBaseQuery({ baseUrl }), // Dynamically use the baseUrl from the environment variable
 reducerPath: "adminApi",
 tagTypes: [
  "User",
  "products",
  "customers",
  "Transactions",
  "geography",
  "sales",
  "admins",
  "performance",
  "dashboard",
 ],
 endpoints: (builder) => ({
  getUser: builder.query({
   query: (id) => `general/user/${id}`,
   providesTags: ["User"],
  }),
  getProducts: builder.query({
   query: () => "client/products",
   providesTags: ["products"],
  }),
  getCustomers: builder.query({
   query: () => "client/customers",
   providesTags: ["customers"],
  }),
  getTransactions: builder.query({
   query: ({ page, pageSize, sort, search }) => ({
    url: "client/transactions",
    method: "GET",
    params: { page, pageSize, sort, search },
   }),
   providesTags: ["Transactions"],
  }),
  getGeography: builder.query({
   query: () => "client/geography",
   providesTags: ["geography"],
  }),
  getSales: builder.query({
   query: () => "sales/sales",
   providesTags: ["sales"],
  }),
  getAdmins: builder.query({
   query: () => "management/admins",
   providesTags: ["admins"],
  }),
  getPerformance: builder.query({
   query: (id) => `management/performance/${id}`,
   providesTags: ["performance"],
  }),
  getDashboard: builder.query({
   query: () => `general/Dashboard`,
   providesTags: ["dashboard"],
  }),
 }),
});

export const {
 useGetUserQuery,
 useGetProductsQuery,
 useGetCustomersQuery,
 useGetTransactionsQuery,
 useGetGeographyQuery,
 useGetSalesQuery,
 useGetAdminsQuery,
 useGetPerformanceQuery,
 useGetDashboardQuery,
} = api;
