import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import HeroImage from "../../../public/Hero/hero1.jpg"
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
          <div className="flex flex-col mt-40 gap-4 w-[90%]  text-start">
            {/* Tagline / Slogan */}
            <div className="text-4xl md:text-6xl lg:text-5xl font-bold text-white  w-6/12  ">
              A Journey to the Peaks of Inner Peace.            </div>

            {/* Description */}
            <p className="text-white/80 text-lg md:text-base leading-relaxed w-6/12">
              Join us for transformative treks infused with the healing essence of yoga, breathwork, and
              mindful connection to the natural world.
            </p>

            {/* CTA Button */}
            <div className="mt-4">
              <Link href="/booking">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-primary rounded-3xl text-white font-semibold hover:scale-105 transition-all duration-300"
                >
                  BOOK NOW <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero
