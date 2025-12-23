const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate, authorize } = require("../middleware/auth");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// GET /api/admin/users - Get all users with filtering
router.get("/users", authenticate, authorize("ADMIN"), async (req, res) => {
    try {
        const { firstName, lastName, username, email } = req.query;

        const where = {};
        if (firstName) where.firstName = { contains: firstName, mode: 'insensitive' };
        if (lastName) where.lastName = { contains: lastName, mode: 'insensitive' };
        if (username) where.username = { contains: username, mode: 'insensitive' };
        if (email) where.email = { contains: email, mode: 'insensitive' };

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                phoneNumber: true,
                role: true,
                createdAt: true,
                profileImage: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: error.message });
    }
});

// PATCH /api/admin/users/:id - Update user info (Admin only)
router.patch("/users/:id", authenticate, authorize("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, username, email, phoneNumber } = req.body;

        // Check if target user is an admin
        const targetUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!targetUser) return res.status(404).json({ error: "User not found" });

        if (targetUser.role === "ADMIN") {
            return res.status(403).json({ error: "Cannot edit an administrator account via this panel." });
        }

        // Check for duplicates
        if (email || username || phoneNumber) {
            const userId = parseInt(id);
            const conflicts = await prisma.user.findFirst({
                where: {
                    OR: [
                        email ? { email } : null,
                        username ? { username } : null,
                        phoneNumber ? { phoneNumber } : null
                    ].filter(Boolean),
                    NOT: { id: userId }
                }
            });

            if (conflicts) {
                if (email && conflicts.email === email) return res.status(400).json({ error: "Email is already in use by another user" });
                if (username && conflicts.username === username) return res.status(400).json({ error: "Username is already in use by another user" });
                if (phoneNumber && conflicts.phoneNumber === phoneNumber) return res.status(400).json({ error: "Phone number is already in use by another user" });
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                firstName,
                lastName,
                username,
                email,
                phoneNumber
            }
        });

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/admin/users/:id - Delete user (Admin only)
router.delete("/users/:id", authenticate, authorize("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;

        // Check if target user is an admin
        const targetUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!targetUser) return res.status(404).json({ error: "User not found" });

        if (targetUser.role === "ADMIN") {
            return res.status(403).json({ error: "Cannot delete an administrator account." });
        }

        // Cleanup image file
        if (targetUser.profileImage) {
            const fileName = targetUser.profileImage.split("/").pop();
            const imagePath = path.join(__dirname, "../uploads", fileName);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await prisma.user.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
