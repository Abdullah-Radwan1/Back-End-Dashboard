"use client";
import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Title = ({ title, subtitle }: { title: string; subtitle: string }) => {
 const theme = useTheme();
 return (
  <Box>
   <Typography
    variant="h2"
    color={theme.palette.primary.light}
    fontWeight="bold"
    sx={{ mb: "5px" }}
   >
    {title}
   </Typography>
   <Typography variant="h5" color={theme.palette.info.light}>
    {subtitle}
   </Typography>
  </Box>
 );
};

export default Title;
