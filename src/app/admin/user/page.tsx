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

const UserPage = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUser`,
      { next: { tags: [`UserCollection`], revalidate: 10 } }
    );

    const { data }: { data: User[] } = await response.json();

    return (
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Customers</CardTitle>
          <CardDescription>List of your Customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Users</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((Item: User) => (
                <TableRow className="bg-accent" key={Item.id}>
                  <TableCell>
                    <div className="font-medium">
                      {Item.firstName}&nbsp;{Item.lastName}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:flex">
                      {Item.email}&nbsp;
                      <span>
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
                  <TableCell className="hidden sm:table-cell text-right">
                    <Badge className="text-xs" variant="secondary">
                      {Item.role}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-4 text-red-600">
        An error occurred while fetching users.
      </div>
    );
  }
};

export default UserPage;