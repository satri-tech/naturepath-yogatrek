import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const includedItems = [
  "Accommodation: 01 nights in Kathmandu hotels with Bed & Breakfast",
  "Stay: 6 nights in Tea Houses/Lodges on twin-sharing basis",
  "Transportation: Kathmandu to Syabru Beshi and Dhunche to Kathmandu transfers",
  "Permits: Langtang National Park Fee and TIMS Card (Trekker Information Management System)",
  "Guides: English-speaking certified trekking guide and reliable porter",
  "Luggage: Allowance of 15 kg per person, with one complimentary duffle bag",
  "Activities: Daily yoga sessions with certified instructors",
  "Meditation: Guided meditation sessions and silent meditation periods",
  "Meals: Healthy vegetarian meals provided throughout the journey",
  "Excursions: Cultural visits with an English-speaking guide"
];

const excludedItems = [
  "Not Included: International airfare",
  "Pickup: International Airport pickup (unless pre-booked)",
  "Visa: Nepal Entry Visa",
  "Supplement: Single supplement charges in Kathmandu hotels or retreat centers",
  "Meals: Lunch and dinner in Kathmandu unless specified",
  "Trek Meals: BLD (Breakfast, Lunch & Dinner) during the trekking days",
  "Equipment: Personal trekking equipment or specific meditation supplies",
  "Tipping: Expected for guides, porters, and service providers"
];


const PackageIncluded: React.FC = () => {
  return (
    <div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 overflow-y-auto p-4 lg:w-4/6">
          <div className="container mx-auto p-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What is included</h2>
              <ul className="list-none space-y-2">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-600 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">What is Excluded</h2>
              <ul className="list-none space-y-2">
                {excludedItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaTimesCircle className="text-red-600 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default PackageIncluded;
