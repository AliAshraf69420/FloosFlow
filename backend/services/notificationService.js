// services/notificationService.js
const prisma = require("../prisma/prisma-client");

let instance = null;

class NotificationService {
    constructor(io) {
        if (instance) return instance; // Return existing instance

        this.io = io;
        this.onlineUsers = {}; // userId -> socketId

        instance = this;
    }

    setIo(io) {
        this.io = io; // set io later if not passed in constructor
    }

    registerUser(userId, socketId) {
        this.onlineUsers[userId] = socketId;
    }

    unregisterSocket(socketId) {
        for (const userId in this.onlineUsers) {
            if (this.onlineUsers[userId] === socketId) delete this.onlineUsers[userId];
        }
    }

    async sendNotification(userId, message, type) {
        const notification = await prisma.notification.create({
            data: { userId, message, type },
        });

        const socketId = this.onlineUsers[userId];
        if (socketId && this.io) this.io.to(socketId).emit("notification", notification);

        return notification;
    }

    async getNotifications(userId) {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }
    async sendUnseen(userId) {
        const socketId = this.onlineUsers[userId];
        if (!socketId || !this.io) return;

        const unseen = await prisma.notification.findMany({
            where: { userId, read: false },
            orderBy: { createdAt: "asc" },
        });

        unseen.forEach((n) => this.io.to(socketId).emit("notification", n));
    }

    // Mark notification as seen
    async markAsSeen(notificationId) {
        return prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });
    }
}

module.exports = NotificationService;
