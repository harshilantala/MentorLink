const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../models/Student");
const Semester = require("../models/Semester");
const response = require("../utils/responses.utils");
const emailService = require("../services/email.service");
const roles = require("../utils/roles");
const { uploadFile, cloudinary } = require("../utils/cloudnary");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const MentorFeedback = require('../models/Feedbackmentor');

// env config
dotenv.config();

module.exports = {
    // mentor login handler function
    mentorLoginHandler: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send(Response.error("No email/password provided", {}));
            }
            const mentor = await Mentor.findByCredentials(email, password);

            if (!mentor) {
                return res.status(404).send(Response.notfound("404 Not found", {}));
            }

            // if (!mentor.isEmailVerified) {
            //     const token = jwt.sign(
            //         { _id: mentor._id.toString(), role: roles.Mentor },
            //          'secret'
            //     );

            //     mentor.emailVerifyToken = token;
            await mentor.save();

            //     // sending email to mentor with link
            //     emailService.sendEmailVerificationMail(token, mentor.email);

            //     return response.error(
            //         res,
            //         "Email not verified. We have sent a link. Please check your email"
            //     );
            // }

            // if banned
            if (mentor.isBanned) {
                return response.unauthorize(res, "Your account has been suspended");
            }

            const token = await mentor.generateAuthToken();

            response.success(res, "Login Successfull", {
                auth_token: token,
                role: "MENTOR",
                uid: mentor._id,
            });

            req.user = mentor;
            next();
        } catch (err) {
            console.log(err);
            // if password is invalid
            if (err.message === "Unable to login") {
                return response.unauthorize(res, "Invalid credentials");
            }

            response.error(res, "Login Unsuccessfull");
        }
    },

    // mentor signup handl

    mentorSignupHandler: async (req, res, next) => {
        try {
            const {
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                middleName,
                department,
                experience,
                specialization,
            } = req.body;
    
            if (!email || !password || !confirmPassword) {
                return res.status(400).json({ error: "Malformed input" });
            }
    
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Passwords don't match" });
            }
    
            if (!req.file) {
                return res.status(400).json({ error: "Qualification proof is required" });
            }
    
            console.log("Uploading image to Cloudinary...");
    
            // ✅ Upload image to Cloudinary
            const uploadToCloudinary = async (buffer) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: "mentor_qualifications", resource_type: "image" },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary upload error:", error);
                                return reject(error);
                            }
                            resolve(result.secure_url);
                        }
                    );
                    uploadStream.end(buffer);
                });
            };
    
            let qualificationProofUrl;
            try {
                qualificationProofUrl = await uploadToCloudinary(req.file.buffer);
                console.log("Cloudinary upload successful:", qualificationProofUrl);
            } catch (uploadErr) {
                console.error("Cloudinary upload failed:", uploadErr);
                return res.status(500).json({ error: "Image upload failed" });
            }
    
            if (!qualificationProofUrl) {
                return res.status(500).json({ error: "Image URL is empty after upload" });
            }
    
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            // ✅ Save mentor details in database
            const mentor = new Mentor({
                email,
                password: hashedPassword,
                firstName: firstName,
                middleName: middleName || "",
                lastName: lastName || "",
                department,
                experience,
                specialization,
                qualificationProof: { url: qualificationProofUrl },  // Ensure this matches schema
            });
    
            // Log qualification proof URL
            console.log(qualificationProofUrl);
    
            await mentor.save();
    
            // ✅ Pass mentor object to next middleware (Logger)
            res.locals.mentor = mentor;
    
            res.status(201).json({ message: "Mentor Signup successful", mentor });
            next();
        } catch (err) {
            console.error("Signup error:", err);
    
            if (err.code === 11000) {
                return res.status(400).json({ error: "Email already exists" });
            }
    
            res.status(500).json({ error: "Internal Server Error" });
        }
    },    
    

    // mentor dashboard handler
    mentorDashboardHandler: async (req, res, next) => {
        try {
            response.success(res, "Email already exists", { user: req.user });
            next();
        } catch (err) {
            console.log(err);
        }
    },

    // reset password handler
    // resetPassword: async (req, res, next) => {
    //     try {
    //         const mentor = await Mentor.findOne({ email: req.body.email });

    //         if (!mentor) {
    //             return response.notfound(res, "User not found");
    //         }

    //         const token = jwt.sign(
    //             { _id: mentor._id.toString(), role: mentor.role },
    //             process.env.JWT_SECRET,
    //             {
    //                 expiresIn: "1h",
    //             }
    //         );
    //         mentor.passwordResetToken = token;
    //         await mentor.save();

    //         // sending reset password link to the mentor
    //         await emailService.sendPasswordResetMail(token, mentor.email);
    //         response.success(res, "Password reset link sent");
    //     } catch (err) {
    //         console.log(err);
    //         response.error(res);
    //     }
    // },
    /**
     * The method sets new passord of the user upon succcessful verification
     */
    // setNewPassword: async (req, res, next) => {
    //     try {
    //         const { token, password, confirmPassword } = req.body;
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         const mentor = await Mentor.findOne({ _id: decoded._id, passwordResetToken: token });

    //         // if mentor not found
    //         if (!mentor) {
    //             return response.error(res);
    //         }

    //         // checking if both password are provided
    //         if (!password || !confirmPassword) {
    //             return response.error(res, "Both passwords are required");
    //         }

    //         // checking if the passwords are similar
    //         if (password != confirmPassword) {
    //             return response.error(res, "Passwords doesn't match");
    //         }

    //         //setting new password
    //         const hashedPassword = await bcrypt.hash(password, 8);
    //         mentor.password = hashedPassword;
    //         await mentor.save();
    //         response.success(res, "Password updated", mentor);
    //     } catch (err) {
    //         console.log(err);
    //         // if token expired
    //         if (err.message.toString() == "jwt expired") {
    //             return response.error(res, "Token expired");
    //         }
    //         response.error(res, "Invalid token");
    //     }
    // },

    fetchAllMentees: async (req, res, next) => {
        try {
            const students = await Student.find({ mentoredBy: req.user._id });
            response.success(res, "", { mentees: students });
            next();
        } catch (err) {
            response.error(res);
        }
    },

    // fetch students semesters
    fetchStudentSemesters: async (req, res, next) => {
        try {
            const _id = req.params.id;
            const semesters = await Semester.find({ student_id: _id });
            response.success(res, "", { semesters });
            next();
        } catch (err) {
            response.error(res);
        }
    },

    // get mentor profile
    getProfile: async (req, res, next) => {
        try {
            response.success(res, "", { profileData: req.user });
            next();
        } catch (err) {
            response.error(res);
        }
    },

    // create or update profile
    updateProfile: async (req, res, next) => {
        try {
            const { firstName, middleName, lastName, phone, address, department, designation } =
                req.body;
            const mentor = req.user;

            // updating data
            mentor.firstName = firstName || mentor.firstName;
            mentor.middleName = middleName || "";
            mentor.lastName = lastName || mentor.lastName;
            mentor.phone = phone || mentor.phone;
            mentor.address = address || mentor.address;
            mentor.department = department || mentor.department;
            mentor.designation = designation || mentor.designation;

            console.log(mentor.firstName);
            

            await mentor.save();
            response.success(res, "Profile updated", { profileData: mentor });
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },



    submitFeedback : async (req, res) => {
        try {
            console.log("🔹 Received Data:", req.body);
    
            // Validate data before saving
            const { conceptualUnderstanding, natureAndAttitude, behaviorAndProfessionalism, overallRating, additionalFeedback } = req.body;
    
            // Ensure required fields exist
            if (!conceptualUnderstanding || !natureAndAttitude || !behaviorAndProfessionalism || !overallRating) {
                return res.status(400).json({ message: "All required fields must be filled." });
            }
    
            // Ensure overall rating is within range
            if (overallRating < 1 || overallRating > 5) {
                return res.status(400).json({ message: "Overall rating must be between 1 and 5." });
            }
    
            // Create feedback instance
            const feedback = new MentorFeedback({
                conceptualUnderstanding,
                natureAndAttitude,
                behaviorAndProfessionalism,
                overallRating,
                additionalFeedback
            });
    
            // Save to database
            const savedFeedback = await feedback.save();
    
            console.log(" Feedback Saved:", savedFeedback);
            res.status(201).json({
                message: "Feedback submitted successfully",
                feedback: savedFeedback
            });
        } catch (error) {
            console.error(" Error Saving Feedback:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },
      
};  