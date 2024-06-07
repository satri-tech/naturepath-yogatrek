import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { CircleCheck, CirclePlus } from "lucide-react";

const UserList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUser`,
      { next: { tags: [`UserCollection`], revalidate: 10 } }
    );
    const data = await response.json();
    console.log(data)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Users</TableHead>
            {/* <TableHead className="hidden sm:table-cell">Type</TableHead> */}
            <TableHead className="hidden sm:table-cell">Role</TableHead>
            {/* <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((Item: User) => (
            <TableRow className="bg-accent" key={Item.id}>
              <TableCell>
                <div className="font-medium">
                  {Item.firstName}&nbsp;{Item.lastName}
                </div>
                <div className="hidden text-sm text-muted-foreground  md:flex">
                  {Item.email}&nbsp;<span>

                  
                  {Item.emailVerified ? (
                    <CircleCheck
                      color="#1ab72c"
                      strokeWidth={3}
                      absoluteStrokeWidth
                      size={16}
                    />
                  ) : (
                    <CirclePlus
                      color="#b71a1a"
                      strokeWidth={3}
                      absoluteStrokeWidth
                      className="rotate-45"
                      size={16}
                    />
                  )}
                  </span>
                </div>
              </TableCell>
              {/* <TableCell className="hidden sm:table-cell">Sale</TableCell> */}
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  {Item.role}
                </Badge>
              </TableCell>
              {/* <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
              <TableCell className="text-right">$250.00</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } catch (error) {}
};

const UserPage = () => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Customers</CardTitle>
        <CardDescription>List of your Customer.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserList />
      </CardContent>
    </Card>
  );
};

export default UserPage;
