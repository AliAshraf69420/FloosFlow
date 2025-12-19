const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/analytics", authenticate, async (req, res) => {
    try {
        // Get all transactions of the logged-in user
        const transactions = await prisma.transaction.findMany({
            where: { userId: req.userId },
            select: { money: true, category: true }
        });

        if (transactions.length === 0) {
            return res.json({ total: 0, data: [] });
        }

        // Calculate total money
        const total = transactions.reduce((sum, t) => sum + t.money, 0);

        // Group by category
        const categoryTotals = {};
        transactions.forEach(t => {
            if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
            categoryTotals[t.category] += t.money;
        });

        // Convert to array of { label, value, percentage }
        const data = Object.entries(categoryTotals).map(([category, value]) => ({
            label: category,
            value,
            percentage: ((value / total) * 100).toFixed(2) // two decimal points
        }));

        res.json({ total, data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
