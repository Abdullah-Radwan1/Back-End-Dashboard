import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log(process.env.REACT_APP_BASE_URL);
export const api = createApi({
 baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
 reducerPath: "adminApi",
 tagTypes: ["User", "products", "customers", "Transactions", "geography", "sales"],
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
 }),
});

export const {
 useGetUserQuery,
 useGetProductsQuery,
 useGetCustomersQuery,
 useGetTransactionsQuery,
 useGetGeographyQuery,
 useGetSalesQuery,
} = api;
