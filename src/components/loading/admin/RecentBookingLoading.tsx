import { Card } from '@/components/ui/card';
import DashSectionHeading from '@/components/ui/DashSectionHeading';
import React from 'react'
import RecentBookingsTableLoading from './RecentBookingsTableLoading';

export default function RecentBookingLoading() {
  return (
    <Card className=" w-full flex flex-col gap-3 p-4 lg:p-5 skeleton shadow-none">
      <DashSectionHeading className='invisible'>Recent Bookings</DashSectionHeading>

      <RecentBookingsTableLoading />
    </Card>
  );
}
