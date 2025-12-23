const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const { upload, handleUploadError, validateFileUpload } = require('../services/uploadService')
const router = express.Router();
const path = require("path");
const fs = require("fs");
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
                        cardType: true,
                        cardHolder: true,
                        expiryDate: true,
                        isSelectedForReceiving: true,
                        isActive: true
                    },
                    where: {
                        isActive: true
                    }
                },
                transactions: {
                    select: {
                        id: true,
                        transactionName: true,
                        money: true,
                        date: true,
                        category: true,
                        message: true,
                        merchantName: true,

                        card: {
                            select: {
                                cardNumber: true
                            }
                        }
                    }
                },     // or select specific fields if needed
                sentTransfers: true,
                receivedTransfers: true,
            }
        });

        // Get the card that is selected for receiving
        const selectedReceivingCard = await prisma.card.findFirst({
            where: {
                userId: req.userId,
                isSelectedForReceiving: true,
                isActive: true
            },
            select: {
                id: true,
                cardNumber: true,
                balance: true,
                cardType: true,
                cardHolder: true,
                expiryDate: true,
                isSelectedForReceiving: true,
                isActive: true
            }
        });

        res.json({
            ...user,
            selectedReceivingCard
        });
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
            where: { id: req.userId, },
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
                    select: {
                        id: true,
                        cardNumber: true,
                        balance: true,
                        cardType: true,
                        cardHolder: true,
                        expiryDate: true,
                        isSelectedForReceiving: true,
                        isActive: true
                    },
                    where: {
                        isActive: true
                    }
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
router.post("/me/upload-image", authenticate, upload.single("image"), handleUploadError, async (req, res) => {
    try {
        console.log("Starting")
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { profileImage: true },
        });

        // Delete old image safely
        if (user?.profileImage) {
            const oldFileName = user.profileImage.split("/").pop();
            const oldPath = path.join(__dirname, "../uploads", oldFileName);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        console.log("Multer")
        // Store full URL
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: { profileImage: imageUrl },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                phoneNumber: true,
                profileImage: true,
                createdAt: true,
            },
        });

        res.json({ message: "Profile image updated successfully", user: updatedUser });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
});

// ---------------- Delete Profile Image ----------------
router.delete("/me/delete-image", authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { profileImage: true },
        });

        if (!user?.profileImage) {
            return res.status(400).json({ error: "No profile image to delete" });
        }

        const fileName = user.profileImage.split("/").pop();
        const imagePath = path.join(__dirname, "../uploads", fileName);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

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
                createdAt: true,
            },
        });

        res.json({ message: "Profile image deleted successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); router.post("/me/update-password", authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        console.log(currentPassword)
        console.log(newPassword)
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Both current and new passwords are required" });
        }

        // Get the user
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Verify current password
        if (user.password && !(user.googleId)) {
            const isMatch = await bcrypt.compare(currentPassword, user.password); // <- await here
            if (!isMatch) {
                return res.status(400).json({ error: "Current password is incorrect" });
            }
        }


        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.userId },
            data: { password: hashedPassword },
        });

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;