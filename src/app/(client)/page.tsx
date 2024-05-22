import Services from "@/components/Category/Services";
import Hero from "@/components/Home/Hero";
import PopularPackage from "@/components/Package/PopularPackage";


export default function Home() {
  return (
    <div>
      <Hero/>
      <PopularPackage/>
      <Services/>
    </div>
  );
}
