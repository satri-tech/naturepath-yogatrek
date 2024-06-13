import Services from "@/components/Category/Services";
import Hero from "@/components/Home/Hero";
import PopularPackage from "@/components/Package/PopularPackage";
import Testimonial from "./packages/Testimonial/Testimonial";

export default function Home() {
  return (
    <div>
      <Hero/>
      <PopularPackage/>
    <Services/>
    
    <div className=" items-center justify-center bg-orange-300 py-4 px-4">
      <Testimonial
        name="Michael Dada"
        title="Everest Visitor"
        text="Exceptional service! During my trip, the assistance provided by the team was outstanding. 
        From the moment I inquired about their services to the end of my journey, they were attentive, responsive, and went above and beyond to ensure I had a memorable experience.
         I highly recommend their services to fellow travelers seeking a seamless and enjoyable trip."
        image="/woman.jpg" 
        rating={5}
        agent="Ghimiray"
      />
    </div>

    </div>
    
  );
};
