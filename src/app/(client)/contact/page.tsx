import ContactForm from "@/components/forms/Client/ContactForm"
import Topbanner from "@/layouts/Topbanner"
import { Mail, Phone, MapPin, Globe, Users } from "lucide-react"
import type React from "react"

const Contact: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
        <Topbanner
          img_url="https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532_1280.jpg"
          title="Get in Touch"
          description="Ready to plan your perfect trip? We're here to help make your travel dreams come true."
        />

        <div className=" flex flex-col items-center  px-4 py-16">
          {/* Main Content */}
          <div className="w-[95%]">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-8 md:p-12 border border-primary/10">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      Let's Plan Your <span className="text-primary">Adventure</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      Fill out the form below and our travel experts will get back to you within 24 hours.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="lg:col-span-1 space-y-6">
                {/* Main Contact Card */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-sm p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Visit Us</h4>
                        <p className="text-white/90 leading-relaxed">
                          123 Main Street, City Name
                          <br />
                          Suite 456, Country Name
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Call Us</h4>
                        <p className="text-white/90">+977 98XXXXXXXX</p>
                        <p className="text-white/90">+977 98XXXXXXXX</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email Us</h4>
                        <p className="text-white/90">contact@example.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Website</h4>
                        <p className="text-white/90">www.example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 text-center w-[95%]"  >
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Don't wait any longer. Contact us today and let's create unforgettable memories together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Call Now: +977 98XXXXXXXX
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
