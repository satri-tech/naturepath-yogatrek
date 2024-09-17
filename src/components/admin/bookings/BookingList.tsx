"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Error from "@/layouts/error/Error";
import { Booking, Package } from "@prisma/client";
import ViewButton from "@/components/ui/viewButton";
import UpdateButton from "@/components/ui/updateButton";
import DeleteButton from "@/components/ui/deleteButton";
import DeletePopover from "@/components/ui/deletePopover";
import PackageListLoading from "@/components/loading/admin/PackageListLoading";
import { useSession } from "next-auth/react";
import Success from "@/components/ui/success";
import Danger from "@/components/ui/danger";
import Pending from "@/components/ui/pending";
import moment from "moment";
import { MoveRight } from "lucide-react";
import TableController from "@/components/ui/tableController";

interface BookingsWithPackageInterface extends Booking {
  package: Package | null;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsWithPackage, setBookingsWithPackage] = useState<
    BookingsWithPackageInterface[]
  >([]);

  const session = useSession();

  //for pagination
  const itemsPerTable = 6;
  const tablesPresent = Math.ceil(bookingsWithPackage.length / itemsPerTable);

  const [currentTable, setCurrentTable] = useState<number>(0);

  const updateCurrentTableByNumber = (index: number) => {
    setCurrentTable(index);
  };

  const updateCurrentTable = (mode: string) => {
    switch (mode) {
      case "prev":
        setCurrentTable(currentTable == 0 ? currentTable : currentTable - 1);
        break;

      case "next":
        setCurrentTable(
          currentTable == tablesPresent - 1 ? currentTable : currentTable + 1
        );
        break;

      default:
        console.log(
          "invalid case in prev next handling in table of deals statistics"
        );
    }
  };

  const itemsInLastTable =
    bookingsWithPackage.length - (tablesPresent - 1) * itemsPerTable;

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getbooking`,
        { next: { tags: [`BookingCollection`], revalidate: 600 } }
      );
      const data = await response.json();

      setBookings(data.data);
    } catch (error) {
      console.log(error);
      return <Error status={404} message="Bad request" />;
    }
  };

  const fetchPackage = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage?id=${id}`,
        { next: { tags: [`Package-${id}`], revalidate: 600 } }
      );
      const { data }: { data: Package[] } = await response.json();

      const pckg = data.find((pckg) => pckg.id == id);
      return pckg;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getBookingsWithPackage = useCallback(async () => {
    if (bookings) {
      const bookingsWithPackage = await Promise.all(
        bookings.map(async (booking) => {
          const pckg = await fetchPackage(booking.packageId);
          if (pckg)
            return {
              ...booking,
              package: pckg,
            };
          else
            return {
              ...booking,
              package: null,
            };
        })
      );

      setBookingsWithPackage(bookingsWithPackage);
    }
  }, [bookings]);

  async function deleteBooking(bookingId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${session.data?.user.accessToken}`,
          },
          body: JSON.stringify({ id: bookingId }), // Send the Package id
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Booking deleted successfully:", result.message);
      } else {
        console.error("Failed to delete booking:", result.message);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }

  const formatDate = (dateTimeString: Date) => {
    try {
      const date = moment(dateTimeString, moment.ISO_8601);
      return date.format("YYYY-MM-DD"); // Format to YYYY-MM-DD
    } catch (error) {
      console.log("Invalid date string");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    getBookingsWithPackage();
  }, [bookings]);

  if (bookingsWithPackage && bookingsWithPackage.length > 0) {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" ">Customer</TableHead>
              <TableHead className="">Phone Number</TableHead>
              <TableHead className="">Country</TableHead>
              <TableHead className="">Room preference</TableHead>
              <TableHead className="">Booking date</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Amount</TableHead>
              {/* <TableHead className="hidden">Created at</TableHead> */}
              <TableHead>
                <span className="">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsWithPackage.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="hidden sm:table-cell">
                  <div className="font-medium">{booking.fullname}</div>
                  <div className=" text-sm text-muted-foreground md:inline">
                    {booking.email}
                  </div>
                </TableCell>
                <TableCell className="">
                  <span className=" inline-block">{booking.phone}</span>
                </TableCell>
                <TableCell className="">
                  <span className=" inline-block">{booking.country}</span>
                </TableCell>
                <TableCell className="">
                  <span className=" inline-block">
                    {booking.roomPreferences}
                  </span>
                </TableCell>
                <TableCell>
                  <span className=" inline-block w-[125px]">
                    {formatDate(booking.bookingDate)}
                  </span>
                </TableCell>
                <TableCell className="">
                  {booking.status == "CONFIRMED" ? (
                    <Success>Booked</Success>
                  ) : booking.status == "CANCELLED" ? (
                    <Danger>Cancelled</Danger>
                  ) : (
                    <Pending>Pending</Pending>
                  )}
                </TableCell>
                <TableCell>
                  {booking.roomPreferences == "PRIVATE" ? (
                    <div>
                      <span>
                        Private:{" "}
                        <span className="  font-medium block">
                          {booking.package?.PrivateOffer}
                        </span>{" "}
                        <span className=" line-through  font-medium block">
                          {booking.package?.PrivatePrice}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className=" inline-block w-[175px] ">
                        Shared:{" "}
                        <span className="  font-medium block">
                          {booking.package?.SharingOffer}
                        </span>{" "}
                        <span className=" line-through  font-medium block">
                          {booking.package?.SharingPrice}
                        </span>
                      </span>
                    </>
                  )}
                </TableCell>

                <TableCell className="flex gap-2 items-center">
                  <ViewButton
                    url={`/admin/bookings/view/${booking.id}`}
                    className=""
                  />

                  {/*update*/}
                  <UpdateButton url={`/admin/bookings/update/${booking.id}`} />

                  {/* <form action={DeleteService}> */}
                  {/* <input type="hidden" value={Item.id} name="id"/> */}

                  {/*later put delete api request here in the function*/}
                  <DeletePopover
                    text="booking"
                    deleteFn={() => {
                      deleteBooking(booking.id);
                    }}
                  >
                    <DeleteButton />
                  </DeletePopover>
                  {/* </form> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/*controller*/}
        <TableController
          updateCurrentTable={updateCurrentTable}
          updateCurrentTableByNumber={updateCurrentTableByNumber}
          currentTable={currentTable}
          itemsInLastTable={itemsInLastTable}
          itemsPerTable={itemsPerTable}
          tablesPresent={tablesPresent}
        />
      </div>
    );
  } else {
    return <PackageListLoading />;
  }
};

export default BookingList;
