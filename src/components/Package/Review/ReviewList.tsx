// components/ReviewsList.js
import ClientReviews from "../ClientReviews";
const ReviewsList = ({ reviews }:{ reviews:any }) => {
    return (
      <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
  
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          reviews.map((review:any, index:number) => (
            <div key={index} className="mb-4 border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="text-yellow-500">
                  
                  {'★'.repeat(review?.rating) + '☆'.repeat(5 - review?.rating)}
                  
                </div>
                <span className="ml-2 text-gray-600 text-sm">{new Date(review?.date).toLocaleDateString()} </span>
              </div>
            
              <p className="text-gray-700">{review?.review}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default ReviewsList;
  