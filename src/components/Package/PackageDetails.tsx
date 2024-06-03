// components/PackageDetails.tsx

import React from 'react';

interface PackageDetailsProps {
  duration: string;
  destination: string;
  tripGrade: string;
  startsAt: string;
  endsAt: string;
  accommodation: string;
  maxAltitude: string;
  activity: string;
  groupType: string;
  groupSize: string;
  bestSeason: string;
  meals: string;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({
  duration,
  destination,
  tripGrade,
  startsAt,
  endsAt,
  accommodation,
  maxAltitude,
  activity,
  groupType,
  groupSize,
  bestSeason,
  meals
}) => (
  <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
    <div className="grid grid-cols-2 gap-4 text-blue-900">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Duration: {duration}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Destination: {destination}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Trip Grade: {tripGrade}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Starts at: {startsAt}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Ends at: {endsAt}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Accommodation: {accommodation}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Max Altitude: {maxAltitude}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Activity: {activity}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Group Type: {groupType}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Group Size: {groupSize}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Best Season: {bestSeason}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="..."/></svg>
        <span>Meals: {meals}</span>
      </div>
    </div>
  </div>
);

export default PackageDetails;
