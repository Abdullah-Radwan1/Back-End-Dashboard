"use client";
import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetPerformanceQuery } from "../../../redux/API/api";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../redux/store";
import Title from "../../../components/Title";

const Performance = () => {
 const userId = useSelector((state: Rootstate) => state.modeSlice.userId);

 const { data, isLoading } = useGetPerformanceQuery(userId);
 console.log(data);
 const columns = [
  {
   field: "_id",
   headerName: "ID",
   flex: 1,
  },
  {
   field: "userId",
   headerName: "User ID",
   flex: 1,
  },
  {
   field: "createdAt",
   headerName: "CreatedAt",
   flex: 1,
  },
  {
   field: "products",
   headerName: "# of Products",
   flex: 0.5,
   sortable: false,
   renderCell: (params: any) => params.value.length,
  },
  {
   field: "cost",
   headerName: "Cost",
   flex: 1,
   renderCell: (params: any) => `$${Number(params.value).toFixed(2)}`,
  },
 ];
 const theme = useTheme();
 return (
  <Box m="1.5rem 2.5rem">
   <Title title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance Here" />
   <Box>
    <DataGrid
     loading={isLoading || !data}
     getRowId={(row) => row._id}
     rows={(data && data.sales) || []}
     columns={columns}
     // components={{
     //   ColumnMenu: CustomColumnMenu,
     // }}
    />
   </Box>
  </Box>
 );
};

export default Performance;
