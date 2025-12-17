const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const analyticsRoutes = require("./routes/analytics.js");
const cardsRoutes = require("./routes/cards.js");
const transactionsRoutes = require('./routes/transactions.js');
const notificationRoutes = require('./routes/notifications.js');
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const NotificationService = require("./services/notificationService.js");
const cors = require('cors');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Create notification service
const notificationService = new NotificationService(io);
app.set('notificationService', notificationService);

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    console.log("Socket auth attempt, token exists:", !!token);

    if (!token) {
        console.log("No token provided");
        return next(new Error("Authentication error - no token"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        console.log("Socket authenticated for user:", socket.userId);
        next();
    } catch (err) {
        console.log("Invalid token:", err.message);
        next(new Error("Authentication error - invalid token"));
    }
});

io.on("connection", async (socket) => {
    console.log(`User ${socket.userId} connected (Socket: ${socket.id})`);

    // Register user automatically (no manual "register" event needed!)
    notificationService.registerUser(socket.userId, socket.id);

    // Send unseen notifications

    socket.on("disconnect", () => {
        console.log(`User ${socket.userId} disconnected`);
        notificationService.unregisterSocket(socket.id);
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));