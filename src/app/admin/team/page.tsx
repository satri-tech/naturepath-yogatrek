import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Error from '@/layouts/error/Error';
import { Team } from '@prisma/client';
import { Eye, Table, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import React, { Suspense } from 'react'


const TeamList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/getMember`,
      { next: { tags: [`MemberCollection`], revalidate: 600 } }
    );
    const data = await response.json();
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">Thumbnail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((Item: Team) => (
            <TableRow className="bg-accent" key={Item.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt={Item.name}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={Item.image}
                  width="64"
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">{Item.name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {Item.position}
                </div>
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Link href={`/admin/sitepage/update/${Item.id}`}>
                  <div>
                    <Eye />
                  </div>
                </Link>

                {/* <form action={DeleteService}> */}
                {/* <input type="hidden" value={Item.id} name="id"/> */}
                <Button variant={"link"} type="submit">
                  <Trash2 />
                </Button>
                {/* </form> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};



const TeamPage = () => {
  return (
    <Card>
      <CardHeader className="sm:px-7">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>List of Team Members.</CardDescription>
          </div>
          <Link href={"/admin/team/add"}>
            <Button variant={"default"}>Add Member </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <TeamList />
        </Suspense>
      </CardContent>
    </Card>
  )
}

export default TeamPage


