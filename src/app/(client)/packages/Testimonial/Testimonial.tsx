// components/Testimonial.tsx
import React from 'react';

interface TestimonialProps {
  name: string;
  title: string;
  text: string;
  image: string;
  rating: number;
  agent: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, title, text, image, rating, agent }) => {
  return (
    <div className="bg-pink-500 p-4 rounded-lg shadow-lg text-white w-half mx-1">
      <div className="flex items-center mb-3">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-3" />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm">{title}</p>
        </div>
      </div>
      <p className="text-lg mb-3">AMAZING TOURIST GUIDE</p>
      <p className="mb-3 text-sm bold">{text}</p>
      <p className="text-xs">Thanks to guide {agent}!</p>
      <div className="flex mt-3">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.086 3.337a1 1 0 00.95.69h3.506c.969 0 1.371 1.24.588 1.81l-2.84 2.073a1 1 0 00-.364 1.118l1.087 3.337c.3.921-.755 1.688-1.54 1.118l-2.84-2.073a1 1 0 00-1.176 0l-2.84 2.073c-.784.57-1.84-.197-1.54-1.118l1.087-3.337a1 1 0 00-.364-1.118L2.465 8.765c-.784-.57-.38-1.81.588-1.81h3.506a1 1 0 00.95-.69l1.086-3.337z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
