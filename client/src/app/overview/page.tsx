"use client";
import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select, SelectChangeEvent } from "@mui/material";
import Title from "../../../components/Title";
import OverviewChart from "../../../components/OverviewChart";

// Define the view types
type ViewType = "sales" | "units";

const Overview: React.FC = () => {
 const [view, setView] = useState<ViewType>("units");

 const handleViewChange = (e: SelectChangeEvent) => {
  setView(e.target.value as ViewType); // Type assertion to "sales" | "units"
 };

 return (
  <Box m="1.5rem 2.5rem">
   <Title title="OVERVIEW" subtitle="Overview of general revenue and profit" />
   <Box height="75vh">
    <FormControl sx={{ mt: "1rem" }}>
     <InputLabel>View</InputLabel>
     <Select value={view} label="View" onChange={handleViewChange}>
      <MenuItem value="sales">Sales</MenuItem>
      <MenuItem value="units">Units</MenuItem>
     </Select>
    </FormControl>
    <OverviewChart view={view} />
   </Box>
  </Box>
 );
};

export default Overview;
