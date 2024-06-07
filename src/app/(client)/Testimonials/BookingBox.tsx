import React from 'react';
import { FaCalendarAlt, FaStar, FaMinus, FaPlus } from 'react-icons/fa';

const BookingBox: React.FC = () => {
  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md max-w-sm">
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <FaStar className="text-yellow-500" />
          <span className="text-sm text-gray-600">Quick Book to travel</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="tripDate">Departure Date</label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            id="tripDate"
            className="w-full border rounded-md pl-10 pr-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="numberOfTraveler">No. of Traveler</label>
        <div className="flex items-center">
          <button
            className="w-10 h-10 border rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center"
            aria-label="Decrease number of travelers"
          >
            <FaMinus />
          </button>
          <input
            type="number"
            id="numberOfTraveler"
            className="w-full border-t border-b text-center py-2 focus:outline-none"
            min="1"
            defaultValue="1"
          />
          <button
            className="w-10 h-10 border rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center"
            aria-label="Increase number of travelers"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          BOOK NOW
        </button>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          ADD TO CART
        </button>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
          CHECK AVAILABILITY
        </button>
        <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600">
          SEND INQUIRY
        </button>
      </div>
    </div>
  );
};

export default BookingBox;
