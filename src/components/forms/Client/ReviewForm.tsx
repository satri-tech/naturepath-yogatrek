// components/ReviewForm.js
'use client'
import { useState } from 'react';

const ReviewForm = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // onAddReview({ review, rating, date: new Date().toISOString() });
    setReview('');
    setRating(5);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white text-gray-700 dark:bg-black-dark dark:text-text-dark rounded shadow-md"
    >
      <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="rating">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          //   onChange={(e) => setRating(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black-dark"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="review">
          Review
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black-dark"
          //   rows="3"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
