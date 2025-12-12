const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const upload = require('../services/uploadService')
const router = express.Router();

// Get current user info
router.get("/me", authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                phoneNumber: true,
                profileImage: true,
                createdAt: true,
                cards: {
                    select: {
                        id: true,
                        cardNumber: true,
                        balance: true,
                        bankName: true
                        // userId excluded
                    }
                },
                transactions: true,       // or select specific fields if needed
                sentTransfers: true,
                receivedTransfers: true
            }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.patch("/me", authenticate, async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const dataToUpdate = {};

        if (firstName) dataToUpdate.firstName = firstName;
        if (lastName) dataToUpdate.lastName = lastName;
        if (username) dataToUpdate.username = username;
        if (email) dataToUpdate.email = email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            dataToUpdate.password = hashedPassword;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: dataToUpdate,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                phoneNumber: true,
                profileImage: true,
                createdAt: true,
                cards: {
                    select: { id: true, cardNumber: true, balance: true, bankName: true }
                },
                transactions: true,
                sentTransfers: true,
                receivedTransfers: true
            }
        });

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/me/upload-image", authenticate, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        // Fetch the old image filename
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { profileImage: true }
        });

        // Delete old image if exists
        if (user.profileImage) {
            const oldPath = path.join(__dirname, "../uploads", user.profileImage);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        // Update the user with the new image
        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: { profileImage: req.file.filename },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                phoneNumber: true,
                profileImage: true,
                createdAt: true
            }
        });

        res.json({ message: "Profile image updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/me/delete-image", authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { profileImage: true }
        });

        if (!user || !user.profileImage) {
            return res.status(400).json({ error: "No profile image to delete" });
        }

        // Delete the file from server
        const imagePath = path.join(__dirname, "../uploads", user.profileImage);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        // Remove reference in DB
        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: { profileImage: null },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                phoneNumber: true,
                profileImage: true,
                createdAt: true
            }
        });

        res.json({ message: "Profile image deleted successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;