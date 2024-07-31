import { Value } from "@radix-ui/react-select";
import {
  Banknote,
  Package,
  PackageMinus,
  PackagePlus,
  UsersRound,
  Wallet,
} from "lucide-react";

export const total_analytics = [
  {
    id: "1",
    icon: <Wallet />,
    title: "Total Earned (till now)",
    value: 2000,
    prefix: "$",
    rate: 34,
    rate_increase: true,
    img: "/admin/chart2.png",
    className: "text-yoga-blue bg-yoga-blue/15",
  },
  {
    id: "2",
    icon: <Banknote />,
    title: "Total Earned (this month)",
    value: 200,
    prefix: "$",
    rate: 24,
    rate_increase: false,
    img: "/admin/chart3.png",
    className: "text-yoga-yellow bg-yoga-yellow/15",
  },
  {
    id: "3",
    icon: <UsersRound />,
    title: "Total Users",
    value: 300,
    rate: 20,
    rate_increase: true,
    img: "/admin/chart1.png",
    className: "text-yoga-green bg-yoga-green/15",
  },
  {
    id: "4",
    icon: <Package />,
    title: "Total Packages",
    value: 2000,
    img: "/admin/package.png",
    className: "text-yoga-pink bg-yoga-pink/15",
  },
  {
    id: "5",
    icon: <PackagePlus />,
    title: "Packages Booked",
    value: 20,
    rate: 34,
    rate_increase: false,
    img: "/admin/chart7.png",
    className: "text-yoga-purple bg-yoga-purple/15",
  },
  {
    id: "6",
    icon: <PackageMinus />,
    title: "Packages Cancelled",
    value: 5,
    rate: 34,
    rate_increase: true,
    img: "/admin/chart6.png",
    className: "text-yoga-orange bg-yoga-orange/15",
  },
];


export const bookings_data = [
  { name: "Yoga with Trek", booking: 30 },
  { name: "Yoga with Tour", booking: 20 },
  { name: "Just Yoga", booking: 27 },
  // more data
];

export const revenue_data = [
  {
    category: "Yoga with Trek",
    Earnings: 4000,
  },
  {
    category: "Yoga with Tour",
    Earnings: 3000,
  },
  {
    category: "Just Tour",
    Earnings: 2000,
  },
];
