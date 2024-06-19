import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-400 ">
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:w-1/2 p-8 bg-gradient-to-r from-blue-500 to-blue-200 text-white">
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

          <div className="md:w-1/2 p-8 color">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">We'd love to hear from you! Let's get in touch</h2>
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 text-lg">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Full Name"
                  />
                </div>
                
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 text-lg">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="youremail@domain.com"
                  />
                </div>
               
              </div>
              <div>
                <label className="block text-gray-700 text-lg">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg">Your Message</label>
                <textarea
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Type your message here"
                  rows={4}
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 text-white bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors duration-200"
                >
                Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
