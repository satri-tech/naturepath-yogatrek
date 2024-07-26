"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFormSchema } from "@/utils/validation/BookingFormValidation";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const AllBookingform = () => {
  const session = useSession();

  const form = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof BookingFormSchema>) {
    try {
      if (session.data) {
        const formdata = {
          packageId: values.package,
          userId: session.data?.user.id,
          fullname: values.FullName,
          email: values.Email,
          phone: values.contact,
          country: values.country,
          roomPreferences: values.roomPeferance,
          noofPerson: parseInt(values.NoofPerson),
          message: values.Message,
          bookingDate: values.StartingDate,
        };
        const jsonData = JSON.stringify(formdata);
        const response = await fetch("/api/booking/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${session.data?.user.accessToken}`,
          },
          body: jsonData,
        });
        const data = await response.json();
      } else {
        const formdata = {
          packageId: values.package,
          fullname: values.FullName,
          email: values.Email,
          phone: values.contact,
          country: values.country,
          roomPreferences: values.roomPeferance,
          noofPerson: parseInt(values.NoofPerson),
          message: values.Message,
          bookingDate: values.StartingDate,
        };
        const jsonData = JSON.stringify(formdata);
        const response = await fetch("/api/booking/create", {
          method: "POST",
          body: jsonData,
        });
        const data = await response.json();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 mx-4 sm:mx-auto max-w-5xl text-black"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="FullName"
            defaultValue={
              session
                ? `${session.data?.user?.firstName ?? ""} ${
                    session.data?.user?.lastName ?? ""
                  }`
                : ""
            }
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full name"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="StartingDate"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Date of birth</FormLabel> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal"
                          // !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <
                        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NoofPerson"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    pattern="[0-9]*"
                    placeholder="Number of Person"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            defaultValue={session ? `${session.data?.user?.email ?? ""}` : ""}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input type="text" placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Contact Number with country code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hello">Hello</SelectItem>
                    <SelectItem value="m@google.com">package 2</SelectItem>
                    <SelectItem value="m@support.com">package 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomPeferance"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Room Preferance" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SHARED">Shared</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="Message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  rows={3}
                  placeholder="Message"
                  {...field}
                  className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AllBookingform;
