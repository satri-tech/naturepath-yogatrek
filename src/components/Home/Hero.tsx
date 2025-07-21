import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { petrona } from "@/app/fonts"
import HeroImage from "../../../public/Hero/hero1.jpg"
import { poppins } from "@/app/layout"
import { ChevronRight } from "lucide-react"

const Hero = () => {
  return (
    <div className="relative w-full h-[100vh] flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-[-2]">
        <Image
          src={HeroImage}
          alt="Hero Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* Optional dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-[-1]" />

      {/* Hero Content with Blur Glass Effect */}
      <div className="w-full flex justify-center items-center h-full  ">
        <div className="backdrop-blur-sm bg-white/5 w-full h-full rounded-xl shadow-lg flex  justify-center">
          <div className="flex flex-col  mt-40  gap-2 w-[90%]  ">
            <div className="text-6xl md:text-8xl lg:text-8xl font-bold leading-none  w-max  flex flex-col  text-white">
              <div>NATUREPATH</div>
              <div>YOGATREK</div>
            </div>

            <p className="text-white/80 text-lg  leading-relaxed">
              Fuel Your Mind, Body, and Soul with Love
            </p>

            <Link href="/booking">
              <Button
                variant="outline"
                size="lg"
                className="bg-primary text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                BOOK NOW <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
