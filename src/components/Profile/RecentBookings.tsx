import React from "react";

const bookings = [
  { id: 1, activity: "Yoga Class", date: "2024-06-10" },
  { id: 2, activity: "Trekking Trip", date: "2024-06-11" },
];

const RecentBookings = ({ booking }: { booking: any }) => {
  return (
    <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="mb-4">
          <p className="font-semibold">{booking.activity}</p>
          <p>{booking.date}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentBookings;
