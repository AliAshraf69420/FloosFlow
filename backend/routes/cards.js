const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate } = require("../middleware/auth");


const router = express.Router();
router.patch("/:cardId/balance", authenticate, async (req, res) => {
    const { cardId } = req.params;
    const { balance } = req.body;

    if (balance === undefined || typeof balance !== "number") {
        return res.status(400).json({ error: "balance must be a number" });
    }

    try {
        // Fetch the card and verify ownership
        const card = await prisma.card.findUnique({ where: { id: parseInt(cardId) } });
        if (!card) return res.status(404).json({ error: "Card not found" });
        if (card.userId !== req.userId) return res.status(403).json({ error: "You do not own this card" });

        // Update balance
        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: { balance }
        });

        res.json({ message: "Balance updated successfully", card: updatedCard });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/add-card", authenticate, async (req, res) => {
    const { cardNumber, cardHolder, balance, expiryDate, cvv } = req.body;

    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        return res.status(400).json({ error: "cardNumber, cardHolder, expiryDate, and cvv are required" });
    }


    try {
        // Optional: check if the cardNumber already 
        if (cardNumber.length != 16) {
            return res.status(400).json({ error: "Any Card needs to be 16 digits" })
        }
        const existingCard = await prisma.card.findUnique({ where: { cardNumber } });
        if (existingCard) return res.status(400).json({ error: "Card number already exists" });

        const card = await prisma.card.create({
            data: {
                cardNumber,
                cardHolder,
                balance: balance || 0,
                expiryDate: expiryDate,
                cvv: cvv,
                userId: req.userId // link card to logged-in user
            }
        });

        res.status(201).json({ message: "Card added successfully", card });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete("/:cardId", authenticate, async (req, res) => {
    const { cardId } = req.params;

    try {
        const card = await prisma.card.findUnique({ where: { id: parseInt(cardId) } });
        if (!card) return res.status(404).json({ error: "Card not found" });
        if (card.userId !== req.userId) return res.status(403).json({ error: "You do not own this card" });

        // Soft delete by setting isActive = false
        const deletedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: { isActive: false }
        });

        res.json({ message: "Card deleted successfully (soft delete)", card: deletedCard });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;