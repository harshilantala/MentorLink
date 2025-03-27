import React, { useState } from 'react';

const MenteeFeedbackForm = () => {
  const [formData, setFormData] = useState({
    conceptualClarity: '',
    supportAndEncouragement: '',
    behaviorAndApproachability: '',
    overallRating: 0,
    additionalFeedback: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      overallRating: rating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted feedback:', formData);
    // Here you would typically send this data to your backend
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="bg-white h-screen overflow-auto p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Mentee's Feedback on Mentor</h2>
          <p className="text-blue-100">Please share your experience with your mentor</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Conceptual Clarity & Guidance */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">1. Conceptual Clarity & Guidance</h3>
            <p className="text-gray-600 text-sm">How well does the mentor explain concepts and guide you?</p>
            <div className="space-y-2">
              {[
                'Extremely clear and helpful',
                'Mostly clear, but some gaps',
                'Sometimes unclear',
                'Often difficult to understand'
              ].map((option) => (
                <label key={option} className="flex items-center space-x-3 p-2 rounded hover:bg-blue-50">
                  <input
                    type="radio"
                    name="conceptualClarity"
                    value={option}
                    checked={formData.conceptualClarity === option}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Support & Encouragement */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">2. Support & Encouragement</h3>
            <p className="text-gray-600 text-sm">How supportive is the mentor in your learning journey?</p>
            <div className="space-y-2">
              {[
                'Very supportive and motivating',
                'Somewhat supportive',
                'Neutral',
                'Not very supportive'
              ].map((option) => (
                <label key={option} className="flex items-center space-x-3 p-2 rounded hover:bg-blue-50">
                  <input
                    type="radio"
                    name="supportAndEncouragement"
                    value={option}
                    checked={formData.supportAndEncouragement === option}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Behavior & Approachability */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">3. Behavior & Approachability</h3>
            <p className="text-gray-600 text-sm">How approachable and respectful is the mentor?</p>
            <div className="space-y-2">
              {[
                'Always approachable and respectful',
                'Usually approachable, with occasional lapses',
                'Sometimes difficult to approach',
                'Often unapproachable'
              ].map((option) => (
                <label key={option} className="flex items-center space-x-3 p-2 rounded hover:bg-blue-50">
                  <input
                    type="radio"
                    name="behaviorAndApproachability"
                    value={option}
                    checked={formData.behaviorAndApproachability === option}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Overall Rating */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">4. Overall Rating</h3>
            <p className="text-gray-600 text-sm">How would you rate your experience with this mentor?</p>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= formData.overallRating ? (
                    <span className="text-yellow-400">★</span>
                  ) : (
                    <span className="text-gray-300">★</span>
                  )}
                </button>
              ))}
              <span className="ml-2 text-gray-600">
                {formData.overallRating > 0 ? `${formData.overallRating}/5` : ''}
              </span>
            </div>
          </div>
          
          {/* Additional Feedback */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">5. Additional Feedback</h3>
            <p className="text-gray-600 text-sm">Any suggestions or appreciation you'd like to share? (Optional)</p>
            <textarea
              name="additionalFeedback"
              value={formData.additionalFeedback}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please share your thoughts here..."
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenteeFeedbackForm;