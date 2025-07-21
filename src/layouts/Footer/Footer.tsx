import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import LOGO from "../../../public/Logo/logo.png"

const LearnMore = [
  {
    href: "/booking",
    name: "Booking",
  },
  {
    href: "/events",
    name: "Events",
  },
  {
    href: "/faq",
    name: "FAQ's",
  },
  {
    href: "/testimonials",
    name: "testimonials",
  },
]

const Resources = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/about",
    name: "About",
  },
  {
    href: "/services",
    name: "Services",
  },
  {
    href: "/gallery",
    name: "Gallery",
  },
]

const Copyright = `Copyright \u00A9 ${new Date().getFullYear()} Naturepath Yogatrek`

const SocialMedia = () => {
  return (
    <div className="flex gap-4 justify-center lg:justify-start">
      <Link
        href="#"
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Facebook"
      >
        <FaFacebook className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Instagram"
      >
        <FaInstagram className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Twitter"
      >
        <FaTwitter className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="YouTube"
      >
        <FaYoutube className="h-5 w-5" />
      </Link>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Mobile and Tablet Footer (hidden on large screens) */}
      <div className="lg:hidden">
        <div className="container px-6 py-8">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <Image
              src={LOGO || "/placeholder.svg"}
              alt="Naturepath Yogatrek Logo"
              width={120}
              height={38}
              className="h-10 w-auto"
            />
          </div>

          {/* Newsletter Section */}
          <div className="mb-8 text-center">
            <h2 className="text-lg font-semibold mb-4 tracking-tight">Stay Connected</h2>
            <p className="text-sm text-white/80 mb-4 max-w-sm mx-auto">
              Subscribe to our newsletter for yoga tips, retreat updates, and wellness insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
              />
              <Button className="bg-white text-primary hover:bg-white/90 font-medium px-6 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mb-8 text-center">
            <h3 className="text-base font-semibold mb-4">Follow Our Journey</h3>
            <SocialMedia />
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4 mb-8 px-7">
            <div>
              <h3 className="font-semibold text-sm mb-4 text-white/90">Learn More</h3>
              <div className="space-y-3">
                {LearnMore.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4 text-white/90">Resources</h3>
              <div className="space-y-3">
                {Resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop Footer (hidden on small screens) */}
      <div className="container hidden lg:block py-8">
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-2 flex flex-col items-start gap-6">
            <Image
              src={LOGO || "/placeholder.svg"}
              alt="Naturepath Yogatrek Logo"
              width={150}
              height={48}
              className="h-12 w-auto"
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold tracking-tight">Subscribe our newsletter.</h2>
              <div className="flex gap-4 max-w-md">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
                />
                <Button className="bg-white text-primary hover:bg-white/90 font-medium transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="font-bold text-sm tracking-wide py-1.5 mb-2">Learn more</h3>
            {LearnMore.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-white/70 hover:text-white py-1.5 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start">
            <h3 className="font-bold text-sm tracking-wide py-1.5 mb-2">Resources</h3>
            {Resources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-white/70 hover:text-white py-1.5 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="col-span-2 flex flex-col items-end gap-6">
            <div className="flex flex-col gap-4 items-end">
              <h2 className="text-xl font-semibold tracking-tight">Follow us on.</h2>
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20">
        <div className="container px-6 py-4">
          <p className="text-center text-sm text-white/70">{Copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
