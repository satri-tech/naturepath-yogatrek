// pages/profile.tsx
import React from 'react';
import ProfileInfo from './ProfileInfo';
import PasswordResetForm from './PasswordResetForm';
import Testimonials from './Testimonialss';
import RecentBookings from './RecentBookings';
import ProfilePictureUpload from './ProfilePictureUpload';
import Pricing from './Pricing';
import Services from './Services';
const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <ProfileInfo />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="p-3 bg-white shadow-lg rounded-lg">
                        <img src="yoga.jpg" alt="Yoga Pose 1" className="w-full h-64 object-cover rounded-lg mb-4" />
                    </div>
                    <div className="p-3 bg-white shadow-lg rounded-lg">
                        <img src="trekking.jpg" alt="Trekking" className="w-full h-64 object-cover rounded-lg mb-4" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="p-3 bg-white shadow-lg rounded-lg">
                        <img src="basecamp.jpg" alt="basecamp" className="w-full h-64 object-cover rounded-lg mb-4" />
                    </div>
                    <div className="p-3 bg-white shadow-lg rounded-lg">
                        <img src="meditation.jpg" alt="meditation" className="w-full h-64 object-cover rounded-lg mb-4" />
                    </div>
                </div>
                <PasswordResetForm />
            <RecentBookings />
            
                <Testimonials />
            </div>
        </div>
    );
};

export default ProfilePage;

