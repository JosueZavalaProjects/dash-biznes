"use client";
import React from "react";

import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import { GraphData } from "@/types/dashboard";

import { Loading } from "./modals/components/Loading";

type Props = { data: GraphData[]; isLoading: boolean; fillColor?: string };

export default function BarChart({
  data,
  isLoading,
  fillColor = "#007bff",
}: Props) {
  return (
    <>
      {isLoading && (
        <div className="grid w-full h-full justify-items-center items-center">
          <Loading />
        </div>
      )}
      {!isLoading && !data.length && (
        <div className="grid w-full h-full justify-items-center items-center">
          No Data
        </div>
      )}
      {!isLoading && data.length > 0 && (
        <ResponsiveContainer width={"100%"} height={350}>
          <BarGraph data={data}>
            <XAxis
              dataKey={"name"}
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey={"total"} radius={[4, 4, 0, 0]} fill={fillColor} />
          </BarGraph>
        </ResponsiveContainer>
      )}
    </>
  );
}
