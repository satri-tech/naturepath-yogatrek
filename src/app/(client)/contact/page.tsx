import ContactForm from "@/components/forms/Client/ContactForm";
import Topbanner from "@/layouts/Topbanner";
import React from "react";

const Contact: React.FC = () => {
  return (
    <>
      <div>
        <Topbanner title="Clear your Queries" />
        <div className="container my-10 mx-4 lg:mx-auto lg:px-4 gap-6 -translate-y-48 ">
          <div className=" flex items-center justify-center max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row container px-0 bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="md:w-1/2 p-8 color">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Let&apos;s Plan your trip
                </h2>
                <ContactForm />
              </div>
              <div className="md:w-1/2 p-8  bg-primary text-white">
                <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
                <p className="text-lg">
                  <strong>Stellar Trek & Tours</strong>
                  <br />
                  Prithivi Chowk Pokhara, Nepal
                  <br />
                  New Baneswor Kathmandu | 76490, Nepal
                </p>
                <p className="mt-6 text-lg">
                  <strong>Tel:</strong> +977-9863770062 (WhatsApp Message)
                </p>
                <p className="text-lg">
                  <strong>Cell:</strong> +977-98******* (Sangam Giri)
                </p>
                <p className="mt-6 text-lg">
                  <strong>Email:</strong> info@satri.com
                </p>
                <p className="mt-6 text-lg">
                  <strong>Web:</strong> www.satritech.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
