import React from 'react';
import { FaCalendarAlt, FaClipboardList, FaMountain, FaUsers, FaDollarSign } from 'react-icons/fa';

interface PackageDetailsProps {
  duration: string;
  pax: string;
  price: string;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({
  duration,
  
  pax,
  price
}) => (
  <div className="bg-white p-2 rounded-lg shadow-lg ">
    <div className="text-center text-2xl font-bold mb-4">MT. EVEREST TREK</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-900 text-center">
      <div className="flex flex-col items-center">
        <FaCalendarAlt className="w-8 h-8 mb-2 text-gray-700" />
        <span className="font-bold">Trip Duration:</span>
        <span>{duration}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <FaUsers className="w-8 h-8 mb-2 text-gray-700" />
        <span className="font-bold">No. of Pax:</span>
        <span>{pax}</span>
      </div>
      <div className="flex flex-col items-center">
        <FaDollarSign className="w-8 h-8 mb-2 text-gray-700" />
        <span className="font-bold">From</span>
        <span>{price}/person</span>
      </div>
    </div>
  </div>
);

export default PackageDetails;
