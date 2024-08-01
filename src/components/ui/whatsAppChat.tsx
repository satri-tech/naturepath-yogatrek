
import Link from "next/link";
import React from "react";
import Image from "next/image";

{
  /* retrieve number from backend later dynamically*/
}
export default function WhatsappChat() {
  const phoneNumber = "9771343434343"; // Replace with the target phone number in international format without "+" sign
  const message = "Hello, I have a question regarding your services."; // Default message

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-8 bottom-8 w-[45px] h-[45px] object-cover object-center z-50"
    >
      <Image
        src={"/whatsapp.png"}
        alt="whatsapp logo"
        width={1024}
        height={1024}
        className=""
      />
    </Link>
  );
}
