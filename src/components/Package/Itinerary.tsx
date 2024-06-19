import React from 'react';

const Itinerary: React.FC = () => {
  return (
    <div className="my-4">
      <h2 className="text-3xl font-bold mb-4">Itinerary</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {/* Day 1 */}
          <div className="py-4 px-6">
            <h3 className="text-xl font-bold mb-2">Day 1: Arrival in Kathmandu</h3>
            <p className="text-gray-800">
              Arrive in Kathmandu, where you will be greeted at the airport and transferred to your hotel. Enjoy a welcome dinner and briefing about the trek ahead.
            </p>
          </div>

          {/* Day 2 */}
          <div className="py-4 px-6">
            <h3 className="text-xl font-bold mb-2">Day 2: Kathmandu Sightseeing</h3>
            <p className="text-gray-800">
              Explore cultural heritage sites in Kathmandu, including Swayambhunath, Pashupatinath, and Boudhanath. Prepare for the trek and overnight stay in Kathmandu.
            </p>
          </div>

          {/* Day 3 */}
          <div className="py-4 px-6">
            <h3 className="text-xl font-bold mb-2">Day 3: Kathmandu to Syabru Beshi (Drive)</h3>
            <p className="text-gray-800">
              Drive from Kathmandu to Syabru Beshi, the starting point of your trek. Enjoy scenic views along the way and settle into your tea house accommodation.
            </p>
          </div>

          {/* Day 4-10 */}
          <div className="py-4 px-6">
            <h3 className="text-xl font-bold mb-2">Day 4-10: Trekking to Annapurna Base Camp</h3>
            <p className="text-gray-800">
              Trek through beautiful landscapes, passing through villages like Lama Hotel, Langtang Village, and Kyanjin Gompa. Reach Annapurna Base Camp at 4130 meters, surrounded by majestic peaks.
            </p>
          </div>

          {/* Day 11-13 */}
          <div className="py-4 px-6">
            <h3 className="text-xl font-bold mb-2">Day 11-13: Return Trek to Kathmandu</h3>
            <p className="text-gray-800">
              Begin your return trek, retracing your steps through picturesque landscapes. Stay overnight in tea houses along the way and enjoy the journey back to Kathmandu.
            </p>
          </div>

          {/* Day 14 */}
          <div className="py-4 px-6">
            <h3 className="text-xl font-bold mb-2">Day 14: Departure</h3>
            <p className="text-gray-800">
              Transfer to the airport for your departure flight, concluding your memorable trekking adventure in Nepal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
