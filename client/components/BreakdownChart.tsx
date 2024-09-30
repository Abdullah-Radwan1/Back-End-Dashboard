"use client";
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "../redux/API/api";
import Loading from "@/app/loading";

const BreakdownChart = ({ isDashboard = false }) => {
 const { data, isLoading } = useGetSalesQuery(undefined);
 const theme = useTheme();

 if (!data || isLoading) return <Loading />;

 const colors = [
  theme.palette.warning.dark,
  theme.palette.secondary.dark,
  theme.palette.secondary.main,
  theme.palette.warning.light,
 ];
 const formattedData = Object.entries(data.salesByCategory).map(([category, sales], i) => ({
  id: category,
  label: category,
  value: sales,
  color: colors[i],
 }));

 return (
  <Box
   height={isDashboard ? "400px" : "100%"}
   width={undefined}
   minHeight={isDashboard ? "325px" : undefined}
   minWidth={isDashboard ? "325px" : undefined}
   position="relative"
  >
   <ResponsivePie
    data={formattedData}
    theme={{
     axis: {
      domain: {
       line: {
        stroke: theme.palette.secondary.dark, // Changed color for axis domain line
       },
      },
      legend: {
       text: {
        fill: theme.palette.secondary.main, // Changed legend text color
       },
      },
      ticks: {
       line: {
        stroke: theme.palette.secondary.dark, // Adjusted tick lines
        strokeWidth: 1,
       },
       text: {
        fill: theme.palette.secondary.main, // Adjusted tick text color
       },
      },
     },
     legends: {
      text: {
       fill: theme.palette.primary.light, // Adjusted legend text color
      },
     },
     tooltip: {
      container: {
       background: theme.palette.background.paper, // Tooltip background for contrast
       color: theme.palette.primary.main, // Tooltip text color
      },
     },
    }}
    colors={{ datum: "data.color" }} // Pie slices based on color in data
    margin={
     isDashboard
      ? { top: 40, right: 80, bottom: 100, left: 50 }
      : { top: 40, right: 80, bottom: 80, left: 80 }
    }
    sortByValue={true}
    innerRadius={0.45}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
     from: "color",
     modifiers: [["darker", 0.2]], // Darker borders
    }}
    enableArcLinkLabels={!isDashboard}
    arcLinkLabelsTextColor={theme.palette.secondary.main} // Arc link label color
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }} // Links match arc color
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
     from: "color",
     modifiers: [["darker", 2]], // Make arc label text much darker
    }}
    legends={[
     {
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: isDashboard ? 20 : 0,
      translateY: isDashboard ? 50 : 56,
      itemsSpacing: 0,
      itemWidth: 85,
      itemHeight: 18,
      itemTextColor: "#999", // Default item text color
      itemDirection: "left-to-right",
      itemOpacity: 1,
      symbolSize: 18,
      symbolShape: "circle",
      effects: [
       {
        on: "hover",
        style: {
         itemTextColor: theme.palette.primary.main, // Change text color on hover
        },
       },
      ],
     },
    ]}
   />

   <Box
    position="absolute"
    top="50%"
    left="50%"
    textAlign="center"
    sx={{
     transform: isDashboard ? "translate(-75%, -170%)" : "translate(-50%, -100%)",
     color: theme.palette.primary.main,
    }}
   >
    <Typography variant="h6">
     {!isDashboard && "Total:"} ${data.yearlySalesTotal}
    </Typography>
   </Box>
  </Box>
 );
};

export default BreakdownChart;
