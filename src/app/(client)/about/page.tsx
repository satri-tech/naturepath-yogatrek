import Image from "next/image";

import Error from "@/layouts/error/Error";
import { SitePageType } from "@/utils/types/SitePageType";
import PageWrapper from "@/layouts/PageWrapper";
import { petrona } from "@/app/layout";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const AboutPage = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/meta/getPage`,
      { next: { tags: [`MetasCollection`], revalidate: 100 } }
    );
    const data = await response.json();

    const about_page_details: SitePageType = data.data.find(
      (page: SitePageType) => page.slug == "about"
    );

    const choose_reasons = [
      {
        id: 1,
        icon: "/about/icon1.png",
        title: "Stunning Location",
        detail: "Practice yoga amidst breathtaking mountains",
      },
      {
        id: 2,
        icon: "/about/icon2.png",
        title: "Expert Guidance",
        detail: "Led by renowned yoga instructors and spiritual guides.",
      },
      {
        id: 3,
        icon: "/about/icon4.png",
        title: "Holistic Experience",
        detail:
          "Combine  yoga with meditation, trekking, and cultural immersion.",
      },
    ];

    return (
      <main className=" ">
        <Image
          src={about_page_details.image}
          alt={about_page_details.title}
          className="w-full h-[215px] sm:h-[250px] md:h-[300px] object-cover group-hover/parent:scale-105 transition-all duration-500"
          width={500}
          height={500}
          quality={100}
        />

        {/* <section>
          {about_page_details.sections.map((section) => {
            return <p key={section.id}>{section.description}</p>;
          })}
        </section> */}

        <PageWrapper className=" flex flex-col">
          <section className="flex flex-col gap-3 md:gap-4">
            <p>
              At out Yoga and trek company, we share the holistic principles of
              yoga and eternaln wisdom in an accessible way. We strive to be a
              heart center of excellence in healing, meditation, and traditional
              yoga teachings, promoting community development and sustainable
              lifestyles based on yoga&apos;s principles worldwide.
            </p>
            <p>
              We believe that regular yoga practice enhances physical, mental,
              and spiritual health, creating a positive ripple effect in
              communities and workplaces. Mukti Yoga Retreat welcomes all who
              seek a healthier life, ensuring a safe and nurturing environment
              for our students.
            </p>
          </section>

          <section className=" flex flex-col gap-4 section-padding">
            <h2
              className={`${petrona.className} uppercase font-extrabold text-xl md:text-2xl text-center text-primary`}
            >
              why choose our Yoga and trek company
            </h2>

            <div className=" flex flex-wrap gap-3 md:gap-4 justify-center">
              {choose_reasons.map((reason) => {
                const { id, icon, title, detail } = reason;

                return (
                  <Card
                    key={id}
                    className=" p-4 md:p-5 flex flex-col gap-2 w-full sm:w-[calc(50%_-_6px)] md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_12px)]  items-center"
                  >
                    <Image
                      src={icon}
                      alt={title}
                      className="w-[65px] object-cover group-hover/parent:scale-105 transition-all duration-500"
                      width={500}
                      height={500}
                      quality={100}
                    />

                    <div className=" flex flex-col items-center">
                      <CardTitle
                        className={` text-black/80 text-xl ${petrona.className}`}
                      >
                        {title}
                      </CardTitle>
                      <CardDescription className=" text-base text-center">
                        {detail}
                      </CardDescription>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </PageWrapper>
      </main>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

export default AboutPage;
