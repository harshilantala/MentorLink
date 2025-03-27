const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");
const mentorController = require("../controllers/mentor.controller");
const Logger = require("../middlewares/logger");
const events = require("../utils/logEvents");
const multer = require("multer");

// ✅ Use Disk Storage Instead (Optional: If you prefer temp file storage instead of memory)
const storage = multer.memoryStorage();

// ✅ File Filter to Ensure No File Starts with "image"
const fileFilter = (req, file, cb) => {
    if (file.originalname.toLowerCase().startsWith("image")) {
        cb(new Error("File name should not start with 'image'"), false);
    } else if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PDF and images are allowed."), false);
    }
};

// ✅ Multer Configuration (5MB Limit)
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Mentor login
router.post("/login", mentorController.mentorLoginHandler, Logger(events.LOGIN));

// Mentor signup - ✅ Pass file as buffer
router.post("/signup", upload.single("qualificationProof"), mentorController.mentorSignupHandler, Logger(events.SIGNUP));

// Mentor dashboard
router.get("/dashboard", Auth, Authorize(Role.Mentor), mentorController.mentorDashboardHandler);

// Get all mentees
router.get("/getAllMentees", Auth, Authorize(Role.Mentor), mentorController.fetchAllMentees);

// Get all semesters info of mentee
router.get("/getSemesters/:id", Auth, Authorize(Role.Mentor), mentorController.fetchStudentSemesters);

// Update profile
router.post("/profile", Auth, Authorize(Role.Mentor), mentorController.updateProfile);

// Get profile
router.get("/profile", Auth, Authorize(Role.Mentor), mentorController.getProfile);

router.post("/feedback", Auth, Authorize(Role.Mentor), mentorController.submitFeedback);

module.exports = router;
