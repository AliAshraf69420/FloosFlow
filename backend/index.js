const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const analyticsRoutes = require("./routes/analytics.js");
const cardsRoutes = require("./routes/cards.js");
const transactionsRoutes = require('./routes/transactions.js');
const notificationRoutes = require('./routes/notifications.js')
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const NotificationService = require("./services/notificationService.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});


const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// Set the Socket.IO instance in the NotificationService singleton
const notificationService = new NotificationService();
notificationService.setIo(io);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("register", async (userId) => {
        notificationService.registerUser(userId, socket.id);
        await notificationService.sendUnseen(userId);
    });


    socket.on("disconnect", () => {
        notificationService.unregisterSocket(socket.id);
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
