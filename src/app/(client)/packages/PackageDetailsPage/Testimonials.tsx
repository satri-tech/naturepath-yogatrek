// import React from 'react';
// // import { FaClock, FaMapMarkerAlt, FaMountain, FaUtensils, FaHiking, FaUsers, FaCalendarAlt, FaHotel } from 'react-icons/fa';

// interface TestimonialProps {
//   duration: string;
//   destination: string;
//   tripGrade: string;
//   startsAt: string;
//   endsAt: string;
//   accommodation: string;
//   maxAltitude: string;
//   meals: string;
//   activity: string;
//   groupType: string;
//   groupSize: string;
//   bestSeason: string;
// }

// const Testimonials: React.FC<TestimonialProps> = ({
//   duration,
//   destination,
//   tripGrade,
//   startsAt,
//   endsAt,
//   accommodation,
//   maxAltitude,
//   meals,
//   activity,
//   groupType,
//   groupSize,
//   bestSeason
// }) => {
//   const items = [
//     // { icon: <FaClock />, label: 'Duration', value: duration },
//     // { icon: <FaMapMarkerAlt />, label: 'Destination', value: destination },
//     // { icon: <FaMountain />, label: 'Trip Grade', value: tripGrade },
//     // { icon: <FaMapMarkerAlt />, label: 'Starts at', value: startsAt },
//     // { icon: <FaMapMarkerAlt />, label: 'Ends at', value: endsAt },
//     // { icon: <FaHotel />, label: 'Accommodation', value: accommodation },
//     // { icon: <FaMountain />, label: 'Max. Altitude', value: maxAltitude },
//     // { icon: <FaUtensils />, label: 'Meals', value: meals },
//     // { icon: <FaHiking />, label: 'Activity', value: activity },
//     // { icon: <FaUsers />, label: 'Group Type', value: groupType },
//     // { icon: <FaUsers />, label: 'Group Size', value: groupSize },
//     // { icon: <FaCalendarAlt />, label: 'Best Season', value: bestSeason }
//   ];

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md">
//       <div className="p-6 bg-white rounded-lg shadow">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {items.map((item, index) => (
//             <div key={index} className="flex items-center space-x-4">
//               <div className="text-blue-500">{item.icon}</div>
//               <div className="flex flex-col">
//                 <span className="font-bold">{item.label}</span>
//                 <p>{item.value}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;
