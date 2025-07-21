import Services from "@/components/Category/Services";
import Hero from "@/components/Home/Hero";
import PopularPackage from "@/components/Package/PopularPackage";
import Testimonials from "@/components/Home/Testimonials";
import FeaturedComponents from "@/components/Home/featuredSection/FeaturedComponents";

export default function Home() {
  return (
    <div className="flex flex-col gap-14">
      <Hero />
      <FeaturedComponents/>
      <PopularPackage />
      <Services />
      <Testimonials />
    </div>
  );
}
