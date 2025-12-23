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
}); router.post("/add-card", authenticate, async (req, res) => {
    const { cardNumber, cardHolder, balance, expiryDate, cvv, cardType } = req.body;

    // Basic required fields check
    if (!cardNumber || !cardHolder || !expiryDate || !cvv || !cardType) {
        return res.status(400).json({ error: "cardNumber, cardHolder, expiryDate, cvv, and cardType are required" });
    }

    try {
        // Check card number length
        if (cardNumber.length !== 16) {
            return res.status(400).json({ error: "Card number must be 16 digits" });
        }

        // Check CVV length (3 or 4 digits depending on card type)
        const cvvLength = cvv.length;
        if (detectedCardCVVLength(cardType) !== cvvLength) {
            return res.status(400).json({ error: `${cardType} CVV must be ${detectedCardCVVLength(cardType)} digits` });
        }

        // Check expiry date format MM/YY
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return res.status(400).json({ error: "Expiry date must be in MM/YY format" });
        }

        const [month, year] = expiryDate.split("/").map(Number);
        if (month < 1 || month > 12) {
            return res.status(400).json({ error: "Expiry month must be between 01 and 12" });
        }

        // Check if card is expired
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // get last two digits
        const currentMonth = currentDate.getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return res.status(400).json({ error: "Card has already expired" });
        }

        // Optional: check if card number already exists
        const existingCard = await prisma.card.findUnique({ where: { cardNumber } });
        if (existingCard) return res.status(400).json({ error: "Card number already exists" });
        const cardCount = await prisma.card.count({
            where: { userId: req.userId, isActive: true },
        });

        const hasCards = cardCount > 0;

        const card = await prisma.card.create({
            data: {
                cardNumber,
                cardHolder,
                balance: balance || 0,
                expiryDate,
                cardType,
                cvv,
                userId: req.userId,// link card to logged-in user
                isSelectedForReceiving: !hasCards
            }
        });

        res.status(201).json({ message: "Card added successfully", card });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper function to detect expected CVV length based on card type
function detectedCardCVVLength(cardType) {
    switch (cardType.toUpperCase()) {
        case "AMEX":
            return 4;
        case "VISA":
        case "MASTERCARD":
        case "MEEZA":
        default:
            return 3;
    }
}

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

router.patch("/:cardId/select-receiving", authenticate, async (req, res) => {
    const { cardId } = req.params;

    try {
        const card = await prisma.card.findUnique({ where: { id: parseInt(cardId) } });
        if (!card) return res.status(404).json({ error: "Card not found" });
        if (card.userId !== req.userId) return res.status(403).json({ error: "You do not own this card" });

        await prisma.card.updateMany({
            where: { userId: req.userId },
            data: { isSelectedForReceiving: false }
        });

        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: { isSelectedForReceiving: true }
        });

        res.json({ message: "Receiving card updated successfully", card: updatedCard });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;