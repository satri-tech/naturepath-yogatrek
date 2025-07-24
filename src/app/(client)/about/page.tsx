import Image from "next/image";

import Error from "@/layouts/error/Error";
import PageWrapper from "@/layouts/PageWrapper";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ExtendedSitePage } from "@/components/forms/admin/SitePages/UpdateSitePageForm";
import TeamMembers from "@/components/about/TeamMembers";
import Topbanner from "@/layouts/Topbanner";

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
        detail: "Practice yoga amidst breathtaking mountains and serene landscapes",
        gradient: "from-emerald-400 to-teal-600",
      },
      {
        id: 2,
        icon: "/about/icon2.png",
        title: "Expert Guidance",
        detail: "Led by renowned yoga instructors and experienced spiritual guides",
        gradient: "from-blue-400 to-indigo-600",
      },
      {
        id: 3,
        icon: "/about/icon3.png",
        title: "Holistic Experience",
        detail: "Combine yoga with meditation, trekking, and cultural immersion",
        gradient: "from-purple-400 to-pink-600",
      },
    ];

    return (
      <main className="dark:text-text-dark min-h-screen">
        <Topbanner
          img_url="https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532_1280.jpg"
          title={about_page_details.title}
          description="Blending the tranquility of yoga with the adventure of trekking, NaturePath YogaTrek offers mindful journeys that reconnect you with nature and your inner self."
        />

        <PageWrapper className="flex flex-col gap-8 md:gap-6 section-padding">
          {/* Content Sections with Enhanced Styling */}
          <div className="max-w-4xl mx-auto">
            {about_page_details.sections?.map((sec, index) => (
              <section
                key={sec.id}
                className={`flex flex-col cursor-pointer gap-4 md:gap-6 ${index !== about_page_details.sections.length - 1 ? 'mb-12 md:mb-16' : ''
                  }`}
              >
                <article className="flex flex-col gap-4">
                  <div className="relative">
                    <h1 className="dark:text-text-dark font-bold text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-white leading-tight">
                      {sec.title}
                    </h1>
                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
                  </div>

                  <div
                    className="dark:text-text-dark text-gray-600 dark:text-gray-300 lg:text-lg leading-relaxed prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: sec.description }}
                  />
                </article>
              </section>
            ))}
          </div>

          {/* Why Choose Us Section with Enhanced Design */}
          <section className=" p-8 md:p-12 0">
            <div className="text-center mb-8">
              <h2 className={`uppercase font-extrabold text-2xl md:text-3xl lg:text-4xl bg-primary bg-clip-text text-transparent mb-4`}>
                Why Choose Our Yoga & Trek Company
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
                Discover the perfect blend of adventure, mindfulness, and natural beauty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {choose_reasons.map((reason, index) => {
                const { id, icon, title, detail, gradient } = reason;

                return (
                  <Card
                    key={id}
                    className={`group relative overflow-hidden cursor-pointer bg-white dark:bg-gray-800 border hover:scale-[1.05] transition-transform duration-500 `}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >

                    {/* Card Content */}
                    <div className="relative p-6 md:p-8 flex flex-col items-center text-center h-full">
                      {/* Icon Container with Enhanced Styling */}
                      <div className={`relative mb-6 p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-[1.04] transition-transform duration-500`}>
                        <Image
                          src={icon}
                          alt={title}
                          className="w-12 h-12 object-contain filter brightness-0 invert"
                          width={48}
                          height={48}
                          quality={100}
                        />

                      </div>

                      <div className="flex flex-col items-center flex-1">
                        <CardTitle className="text-gray-800 dark:text-white text-xl md:text-2xl font-bold mb-3">
                          {title}
                        </CardTitle>

                        <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                          {detail}
                        </CardDescription>
                      </div>

                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Team Members Section */}
          <section className=" p-8 md:p-12 0">
            <TeamMembers />
          </section>
        </PageWrapper>

        {/* Floating Action Elements */}
        <div className="fixed bottom-8 right-8 z-10">
          <div className="flex flex-col gap-3">
            {/* You can add floating action buttons here */}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    return <Error status={404} message="Bad request" />;
  }
};

export default AboutPage;