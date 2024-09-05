"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Error from "@/layouts/error/Error";
import { Package } from "@prisma/client";
import ViewButton from "@/components/ui/viewButton";
import UpdateButton from "@/components/ui/updateButton";
import DeleteButton from "@/components/ui/deleteButton";
import DeletePopover from "@/components/ui/deletePopover";
import PackageListLoading from "@/components/loading/admin/PackageListLoading";
import { Blog } from "@/utils/types/BlogType";
import { useSession } from "next-auth/react";

const TrekkingTipsList = () => {
  const [trekkingTips, setTrekkingTips] = useState<Blog[]>([]);
  const session = useSession();

  const fetchtrekkingTips = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trekking-tips/getAll`,
        { next: { tags: [`TrekkingTipCollection`], revalidate: 600 } }
      );
      const data = await response.json();
      setTrekkingTips(data.data);
    } catch (error) {
      console.log(error);
      return <Error status={404} message="Bad request" />;
    }
  };

  async function deleteTrekkingTip(trekkingTipId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trekking-tips/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${session.data?.user.accessToken}`,
          },
          body: JSON.stringify({ id: trekkingTipId }), // Send the Package id
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Trekking tip deleted successfully:", result.message);
      } else {
        console.error("Failed to delete trekking tip:", result.message);
      }
    } catch (error) {
      console.error("Error deleting trekking tip:", error);
    }
  }

  useEffect(() => {
    fetchtrekkingTips();
  }, []);

  if (trekkingTips && trekkingTips.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" w-[100px] sm:table-cell">
              <span className="">Image</span>
            </TableHead>
            <TableHead className=" ">Title</TableHead>
            <TableHead className="">Author</TableHead>
            <TableHead>
              <span className="">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trekkingTips.map((trekking_tip: Blog) => (
            <TableRow key={trekking_tip.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt={trekking_tip.title}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={trekking_tip.img_url}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                <span className=" w-[175px] inline-block">
                  {trekking_tip.title}
                </span>
                <br />
              </TableCell>
              <TableCell className="">
                <span className=" inline-block w-[175px]">
                  {trekking_tip.authors}
                </span>
              </TableCell>

              <TableCell className="flex gap-2 items-center">
                <ViewButton
                  url={`/admin/trekking-tips/view/${trekking_tip.id}`}
                  className=""
                />
                {/*update*/}
                <UpdateButton
                  url={`/admin/trekking-tips/update/${trekking_tip.id}`}
                />
                {/*delete*/}
                <DeletePopover
                  text="service"
                  deleteFn={() => {
                    deleteTrekkingTip(trekking_tip.id as string);
                  }}
                >
                  <DeleteButton />
                </DeletePopover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <PackageListLoading />;
  }
};

export default TrekkingTipsList;
