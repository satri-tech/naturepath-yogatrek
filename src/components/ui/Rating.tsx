import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
 

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.12-6.545L.486 7.91l6.562-.955L10 1.5l2.952 5.454 6.562.955-4.756 3.635 1.12 6.546z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
