// components/ClientReviews.tsx
import React from 'react';

interface Review {
  name: string;
  date: string;
  country: string;
  rating: number;
  title: string;
  content: string;
}

const reviews: Review[] = [
    {
      name: 'Ghimiray',
      date: 'June 5, 2024',
      country: 'Canada',
      rating: 4,
      title: 'Incredible Trekking Experience!',
      content: 'The trek was truly an adventure of a lifetime. The scenery was breathtaking, and the guides were knowledgeable and supportive throughout. I highly recommend this experience!',
    },
    
    {
      name: 'Lamsal',
      date: 'February 28, 2024',
      country: 'Japan',
      rating: 5,
      title: 'Wonderful Trekking Adventure',
      content: 'A wonderful trekking adventure that I will always remember. The guides were friendly and helpful, and the itinerary was well-planned. Highly recommend!',
    },
  ];
  

const ClientReviews: React.FC = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">What our travelers says</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-lg font-bold">{review.name.charAt(0)}</span>
              </div>
              <div className="ml-3">
                <p className="font-bold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date} | {review.country}</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {Array.from({ length: review.rating }, (_, i) => (
                <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.691h4.184c.97 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.382-1.81.588-1.81h4.184a1 1 0 00.95-.691l1.286-3.974z" />
                </svg>
              ))}
            </div>
            <h3 className="font-bold text-lg">{review.title}</h3>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientReviews;
