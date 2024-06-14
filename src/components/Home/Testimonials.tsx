import Error from "@/layouts/error/Error";
import { Testimonial } from "@prisma/client";
import React from "react";
import StarRating from "../ui/starRating";
import Rating from "../ui/Rating";
import TestimonialsCarousel from "./TestimonialCarousel";
import Headings from "../ui/Headings";

interface User {
  firstName: string;
  lastName: string;
  image: string;
}

export interface TestimonialWithUser extends Testimonial {
  user: User;
}


const Gettestimonial = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonial/gettestimonial`,
      { next: { tags: [`testimonialCollection`], revalidate: 100 } }
    );
    const data = await response.json();

  
    return (<TestimonialsCarousel testimonial={data.data}/>
      
    );
  } catch (err:any) {
    console.log(err);
   
    return (
      <ul>
        <Error status={404} message="not found"/>
      </ul>
    );
  }
};

const Testimonials = () => {
  return (
    <div className="mt-20">
        <Headings>Happy Travellers</Headings>
      <Gettestimonial />
    </div>
  );
};

export default Testimonials;


