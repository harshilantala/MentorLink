import React, { useState } from 'react';

const MentorFeedbackForm = () => {
  const [formData, setFormData] = useState({
    conceptualUnderstanding: '',
    natureAndAttitude: '',
    behaviorAndProfessionalism: '',
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
          <h2 className="text-2xl font-bold">Mentor's Feedback on Mentee</h2>
          <p className="text-blue-100">Please provide your honest assessment of your mentee's performance</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Conceptual Understanding */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">1. Conceptual Understanding</h3>
            <p className="text-gray-600 text-sm">How well does the mentee grasp the concepts discussed in the sessions?</p>
            <div className="space-y-2">
              {['Excellent', 'Good', 'Average', 'Needs Improvement'].map((option) => (
                <label key={option} className="flex items-center space-x-3 p-2 rounded hover:bg-blue-50">
                  <input
                    type="radio"
                    name="conceptualUnderstanding"
                    value={option}
                    checked={formData.conceptualUnderstanding === option}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Nature & Attitude */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">2. Nature & Attitude</h3>
            <p className="text-gray-600 text-sm">How would you describe the mentee's attitude toward learning and collaboration?</p>
            <div className="space-y-2">
              {[
                'Very positive and eager to learn',
                'Generally positive but needs encouragement',
                'Neutral or inconsistent',
                'Lacks enthusiasm or engagement'
              ].map((option) => (
                <label key={option} className="flex items-center space-x-3 p-2 rounded hover:bg-blue-50">
                  <input
                    type="radio"
                    name="natureAndAttitude"
                    value={option}
                    checked={formData.natureAndAttitude === option}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Behavior & Professionalism */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">3. Behavior & Professionalism</h3>
            <p className="text-gray-600 text-sm">How does the mentee behave in professional interactions?</p>
            <div className="space-y-2">
              {[
                'Very professional and respectful',
                'Mostly professional, with minor lapses',
                'Occasionally unprofessional',
                'Often unprofessional'
              ].map((option) => (
                <label key={option} className="flex items-center space-x-3 p-2 rounded hover:bg-blue-50">
                  <input
                    type="radio"
                    name="behaviorAndProfessionalism"
                    value={option}
                    checked={formData.behaviorAndProfessionalism === option}
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
            <p className="text-gray-600 text-sm">How would you rate your experience mentoring this mentee?</p>
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
            <p className="text-gray-600 text-sm">Any specific suggestions for improvement? (Optional)</p>
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

export default MentorFeedbackForm;