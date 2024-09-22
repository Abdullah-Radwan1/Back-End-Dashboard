"use client";
import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Title from "../../../components/Title";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../../redux/API/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Daily: React.FC = () => {
 const [startDate, setStartDate] = useState<Date>(new Date("2021-02-01"));
 const [endDate, setEndDate] = useState<Date>(new Date("2021-03-01"));
 const { data } = useGetSalesQuery(undefined);
 const theme = useTheme();

 const [formattedData] = useMemo(() => {
  if (!data) return [];

  const { dailyData } = data;
  const totalSalesLine = {
   id: "totalSales",
   color: theme.palette.secondary.main,
   data: [] as { x: string; y: number }[],
  };
  const totalUnitsLine = {
   id: "totalUnits",
   color: theme.palette.primary.main,
   data: [] as { x: string; y: number }[],
  };

  dailyData.forEach(
   ({ date, totalSales, totalUnits }: { date: any; totalSales: number; totalUnits: number }) => {
    const dateFormatted = new Date(date);
    if (dateFormatted >= startDate && dateFormatted <= endDate) {
     const splitDate = date.substring(date.indexOf("-") + 1);

     totalSalesLine.data.push({ x: splitDate, y: totalSales });
     totalUnitsLine.data.push({ x: splitDate, y: totalUnits });
    }
   },
  );

  return [[totalSalesLine, totalUnitsLine]];
 }, [data, startDate, endDate, theme]);

 return (
  <Box m="1.5rem 2.5rem">
   <Title title="DAILY SALES" subtitle="Chart of daily sales" />
   <Box height="75vh">
    <Box display="flex" justifyContent="flex-end">
     <Box>
      <DatePicker
       selected={startDate}
       onChange={(date) => setStartDate(date as Date)}
       selectsStart
       startDate={startDate}
       endDate={endDate}
      />
     </Box>
     <Box>
      <DatePicker
       selected={endDate}
       onChange={(date) => setEndDate(date as Date)}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       minDate={startDate}
      />
     </Box>
    </Box>

    {data ? (
     //@ts-ignore
     <ResponsiveLine
      data={formattedData}
      theme={{
       axis: {
        domain: {
         line: {
          stroke: theme.palette.primary.main,
         },
        },
        legend: {
         text: {
          fill: theme.palette.primary.main,
         },
        },
        ticks: {
         line: {
          stroke: theme.palette.primary.main,
          strokeWidth: 1,
         },
         text: {
          fill: theme.palette.primary.main,
         },
        },
       },
       legends: {
        text: {
         fill: theme.palette.primary.main,
        },
       },
       tooltip: {
        container: {
         color: theme.palette.primary.main,
         backgroundColor: theme.palette.background.paper,
        },
       },
      }}
      margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
      yScale={{
       type: "linear",
       min: "auto",
       max: "auto",
       stacked: false,
       reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
       orient: "bottom",
       tickSize: 5,
       tickPadding: 5,
       tickRotation: 90,
       legend: "Month",
       legendOffset: 60,
       legendPosition: "middle",
      }}
      axisLeft={{
       orient: "left",
       tickSize: 5,
       tickPadding: 5,
       tickRotation: 0,
       legend: "Total",
       legendOffset: -50,
       legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      useMesh={true}
      legends={[
       {
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 50,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
         {
          on: "hover",
          style: {
           itemBackground: "rgba(0, 0, 0, .03)",
           itemOpacity: 1,
          },
         },
        ],
       },
      ]}
     />
    ) : (
     <>Loading...</>
    )}
   </Box>
  </Box>
 );
};

export default Daily;
