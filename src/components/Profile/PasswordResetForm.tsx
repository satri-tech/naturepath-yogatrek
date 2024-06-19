"use client";

import React, { useState } from 'react';

const PasswordResetForm: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password reset link sent to ' + email);
    };

    return (
        
            <div className="p-8 bg-white text-black shadow-lg rounded-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
                <p className="mb-4">Provide the email address associated with your account to recover your password.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Reset Password</button>
                </form>
                <div className="mt-6 text-center">
                    <a href="/login" className="text-blue-500 hover:underline mr-4">Login</a>
                    <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </div>
                <div className="mt-6 text-center">
                    <p className="mb-2">Or continue with</p>
                    <div className="flex flex-col space-y-2">
                        <button className="w-full p-2 bg-red-500 text-white rounded">Sign in with Google</button>
                        <button className="w-full p-2 bg-blue-700 text-white rounded">Sign in with Facebook</button>
                        <button className="w-full p-2 bg-blue-400 text-white rounded">Sign in with Twitter</button>
                    </div>
                </div>
            </div>
      
    );
};

export default PasswordResetForm;
