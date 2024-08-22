"use client";
import { BookingsDataType } from "@/utils/types/admin/BookingsDataType";
import React from "react";
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const BookingPieChart = ({
  bookings_data,
}: {
  bookings_data: BookingsDataType[];
}) => (
  <PieChart width={400} height={400}>
    <Pie
      data={bookings_data}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      fill="#8884d8"
      paddingAngle={5}
      dataKey="booking"
    >
      {bookings_data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default BookingPieChart;
