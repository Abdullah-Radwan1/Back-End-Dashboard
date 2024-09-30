"use client";
import { Box, useTheme } from "@mui/material";
import React from "react";
import Title from "../../../components/Title";
import { useGetGeographyQuery } from "../../../redux/API/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import geoData from "../../../utils/geoData";
import Loading from "../loading";

const Page = () => {
 const { data, isLoading } = useGetGeographyQuery(undefined);
 const theme = useTheme();

 // Log geoData to verify structure

 return (
  <Box m="1.5rem 2.5rem">
   <Title title="GEOGRAPHY" subtitle="Find where your users are located." />
   <Box
    mt="40px"
    height="75vh"
    border={`1px solid ${theme.palette.primary.main}`}
    borderRadius="4px"
    sx={
     { backgroundColor: theme.palette.background.default } // Adjust background color dynamically
    }
   >
    {isLoading ? (
     <Loading />
    ) : geoData && geoData.features ? (
     <ResponsiveChoropleth
      data={data}
      theme={{
       axis: {
        domain: {
         line: {
          stroke: theme.palette.text.primary, // Use primary text color for axis lines
         },
        },
        legend: {
         text: {
          fill: theme.palette.text.primary, // Use primary text color for legends
         },
        },
        ticks: {
         line: {
          stroke: theme.palette.text.primary, // Use primary text color for tick lines
          strokeWidth: 1,
         },
         text: {
          fill: theme.palette.text.primary, // Use primary text color for tick text
         },
        },
       },
       legends: {
        text: {
         fill: theme.palette.text.primary, // Use primary text color for legends
        },
       },
       tooltip: {
        container: {
         backgroundColor: theme.palette.background.paper, // Use paper background color for tooltips
         color: theme.palette.text.primary, // Use primary text color for tooltips
        },
       },
      }}
      features={geoData.features} // Ensure geoData.features exists
      margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
      domain={[0, 60]}
      label="properties.name"
      valueFormat=".2s"
      projectionScale={150}
      projectionTranslation={[0.45, 0.6]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.3}
      borderColor={theme.palette.primary.main} // Adjust map border color dynamically
      legends={[
       {
        anchor: "bottom-right",
        direction: "column",
        justify: true,
        translateX: 0,
        translateY: -125,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
         {
          on: "hover",
          style: {
           itemOpacity: 1,
          },
         },
        ],
       },
      ]}
     />
    ) : (
     <>No data available</>
    )}
   </Box>
  </Box>
 );
};

export default Page;
