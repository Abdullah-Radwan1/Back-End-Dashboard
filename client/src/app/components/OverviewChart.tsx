"use client";
import React, { useMemo } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useTheme } from "next-themes";
import { useGetSalesQuery } from "../../../redux/API/api";
import { Loader } from "lucide-react";

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
  const { theme } = useTheme();
  const { data, isLoading } = useGetSalesQuery(undefined);

  const isDark = theme === "dark";

  const lineColor = isDark ? "#ffffff" : "#1f1f1f";
  const textColor = isDark ? "#ffffff" : "#1f1f1f";
  const bgColor = isDark ? "#000000" : "#ececec";
  const pointColor = isDark ? "#1f1f1f" : "#ffffff";

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [[], []];

    const { monthlyData }: { monthlyData: SalesData[] } = data;

    const totalSalesLine: LineData = {
      id: "totalSales",
      color: lineColor,
      data: [],
    };

    const totalUnitsLine: LineData = {
      id: "totalUnits",
      color: lineColor,
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
  }, [data, lineColor]);

  if (!data || isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="w-6 h-6  animate-spin " />
      </div>
    );

  return (
    //@ts-ignore
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      areaOpacity={0.1} // Adjust transparency (0.1 = 10% opacity)
      fill={[
        {
          match: "*", // Applies to all series
          id: "gradient", // Uses the defs gradient (if defined)
        },
      ]}
      defs={[
        {
          id: "gradient",
          type: "linearGradient",
          colors: [
            { offset: 0, color: isDark ? "#6366f1" : "#6366f1" }, // Start color (indigo)
            { offset: 100, color: isDark ? "#A020F0" : "#ffffff00" }, // End color (transparent)
          ],
        },
      ]}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: textColor,
            },
          },
          legend: {
            text: {
              fill: textColor,
            },
          },
          ticks: {
            line: {
              stroke: textColor,
              strokeWidth: 1,
            },
            text: {
              fill: textColor,
            },
          },
        },
        legends: {
          text: {
            fill: textColor,
          },
        },
        tooltip: {
          container: {
            color: textColor,
            background: bgColor,
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
      pointColor={pointColor}
      pointBorderWidth={2}
      pointBorderColor={lineColor}
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
                symbolBorderColor: "rgba(255, 255, 255, 0.5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "#ececec",
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
