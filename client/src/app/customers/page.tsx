"use client";
import { Box, useTheme } from "@mui/material";
import React from "react";
import Title from "../../../components/Title";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCustomersQuery } from "../../../redux/API/api";
import { columns } from "../../../utils/utils";
const page = () => {
 const theme = useTheme();
 const { data, isLoading } = useGetCustomersQuery(undefined);

 return (
  <Box m="1.5rem 2.5rem">
   <Title title="CUSTOMERS" subtitle="List of Customers" />

   <Box
    mt="40px"
    height="75vh"
    sx={{
     borderRadius: "0.55rem",

     "& .MuiDataGrid-root": { border: "none" },
     "& .MuiDataGrid-cell": { borderBottom: "none" },
     "& .MuiDataGrid-columnHeaders": {
      borderBottom: "none",
     },
     "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme.palette.background.paper,
     },
     "& .MuiDataGrid-footerContainer": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      borderTop: "none",
     },
     "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${theme.palette.text.primary} `,
     },
    }}
   >
    <DataGrid
     loading={isLoading || !data}
     getRowId={(row) => row._id}
     rows={data || []}
     columns={columns}
    />
   </Box>
  </Box>
 );
};

export default page;
