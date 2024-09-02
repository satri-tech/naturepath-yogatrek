import { Card } from '@/components/ui/card';
import DashSectionHeading from '@/components/ui/DashSectionHeading';
import React from 'react'

export default function RevenueLoading() {
  return (
    <Card className=" w-full flex lg:flex-1 flex-col gap-3 p-4 lg:p-5 skeleton shadow-none">
      <DashSectionHeading>Revenue</DashSectionHeading>

      <div className=" w-full h-[400px]"></div>
    </Card>
  );
}
