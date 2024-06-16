"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import StarRating from "@/components/ui/starRating";
import { useSession } from "next-auth/react";
import { TestimonialWithUser } from "@/components/Home/Testimonials";
import { comment } from "postcss";

const schema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" }),
});

type TestimonialFormValues = z.infer<typeof schema>;

export default function TestimonialForm({testimonial}:{testimonial:TestimonialWithUser}) {
  const session = useSession();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:{
      rating:testimonial?.rating?? 0,
      comment:testimonial?.comment?? ""
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    
  });

  const onSubmit = async (values: TestimonialFormValues) => {
    try {
      if(testimonial){
        if(testimonial.rating !==values.rating || testimonial.comment !== values.comment){
          const formdata = {
            userId: session.data?.user.id,
            rating: values.rating,
            comment: values.comment,
          };

          const jsonData = JSON.stringify(formdata);
          const response = await fetch("/api/testimonial/create", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${session.data?.user.accessToken}`,
            },
            body: jsonData,
          });
          const data = await response.json();
        }else{
          console.log("updated")
        }
      
      }else{

        const formdata = {
          userId: session.data?.user.id,
          rating: values.rating,
          comment: values.comment,
        };
        const jsonData = JSON.stringify(formdata);
        const response = await fetch("/api/testimonial/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${session.data?.user.accessToken}`,
          },
          body: jsonData,
        });
        const data = await response.json();
      }


      // revalidateTag("ServiceCollection")
      

    //   if (data && data.success) {
    //     form.reset();
    //   }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-sm my-3 mx-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <StarRating
                    rating={field.value}
                    onRatingChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    rows={5}
                    placeholder="Message"
                    {...field}
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField>
        <FormLabel>Comment</FormLabel>
        <FormControl>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <textarea {...field} />
            )}
          />
        </FormControl>
        {errors.comment && <FormMessage>{errors.comment.message}</FormMessage>}
      </FormField> */}
        {testimonial ? 
        <Button type="submit">Update Review</Button>
        :
        <Button type="submit">Add Review</Button>
        
      }
        </form>
      </Form>
    </div>
  );
}
