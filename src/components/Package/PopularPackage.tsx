import React from "react";
import PackageCard from "../Card/PackageCard";
import Headings from "../ui/Headings";

const PopularPackage = () => {
  return (
    <>
      <Headings>Popular Packages</Headings>
      <div className="conatiner max-w-6xl  my-10 mx-4 lg:mx-auto gap-6 grid grid-cols-1 md:grid-cols-2 ">
        {[0, 1, 2, 3].map((items) => (
          <PackageCard key={items} />
          
        ))}
      </div>
    </>
  );
};

export default PopularPackage;
