import Image from "next/image";

import Error from "@/layouts/error/Error";
import PageWrapper from "@/layouts/PageWrapper";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ExtendedSitePage } from "@/components/forms/admin/SitePages/UpdateSitePageForm";
import TeamMembers from "@/components/about/TeamMembers";
import Topbanner from "@/layouts/Topbanner";
import { petrona } from "@/app/fonts";

const AboutPage = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/meta/getPage?slug=about`,
      { next: { tags: [`Metas About`], revalidate: 200 } }
    );
    const data = await response.json();
    const about_page_details: ExtendedSitePage = data.data;

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
      <main className=" dark:text-text-dark">
        <Topbanner
          img_url={about_page_details.image}
          title={about_page_details.title}
        />

        {/* <section>
          {about_page_details.sections.map((section) => {
            return <p key={section.id}>{section.description}</p>;
          })}
        </section> */}

        <PageWrapper className=" flex flex-col gap-3 md:gap-4 section-padding">
          {about_page_details.sections?.map((sec) => (
            <section key={sec.id} className="flex flex-col gap-3 md:gap-4">
              <article className=" flex flex-col gap-2">
                <h1 className="dark:text-text-dark font-bold text-lg md:text-xl lg:text-2xl">
                  {sec.title}
                </h1>
                <div
                  className=" dark:text-text-dark lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: sec.description }}
                />
              </article>
            </section>
          ))}

          <section className=" flex flex-col gap-4 section-padding">
            <h2
              className={`${petrona.className} uppercase font-extrabold text-2xl md:text-3xl text-center text-primary`}
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

                    <div className=" flex flex-col items-center dark:text-text-dark">
                      <CardTitle
                        className={` text-black/80 dark:text-text-dark text-xl ${petrona.className}`}
                      >
                        {title}
                      </CardTitle>
                      <CardDescription className=" text-base text-center dark:text-text-dark/70">
                        {detail}
                      </CardDescription>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          <TeamMembers />
        </PageWrapper>
      </main>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

export default AboutPage;
