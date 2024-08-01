import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Danger from '@/components/ui/danger';
import Success from '@/components/ui/success';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'

export default function RecentBookingsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="">Type</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-accent">
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className=" text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="">Sale</TableCell>
          <TableCell className="">
            <Success>Fulfilled</Success>
          </TableCell>
          <TableCell className="">
            <span className=" inline-block w-[125px]">2023-06-23</span>
          </TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Olivia Smith</div>
            <div className=" text-sm text-muted-foreground md:inline">
              olivia@example.com
            </div>
          </TableCell>
          <TableCell className="">Refund</TableCell>
          <TableCell className="">
            <Danger>Declined</Danger>
          </TableCell>
          <TableCell className="">2023-06-24</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Noah Williams</div>
            <div className=" text-sm text-muted-foreground md:inline">
              noah@example.com
            </div>
          </TableCell>
          <TableCell className="">Subscription</TableCell>
          <TableCell className="">
            <Success>Fulfilled</Success>
          </TableCell>
          <TableCell className="">2023-06-25</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Emma Brown</div>
            <div className=" text-sm text-muted-foreground md:inline">
              emma@example.com
            </div>
          </TableCell>
          <TableCell className="">Sale</TableCell>
          <TableCell className="">
            <Success>Fulfilled</Success>
          </TableCell>
          <TableCell className="">2023-06-26</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className=" text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="">Sale</TableCell>
          <TableCell className="">
            <Success>Fulfilled</Success>
          </TableCell>
          <TableCell className="">2023-06-23</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
