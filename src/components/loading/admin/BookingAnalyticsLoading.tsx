import { Card } from '@/components/ui/card';
import DashSectionHeading from '@/components/ui/DashSectionHeading';
import React from 'react'

export default function BookingAnalyticsLoading() {
  return (
    <Card className=" sm:min-w-[425px] sm:w-fit w-full flex flex-col gap-3 p-4 lg:p-5 lg:w-[calc(50%_-_10px)] skeleton shadow-none">
      <DashSectionHeading>Bookings Analytics</DashSectionHeading>

      <div className=' w-[400px] h-[400px]'></div>
    </Card>
  );
}
