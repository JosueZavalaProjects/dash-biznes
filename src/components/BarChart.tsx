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

export enum graphColor {
  blue,
  red,
  green,
}
type Props = { data: GraphData[]; isLoading: boolean; fillColor?: graphColor };

export default function BarChart({
  data,
  isLoading,
  fillColor = graphColor.blue,
}: Props) {
  return (
    <>
      {isLoading && (
        <div className="grid w-full h-full justify-items-center items-center">
          <Loading />
        </div>
      )}
      {!isLoading && !(data.length >= 0) && (
        <div className="grid w-full h-full justify-items-center items-center">
          No Data
        </div>
      )}
      {!isLoading && data.length > 0 && (
        <ResponsiveContainer width={"100%"} height={350}>
          <BarGraph data={data}>
            <defs>
              <linearGradient
                id={`${graphColor.blue}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#0085ff" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#8ec2f2" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient
                id={`${graphColor.green}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#51C15C" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#51C15C" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient
                id={`${graphColor.red}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#CC3232" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FFA6A2" stopOpacity={0.6} />
              </linearGradient>
            </defs>
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
            <Bar
              dataKey={"total"}
              radius={[4, 4, 0, 0]}
              fill={`url(#${fillColor})`}
            />
          </BarGraph>
        </ResponsiveContainer>
      )}
    </>
  );
}
