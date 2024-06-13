import Error from "@/layouts/error/Error";
import { Testimonial } from "@prisma/client";
import React from "react";
import StarRating from "../ui/starRating";
import Rating from "../ui/Rating";

interface User {
  firstName: string;
  lastName: string;
  image: string;
}
interface TestimonialWithUser extends Testimonial {
  user: User;
}
function ratings(newRating: number): void {
  console.log(newRating);
}

const Gettestimonial = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonial/gettestimonial`,
      { next: { tags: [`testimonialCollection`], revalidate: 100 } }
    );
    const data = await response.json();

  
    return (
      <ul>
        {data.data.map((item:TestimonialWithUser)=>(
          <li key={item.id}>
          <div>
            <Rating rating={item.rating} />
            {item.user.firstName}&nbsp;{item.user.lastName}
            <p>{item.comment}</p>
          </div>
          </li>
        ))}
      </ul>
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
    <div>
      <Gettestimonial />
    </div>
  );
};

export default Testimonials;
