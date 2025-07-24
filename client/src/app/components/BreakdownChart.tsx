"use client";
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useGetSalesQuery } from "../../../redux/API/api";
import Loading from "@/app/Loading";

const BreakdownChart = ({ isDashboard = false }: { isDashboard?: boolean }) => {
  const { data, isLoading } = useGetSalesQuery(undefined);

  if (!data || isLoading) return <Loading />;

  const colors = ["#f59e0b", "#7c3aed", "#8b5cf6", "#fde68a"]; // Tailwind-like palette

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i % colors.length],
    })
  );

  return (
    <div
      className={`relative ${
        isDashboard ? "h-[400px] min-h-[325px] min-w-[325px]" : "h-full"
      }`}
    >
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Sales By Category
      </h2>

      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#e5e7eb",
              },
            },
            legend: {
              text: {
                fill: "#9ca3af",
              },
            },
            ticks: {
              line: {
                stroke: "#d1d5db",
                strokeWidth: 1,
              },
              text: {
                fill: "#9ca3af",
              },
            },
          },
          legends: {
            text: {
              fill: "#f3f4f6",
            },
          },
          tooltip: {
            container: {
              background: "#1f2937",
              color: "#f3f4f6",
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor="#9ca3af"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: isDashboard ? 50 : 56,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#2563eb",
                },
              },
            ],
          },
        ]}
      />

      <div
        className={`absolute text-center font-medium text-blue-600 ${
          isDashboard
            ? "top-[15%] left-[15%] transform -translate-x-1/2 -translate-y-1/2"
            : "top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        }`}
      >
        <p className="text-base">
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </p>
      </div>
    </div>
  );
};

export default BreakdownChart;
