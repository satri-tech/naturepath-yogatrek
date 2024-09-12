"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function UserWelcome() {
  const { data: session } = useSession();

  return (
    <div>
      {session && session.user && (
        <h2 className={` font-bold text-2xl md:text-3xl`}>
          <span className=" ">Welcome</span> back!{" "}
          <span className=" whitespace-nowrap shrink-0 inline-block font-semibold text-primary ">
            {session?.user?.firstName} {session?.user?.lastName}
          </span>
        </h2>
      )}
      <p className=" text-black/75 dark:text-text-dark md:text-sm  text-xs">
        Track your packages, package bookings, revenues and other analytics.
      </p>
    </div>
  );
}
