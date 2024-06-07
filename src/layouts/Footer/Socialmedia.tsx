import React from "react";


import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaLinkedin,
  FaSquareInstagram,
  FaSquareYoutube,
  FaSquareWhatsapp,
} from "react-icons/fa6";

const Socialmedia = () => {
  return (
    <>
      <Link href="#" target="_blank" className="cursor-pointer">
        <FaSquareFacebook
          size="36px"
          className="text-darkPrimary dark:text-white"
        />
      </Link>
      <Link href="#" target="_blank" className="cursor-pointer">
        <FaSquareXTwitter
          size="37px"
          className="text-darkPrimary dark:text-white"
        />
      </Link>
      <Link href="#" target="_blank" className="cursor-pointer">
        <FaLinkedin size="37px" className="text-darkPrimary dark:text-white" />
      </Link>
      <Link href="#" target="_blank" className="cursor-pointer">
        <FaSquareInstagram
          size="37px"
          className="text-darkPrimary dark:text-white"
        />
      </Link>
      <Link href="#" target="_blank" className="cursor-pointer">
        <FaSquareYoutube
          size="37px"
          className="text-darkPrimary dark:text-white"
        />
      </Link>
      <Link href="#" target="_blank" className="cursor-pointer">
        <FaSquareWhatsapp
          size="37px"
          className="text-darkPrimary dark:text-white"
        />
      </Link>
    </>
  );
};

export default Socialmedia;
