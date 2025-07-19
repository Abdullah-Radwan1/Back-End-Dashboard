import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use the environment variable for the base URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Fallback if the env variable is not set

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include", // ✅ Send cookies for sessions
  }), // Dynamically use the baseUrl from the environment variable
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "products",
    "customers",
    "Transactions",
    "geography",
    "sales",
    "customers",
    "performance",
    "dashboard",
  ],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { username, password },
      }),
    }),
    register: builder.mutation({
      query: ({ username, password }) => ({
        url: "auth/register",
        method: "POST",
        body: { username, password },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    getProducts: builder.query({
      query: () => "client/products",
      providesTags: ["products"],
    }),

    getTransactions: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    getSales: builder.query({
      query: () => "sales/sales",
      providesTags: ["sales"],
    }),
    getCustomers: builder.query({
      query: () => "management/customers",
      providesTags: ["customers"],
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
  useGetProductsQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetCustomersQuery,
  useGetPerformanceQuery,
  useGetDashboardQuery,
  useLoginMutation,
  useRegisterMutation,
} = api;
