"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import {BookingFormSchema} from "@/lib/validation/BookingFormValidation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'



const Bookingform = () => {

    const form = useForm<z.infer<typeof BookingFormSchema>>({
        resolver: zodResolver(BookingFormSchema),
        defaultValues: {
          FullName: "",
        },
      })

      function onSubmit(values: z.infer<typeof BookingFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="FullName"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input type='text' placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input type='text' placeholder="Country" {...field} />
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
                <Input type='text' placeholder="Contact Number with country code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='email' placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="package"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">package 1</SelectItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Room Preferance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">package 1</SelectItem>
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
          name="StartingDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='date' placeholder="Full name" {...field} />
              </FormControl>
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
                <Input type='number' min={1}  placeholder="Number of Person" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder="Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Bookingform
