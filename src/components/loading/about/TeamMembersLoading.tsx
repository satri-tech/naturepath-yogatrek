import React from "react";
import TeamMemberCardLoading from "./TeamMemberCardLoading";

export default function TeamMembersLoading() {
  return (
    <section className=" flex flex-col gap-4 section-padding">
      <h2
        className={` uppercase font-extrabold text-2xl md:text-3xl text-center text-primary skeleton`}
      >
        Meet Our Extraordinary team
      </h2>
      <div className=" w-full flex flex-wrap gap-3 md:gap-4 justify-center">
        {Array.from({ length: 4 })
          .fill("*")
          .map((_, index) => {
            return <TeamMemberCardLoading key={index} />;
          })}
      </div>
    </section>
  );
}
