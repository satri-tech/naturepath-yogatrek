import { Button } from "@/components/ui/button";
import React from "react";

const ContactForm = () => {
  return (
    <form className="space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-text-dark text-lg">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Full Name"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-text-dark text-lg">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="youremail@domain.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-text-dark text-lg">
          Address
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Address"
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-text-dark text-lg">
          Your Message
        </label>
        <textarea
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Type your message here"
          rows={4}
        ></textarea>
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
