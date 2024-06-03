// pages/PackageDetailsPage.tsx

import React from 'react';
import PackageDetails from '../components/Package/PackageDetails';

const PackageDetailsPage: React.FC = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Trekking Package Details</h1>
    <PackageDetails
      duration="14 Days"
      destination="Nepal"
      tripGrade="Moderate"
      startsAt="Kathmandu"
      endsAt="Kathmandu"
      accommodation="Tea House or Lodge"
      maxAltitude="Annapurna Base Camp (4130 Meters)"
      activity="Trekking"
      groupType="Any"
      groupSize="1 to 10"
      bestSeason="Spring and Autumn"
      meals="Breakfast, Lunch, and Dinner During Trek"
    />
  </div>
);

export default PackageDetailsPage;
