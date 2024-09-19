"use client ";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const StatBox = ({
 title,
 value,
 increase,
 icon,
 description,
}: {
 title: string;
 value: string;
 increase: string;
 icon: React.ReactNode;
 description: string;
}) => {
 const theme = useTheme();
 return (
  <Box
   gridColumn="span 2"
   gridRow="span 1"
   display="flex"
   flexDirection="column"
   justifyContent="space-between"
   p="1.25rem 1rem"
   flex="1 1 100%"
   sx={{ backgroundColor: theme.palette.background.paper }}
   borderRadius="0.55rem"
  >
   <div className="flex justify-between">
    <Typography variant="h6" sx={{ color: theme.palette.secondary.dark }}>
     {title}
    </Typography>
    {icon}
   </div>

   <Typography variant="h3" fontWeight="600" sx={{ color: theme.palette.secondary.dark }}>
    {value}
   </Typography>
   <div className="flex justify-between gap-2">
    <Typography variant="h5" fontStyle="italic" sx={{ color: theme.palette.secondary.light }}>
     {increase}
    </Typography>
    <Typography sx={{ color: theme.palette.secondary.dark }}>{description}</Typography>
   </div>
  </Box>
 );
};

export default StatBox;
