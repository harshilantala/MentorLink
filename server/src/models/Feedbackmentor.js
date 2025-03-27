const mongoose = require("mongoose");

const mentorFeedbackSchema = new mongoose.Schema({
    conceptualUnderstanding: {
        type: String,
        required: true,
        enum: ["Excellent", "Good", "Average", "Needs Improvement"]
    },
    natureAndAttitude: {
        type: String,
        required: true,
        enum: [
            "Very positive and eager to learn",
            "Generally positive but needs encouragement",
            "Neutral or inconsistent",
            "Lacks enthusiasm or engagement"
        ]
    },
    behaviorAndProfessionalism: {
        type: String,
        required: true,
        enum: [
            "Very professional and respectful",
            "Mostly professional, with minor lapses",
            "Occasionally unprofessional",
            "Often unprofessional"
        ]
    },
    overallRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    additionalFeedback: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("MentorFeedback", mentorFeedbackSchema);
