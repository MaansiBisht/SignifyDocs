const express = require("express");
const User = require("../models/User");
const Form = require("../models/Form");
const mongoose = require('mongoose');
const verifyFirebaseToken = require("../middleware/firebaseauth");

const router = express.Router();

// Login User
router.post("/login", verifyFirebaseToken, async (req, res) => {
    const { uid, email, name } = req.user; // Extract Firebase user data

    try {
        // Check if the user already exists in MongoDB
        let user = await User.findOne({ firebaseUid: uid });

        if (!user) {
            // If not, create a new user in MongoDB
            user = new User({
                firebaseUid: uid,
                email: email,
                displayName: name || "Anonymous User",
            });
            await user.save();
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
});

// Protected Route Example
router.get("/profile", verifyFirebaseToken, async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile", error });
    }
});

// Register User
router.post("/register", verifyFirebaseToken, async (req, res) => {
    const { uid, email, name } = req.user; // Extract Firebase user data
    const { role } = req.body; // Extract additional user data from the request body

    try {
        // Check if the user already exists in MongoDB
        let user = await User.findOne({ firebaseUid: uid });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user in MongoDB
        user = new User({
            firebaseUid: uid,
            email: email,
            displayName: name || "Anonymous User",
            role: role, // Save the user role
        });
        await user.save();

        res.status(201).json({ message: "Registration successful", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Submit Form
router.post("/submit",verifyFirebaseToken,async (req, res) => {
    const formData = req.body;
    formData.uid = req.user.uid; // Add the uid from the authenticated user
    const form = new Form(formData);
    try {
        await form.save();
        res.status(201).send("Form data saved successfully");
    } catch (error) {
        res.status(400).send("Error saving form data");
    }
});

// Fetch all documents for a specific user
router.get('/documents/user/:uid', verifyFirebaseToken, async (req, res) => {
    try {
        const { uid } = req.params;
        const documents = await Form.find({ uid });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user documents' });
    }
});

// Fetch all documents for all users - Admin view
router.get('/documents/users', verifyFirebaseToken, async (req, res) => {
    try {
        const documents = await Form.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user documents' });
    }
});

router.get('/users/:uid/role', verifyFirebaseToken, async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findOne({ firebaseUid: uid });
        if (user) {
            res.status(200).json({ role: user.role });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user role' });
    }
});


// Update document status
router.post("/document/updatestatus", verifyFirebaseToken, async (req, res) => {
    
    const { documentId, status } = req.body;
    console.log(status,documentId)
    try {
        await Form.findByIdAndUpdate(
            documentId,
            { status },
            { new: true });
            res.status(200).json({
                message: "Status updated successfully",
                updatedStatus: status ,

            });
    } catch (error) {
        console.log(error)
        res.status(500).send("Error updating status");
    }
});


module.exports = router;
