import Image from "next/image";
import Link from "next/link";
import React from "react";

const Associaltion = () => {
  return (
    <>
      <Link href="#" target="_blank" className="cursor-pointer">
        <Image
          src={"/payment/Khalti.png"}
          alt="esewa"
          height={26}
          width={50}
          quality={100}
        />
      </Link>
      <Link href="#" target="_blank" className="cursor-pointer">
        <Image
          src={"/payment/esewa.png"}
          alt="esewa"
          height={44}
          width={70}
          quality={100}
        />
      </Link>
      <Link href="#" target="_blank" className="cursor-pointer">
        <Image
          src={"/payment/stripe.png"}
          alt="esewa"
          height={24}
          width={50}
          quality={100}
        />
      </Link>
    </>
  );
};

export default Associaltion;
