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

type Props = { data: GraphData[]; isLoading: boolean };

export default function BarChart({ data, isLoading }: Props) {
  return (
    <>
      {isLoading && (
        <div className="grid w-full h-full justify-items-center items-center">
          <Loading />
        </div>
      )}
      {!isLoading && (
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
            <Bar dataKey={"total"} radius={[4, 4, 0, 0]} fill="#007bff" />
          </BarGraph>
        </ResponsiveContainer>
      )}
    </>
  );
}
