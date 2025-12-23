const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/analytics", authenticate, async (req, res) => {
    try {
        const { range } = req.query;
        let startDate = new Date(0); // Default to all time if no range or invalid range

        const now = new Date();
        if (range === "24h") {
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        } else if (range === "week") {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (range === "month") {
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else if (range === "year") {
            startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        }

        // Get transactions of the logged-in user within the time range
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: req.userId,
                date: { gte: startDate }
            },
            select: { money: true, category: true }
        });

        if (transactions.length === 0) {
            return res.json({ total: 0, data: [] });
        }

        // Calculate total money (money is Decimal, so we convert to number)
        const total = transactions.reduce((sum, t) => sum + Number(t.money), 0);

        // Group by category
        const categoryTotals = {};
        transactions.forEach(t => {
            const amount = Number(t.money);
            if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
            categoryTotals[t.category] += amount;
        });

        // Convert to array of { label, value, percentage }
        const data = Object.entries(categoryTotals).map(([category, value]) => ({
            label: category,
            value,
            percentage: total > 0 ? ((value / total) * 100).toFixed(2) : "0.00"
        }));

        res.json({ total, data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
