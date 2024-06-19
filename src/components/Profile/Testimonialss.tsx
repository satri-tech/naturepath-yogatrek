// components/Testimonials.tsx
"use client";

import React from 'react';

interface Testimonial {
  platform: string;
  title: string;
  review: string;
  name: string;
  date: string;
  country: string;
}

const testimonials: Testimonial[] = [
  {
    platform: "TripAdvisor",
    title: "Annapurna Base Camp Helicopter Tour With Knowledgeable And Friendly Crew",
    review: "I had always dreamed of trekking to Annapurna Base Camp, but I wasn't sure if I had the time or fitness level to do it. When I found out about the Annapurna Base Camp Helicopter Tour, I knew it was the perfect solution. The tour with Green Valley Nepal Treks exceeded my expectations. The helicopter ride was smooth and comfortable, and the views were simply stunning..",
    name: "Mark",
    date: "January 18, 2023",
    country: "Australia"
  },
  {
    platform: "TripAdvisor",
    title: "Absolute Best - Everest Base Camp Trek",
    review: "I thoroughly enjoyed my trek to Everest base camp with Green valley. All the arrangements were made really well. As I was traveling alone, I wanted to go with a trekking company that was responsive, and Arjun was super responsive even from day 1. He was very accommodating to the extent that I had not paid advance and he had still made all the arrangements for me.",
    name: "Sahana A",
    date: "December 11, 2022",
    country: "United States"
  },
  // Add other testimonials here
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-green-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-800">What our travelers say</h2>
      <h3 className="text-xl font-semibold mb-4 text-center">Client Reviews</h3>
      <div className="relative flex items-center justify-center space-x-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-2">
            <img
  src="woman.jpg"
  alt="client"
  className="w-10 h-10 rounded-full"
/>

              <div className="text-green-600 flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.444a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.54 1.118l-3.367-2.444a1 1 0 00-1.175 0l-3.367 2.444c-.784.57-1.84-.197-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.54 9.392c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.965z" />
                    </svg>
                  ))}
              </div>
            </div>
            <h4 className="text-lg font-semibold mb-2">{testimonial.title}</h4>
            <p className="text-gray-600 italic mb-4">"{testimonial.review}"</p>
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-600">
                {testimonial.name.charAt(0)}
              </div>
              <div className="ml-4">
                <span className="font-semibold">{testimonial.name}</span>
                <br />
                <span className="text-gray-500 text-sm">{testimonial.date} • {testimonial.country}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
