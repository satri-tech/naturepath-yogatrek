import { Card } from "@/components/ui/card";
import { TrendingUp, UsersRound } from "lucide-react";
import React from "react";
import Image from "next/image";

export default function TopStatisticCardLoading() {
  return (
    <Card className=" flex gap-3 lg:gap-6 justify-between w-full p-4 lg:p-5 lg:w-[calc(50%_-_6px)] xl:w-[calc((100%_/_3)-8px)] items-center skeleton shadow-none">
      <div className=" flex gap-3 items-center">
        <span
          className={`[&>*]:w-[24px] [&>*]:h-[24px] inline-block p-5 self-center rounded-full`}
        >
          <UsersRound />
        </span>

        <div className=" flex flex-col gap-1">
          <div>
            <div className=" font-bold text-xl md:text-2xl">
              <span>$</span>
              <span>500</span>
            </div>
            <span className=" font-semibold text-sm md:text-base  leading-tight">
              Total Users
            </span>
          </div>

          <div
            className={`flex gap-1 text-sm items-center `}
          >
            <TrendingUp className=" w-4" />
            <div>
              <span>-</span>
              <span>35%</span>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={"/admin/chart1.png"}
        alt="loading chart"
        className=" h-[100px] w-auto xl:w-[100px] sm:h-[105px] md:h-[90px]  rounded-md opacity-0"
        width={500}
        height={500}
      />
    </Card>
  );
}
