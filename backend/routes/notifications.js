const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prisma-client");
const router = express.Router();
const { authenticate } = require('../middleware/auth')
const NotificationService = require('../services/notificationService')
const notificationService = new NotificationService(); // or import your singleton instance

// Mark all unseen notifications as read
router.post("/read-all", authenticate, async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: req.userId, read: false }
        });

        const promises = notifications.map((n) => prisma.notification.update({
            where: { id: n.id },
            data: { read: true }
        }));

        await Promise.all(promises);
        res.json({ message: "All unseen notifications marked as read" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark a single notification as read
router.post("/:id/read", authenticate, async (req, res) => {
    try {
        const notification = await notificationService.markAsSeen(parseInt(req.params.id));
        res.json({ message: "Notification marked as read", notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router