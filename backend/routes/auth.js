const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prisma-client");
const passport = require("../utils/oauth");

const router = express.Router();

// Helper: issue JWT
function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

/* ================================
   REGISTER (email/password)
================================ */
router.post("/register", async (req, res) => {
    const { firstName, lastName, username, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !username || !email || !phoneNumber || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                phoneNumber,
                password: hashed,
            },
        });

        const token = generateToken(user.id);

        res.status(201).json({
            message: "User registered",
            token,
            user,
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ================================
   LOGIN (email/password)
================================ */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.password)
            return res.status(400).json({ error: "This account only supports Google login" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid password" });

        const token = generateToken(user.id);
        res.json({ message: "Login successful", token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ================================
   GOOGLE LOGIN (redirect)
================================ */
router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

// Google callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => {
        const user = req.user;

        // Issue JWT for frontend
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Send token and user info
        res.json({
            message: "Google login successful",
            token,
            user,
        });
    }
);


module.exports = router;
