"use client";
import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
 GridToolbarDensitySelector,
 GridToolbarContainer,
 GridToolbarExport,
 GridToolbarColumnsButton,
} from "@mui/x-data-grid";

const DataGridCustomToolbar = ({
 searchInput,
 setSearchInput,
 setSearch,
}: {
 searchInput: string;
 setSearchInput: Function;
 setSearch: Function;
}) => {
 return (
  <GridToolbarContainer>
   <div className="w-full flex justify-between">
    <div className="flex justify-between">
     <GridToolbarColumnsButton />
     <GridToolbarDensitySelector />
     <GridToolbarExport />
    </div>
    <TextField
     label="Search..."
     sx={{ mb: "0.5rem", width: "15rem" }}
     onChange={(e) => setSearchInput(e.target.value)}
     value={searchInput}
     variant="standard"
     InputProps={{
      endAdornment: (
       <InputAdornment position="end">
        <IconButton
         onClick={() => {
          setSearch(searchInput);
          setSearchInput("");
         }}
        >
         <Search />
        </IconButton>
       </InputAdornment>
      ),
     }}
    />
   </div>
  </GridToolbarContainer>
 );
};

export default DataGridCustomToolbar;
