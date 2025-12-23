// services/notificationService.js
const prisma = require("../prisma/prisma-client");

class NotificationService {
    constructor(io) {
        this.io = io;
        this.onlineUsers = new Map(); // safer than {}
    }

    registerUser(userId, socketId) {
        this.onlineUsers.set(String(userId), socketId);
    }

    unregisterSocket(socketId) {
        for (const [userId, sId] of this.onlineUsers.entries()) {
            if (sId === socketId) {
                this.onlineUsers.delete(userId);
                break;
            }
        }
    }

    async sendNotification(userId, message, type, userMessage) {
        const notification = await prisma.notification.create({
            data: { userId, message, type, UserMessage: userMessage },
        });

        const socketId = this.onlineUsers.get(String(userId));

        if (!this.io) {
            console.error("IO IS UNDEFINED");
            return notification;
        }

        if (!socketId) {
            console.warn("User offline:", userId);
            return notification;
        }

        this.io.to(socketId).emit("notification", notification);
        console.log("Notification emitted to", userId);

        return notification;
    }

    async sendUnseen(userId) {
        const socketId = this.onlineUsers.get(String(userId));
        if (!socketId || !this.io) return;

        const unseen = await prisma.notification.findMany({
            where: { userId, read: false },
            orderBy: { createdAt: "asc" },
        });

        unseen.forEach(n =>
            this.io.to(socketId).emit("notification", n)
        );
    }
    async markAsSeen(notificationId, userId) {
        const notification = await prisma.notification.findFirst({
            where: {
                id: notificationId,
                userId: userId
            }
        });

        if (!notification) return null;

        return prisma.notification.update({
            where: { id: notificationId },
            data: { read: true }
        });
    }
}

module.exports = NotificationService;
