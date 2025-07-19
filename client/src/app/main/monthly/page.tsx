"use client";

import React, { useMemo } from "react";
import Title from "@/app/components/Title";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useGetSalesQuery } from "../../../../redux/API/api";
import Loading from "@/app/loading";

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

const Monthly: React.FC = () => {
  const { data } = useGetSalesQuery(undefined);

  const [formattedData] = useMemo(() => {
    if (!data) return [[]];

    const { monthlyData }: { monthlyData: SalesData[] } = data;

    const totalSalesLine: LineData = {
      id: "totalSales",
      color: "#6366f1", // indigo-500
      data: [],
    };

    const totalUnitsLine: LineData = {
      id: "totalUnits",
      color: "#22c55e", // green-500
      data: [],
    };

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data.push({ x: month, y: totalSales });
      totalUnitsLine.data.push({ x: month, y: totalUnits });
    });

    return [[totalSalesLine, totalUnitsLine]];
  }, [data]);

  return (
    <div className="px-10 py-6">
      <Title title="MONTHLY SALES" subtitle="Chart of monthly sales" />
      <div className="h-[75vh]">
        {data ? (
          //@ts-ignore
          <ResponsiveLine
            data={formattedData as Serie[]}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: "#4b5563", // gray-700
                  },
                },
                legend: {
                  text: {
                    fill: "#4b5563",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#4b5563",
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "#4b5563",
                  },
                },
              },
              legends: {
                text: {
                  fill: "#4b5563",
                },
              },
              tooltip: {
                container: {
                  color: "#4b5563",
                },
              },
            }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
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
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
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
          <div className="h-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Monthly;
