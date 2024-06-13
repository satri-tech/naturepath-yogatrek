import React from 'react';

const testimonials = [
    { id: 1, name: 'Jane Smith', feedback: 'Amazing experience!Yoga trek was excellent, great value for money, and exceeded my expectations. You were very flexible according to the dates of our trek.', rating: 5, photo: 'test.jpg' },
    { id: 2, name: 'Paul Brown', feedback: 'I loved the meditation sessions!Thank you for a wonderful retreat which allowed me to remember The Truth of Who I Really Am.', rating: 4, photo: 'test1.jpg' },
];

const Testimonials: React.FC = () => {
    return (
        <div className="p-6 bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="mb-6 flex items-center">
                    <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                        <p className="font-semibold text-lg">{testimonial.name}</p>
                        <div className="flex items-center">
                            {Array.from({ length: testimonial.rating }).map((_, index) => (
                                <span key={index} className="text-yellow-400">★</span>
                            ))}
                            {Array.from({ length: 5 - testimonial.rating }).map((_, index) => (
                                <span key={index} className="text-gray-300">★</span>
                            ))}
                        </div>
                        <p className="mt-2">{testimonial.feedback}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;
