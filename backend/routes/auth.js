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
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
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
                email,
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
// routes/auth.js
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.password) {
            return res.status(400).json({ error: "This account only supports Google login" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = generateToken(user.id);

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.profileImage || null,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error, please try again later" });
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
        console.log("=== Google OAuth Callback ===");
        console.log("User from passport:", req.user);

        const user = req.user;

        if (!user) {
            console.error("No user returned from passport!");
            return res.redirect("http://localhost:5173/Login?error=auth_failed");
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("Generated token for user:", user.id);

        // Redirect to frontend with token & user
        const frontendUrl = "http://localhost:5173";
        const userData = encodeURIComponent(JSON.stringify({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
        }));

        res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${userData}`);

    }
);

module.exports = router;
