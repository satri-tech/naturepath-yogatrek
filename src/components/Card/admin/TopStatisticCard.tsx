import { Card } from '@/components/ui/card';
import { TopAnalyticType } from '@/utils/types/admin/TopAnlayticType';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import Image from 'next/image';

export default function TopStatisticCard({single_analytic}:{single_analytic:TopAnalyticType }) {
     const {
       icon,
       id,
       title,
       value,
       prefix,
       rate,
       rate_increase,
       img,
       className,
     } = single_analytic;

  return (
    <Card
      key={id}
      className=" flex gap-3 lg:gap-6 justify-between w-full p-4 lg:p-5 lg:w-[calc(50%_-_6px)] xl:w-[calc((100%_/_3)-8px)] items-center"
    >
      <div className=" flex gap-3 items-center">
        <span
          className={`[&>*]:w-[24px] [&>*]:h-[24px] ${className} inline-block p-5 self-center rounded-full`}
        >
          {icon}
        </span>

        <div className=" flex flex-col gap-1">
          <div>
            <div className=" font-bold text-xl md:text-2xl">
              <span>{prefix && prefix}</span>
              <span>{value}</span>
            </div>
            <span className=" font-semibold text-sm md:text-base text-gray-500 leading-tight">
              {title}
            </span>
          </div>

          <div
            className={`flex gap-1 text-sm items-center ${rate_increase == true ? " text-yoga-green/85" : " text-yoga-red/85"}`}
          >
            {rate_increase != null && (
              <span className={``}>
                {rate_increase ? (
                  <TrendingUp className=" w-4" />
                ) : (
                  <TrendingDown className=" w-4" />
                )}
              </span>
            )}
            {rate_increase != null && rate && (
              <div>
                <span>{rate_increase ? "+" : "-"}</span>
                <span>{rate}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Image
        src={img}
        alt={title}
        className=" h-[100px] w-auto xl:w-[100px] sm:h-[105px] md:h-[90px] object-cover group-hover/parent:scale-105 transition-all duration-500 rounded-md"
        width={500}
        height={500}
      />
    </Card>
  );
}
