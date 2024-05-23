"use client";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const User = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && session.user ? (
        <div className="flex gap-4 flex-1 items-center justify-end">
          {session?.user?.firstName}
          <Image
            src="https://randomuser.me/api/portraits/men/20.jpg"
            alt=""
            width={100}
            height={100}
            quality={100}
            className="rounded-full w-12 h-12 object-cover "
          />
          <Link href={"/api/auth/signout"}>
            <LogOut />
          </Link>
        </div>
      ) : (
        <div>hello</div>
      )}
    </>
  );
};

export default User;
