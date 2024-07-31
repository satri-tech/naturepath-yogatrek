"use client";
import { RevenueType } from "@/utils/types/admin/RevenueType";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = ["#ffc107", "#198754", "#0d6efd"];

const RevenueBarGraph = ({revenue_data}:{revenue_data: RevenueType[]}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={revenue_data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis
          label={{
            value: "Earning (in $)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend />
        <Bar dataKey="Earnings" name="Earnings" fill="#74C365">
          {revenue_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueBarGraph;
