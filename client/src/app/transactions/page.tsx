"use client";
import React, { useState } from "react";
import Title from "../../../components/Title";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../../redux/API/api";
import { transColumns } from "../../../utils/utils";
import { Box, useTheme } from "@mui/material";
const Page = () => {
 const theme = useTheme();
 const [page, setPage] = useState(0);
 const [pageSize, setPageSize] = useState(20);
 const [sort, setSort] = useState({});
 const [search, setSearch] = useState("");

 // Fetch transactions with the updated parameters
 const { data, isLoading } = useGetTransactionsQuery({
  page,
  pageSize,
  sort: JSON.stringify(sort),
  search,
 });

 return (
  <div className="container mx-auto">
   <Title title="TRANSACTIONS" subtitle="Entire list of transactions" />

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
    {/* Pass the custom toolbar to the DataGrid */}
    <DataGrid
     loading={isLoading || !data}
     getRowId={(row) => row._id}
     rows={data?.transactions || []}
     columns={transColumns}
     rowCount={data?.total || 0}
     //@ts-ignore
     rowsPerPageOptions={[20, 50, 100]}
     pagination
     page={page}
     pageSize={pageSize}
     paginationMode="server"
     sortingMode="server"
     onPageChange={(newPage: number) => setPage(newPage)}
     onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
     onSortModelChange={(newSortModel) => {
      if (newSortModel.length > 0) {
       const { field, sort } = newSortModel[0];
       setSort({ field, sort });
      } else {
       setSort({});
      }
     }}
    />
   </Box>
  </div>
 );
};

export default Page;
