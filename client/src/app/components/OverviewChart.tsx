"use client";
import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../../redux/API/api";
import Loading from "@/app/loading";

interface OverviewChartProps {
  isDashboard?: boolean;
  view: "sales" | "units";
}

interface SalesData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

interface LineData {
  id: string;
  color: string;
  data: { x: string; y: number }[];
}

const OverviewChart: React.FC<OverviewChartProps> = ({
  isDashboard = false,
  view,
}) => {
  const { data, isLoading } = useGetSalesQuery(undefined);

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [[], []];

    const { monthlyData }: { monthlyData: SalesData[] } = data;

    const totalSalesLine: LineData = {
      id: "totalSales",
      color: "#4f46e5", // indigo-600
      data: [],
    };

    const totalUnitsLine: LineData = {
      id: "totalUnits",
      color: "#4f46e5", // indigo-600
      data: [],
    };

    monthlyData.reduce(
      (
        acc: { sales: number; units: number },
        { month, totalSales, totalUnits }
      ) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data.push({ x: month, y: curSales });
        totalUnitsLine.data.push({ x: month, y: curUnits });

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]);

  if (!data || isLoading) return <Loading />;

  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#d1d5db", // gray-300
            },
          },
          legend: {
            text: {
              fill: "#6b7280", // gray-500
            },
          },
          ticks: {
            line: {
              stroke: "#d1d5db", // gray-300
              strokeWidth: 1,
            },
            text: {
              fill: "#6b7280", // gray-500
            },
          },
        },
        legends: {
          text: {
            fill: "#6b7280", // gray-500
          },
        },
        tooltip: {
          container: {
            background: "#f9fafb", // gray-50
            color: "#1f2937", // gray-800
            fontSize: 12,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => (isDashboard ? v.slice(0, 3) : v),
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
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
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
