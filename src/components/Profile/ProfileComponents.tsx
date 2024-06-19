"use client";

import PasswordResetForm from "./PasswordResetForm";
import ProfileInfo from "./ProfileInfo";
import RecentBookings from "./RecentBookings";
import { useSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";
import TestimonialForm from "../forms/Client/testimonialForm";



export const GetUserData = () => {
  const session = useSession();

  const fetchUserData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUser?id=${session.data?.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`, // Set the authorization header
        },
        next: { tags: [`userprofile`], revalidate: 1000 },
      }
    );
    const data = await response.json();
    return data;
  };

  const query = useQuery({ queryKey: ["Userdata"], queryFn: fetchUserData,  enabled: !!session.data?.user.accessToken  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }
  if (query.isError) {
    return <p>Error...</p>;
  }

  if(query.data){
      return (
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <ProfileInfo  
            name={`${query.data.data?.firstName}${" "}${query.data.data?.lastName}`}
            email={`${query.data.data?.email}`}
            emailVerified={`${query.data.data?.emailVerified}`}
            role={`${query.data.data?.role}`}
            />
            {query.data.data.email && 
            <PasswordResetForm emailaddress={query.data.data.email}/>
            }
            <RecentBookings booking={query.data.data.booking}/>
            <TestimonialForm testimonial={query.data.data?.testimonial[0]}/>
          </div>
        </div>
      );
  }
  if(!query.data || query.isLoading){
    return <p>Loading...</p>
  }

};
