import Services from "@/components/Category/Services";
import Hero from "@/components/Home/Hero";
import PopularPackage from "@/components/Package/PopularPackage";
import Testimonials from "./Testimonials/Testimonials";
import { testimonialsData } from "./Testimonials/testimonialsData";
import BookingBox from "./Testimonials/BookingBox";
export default function Home() {
  return (
    <div>
      <Hero/>
      <PopularPackage/>
      
      <div className="md:col-span-1">
        <BookingBox />
      </div>

      <div className="p-6">
      <h1 className="text-2xl font-bold mb-6"></h1>
      <Testimonials {...testimonialsData}/>
    </div>
    <Services/>
    </div>
    
  );
};
