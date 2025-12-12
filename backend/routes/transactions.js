const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate } = require("../middleware/auth");
const NotificationService = require("../services/notificationService");
const notificationService = new NotificationService(); // singleton


const router = express.Router();

// Add Transaction
// Get all transactions for logged-in user
router.get("/transactions", authenticate, async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId: req.userId },
            include: { card: true }, // include card info
            orderBy: { date: "desc" } // latest first
        });

        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get all transfers for logged-in user
router.get("/transfers", authenticate, async (req, res) => {
    try {
        const sentTransfers = await prisma.transfer.findMany({
            where: { senderId: req.userId },
            include: {
                senderCard: true,
                recipientCard: true,
                recipient: { select: { id: true, firstName: true, lastName: true, email: true } }
            },
            orderBy: { date: "desc" }
        });

        const receivedTransfers = await prisma.transfer.findMany({
            where: { recipientId: req.userId },
            include: {
                senderCard: true,
                recipientCard: true,
                sender: { select: { id: true, firstName: true, lastName: true, email: true } }
            },
            orderBy: { date: "desc" }
        });

        res.json({ sentTransfers, receivedTransfers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/add-transaction", authenticate, async (req, res) => {
    const { money, category, merchantName, message, cardId } = req.body;

    if (!money || !category || !merchantName || !cardId) {
        return res.status(400).json({ error: "money, category, merchantName, and cardId are required" });
    }

    try {
        // Get the card and verify it belongs to the user
        const card = await prisma.card.findUnique({ where: { id: cardId } });
        if (!card) return res.status(404).json({ error: "Card not found" });
        if (card.userId !== req.userId) return res.status(403).json({ error: "Card does not belong to user" });

        // Check if the card has enough balance
        if (card.balance < money) return res.status(400).json({ error: "Insufficient balance" });

        // Deduct balance
        await prisma.card.update({
            where: { id: cardId },
            data: { balance: card.balance - money }
        });

        // Create transaction
        const transaction = await prisma.transaction.create({
            data: {
                userId: req.userId,
                cardId,
                money,
                category,
                merchantName,
                message
            }
        });
        await notificationService.sendNotification(
            req.userId,
            `You spent $${money} on ${merchantName}`,
            "transaction"
        );
        res.status(201).json({ message: "Transaction added", transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Transfer Money
router.post("/transfer-money", authenticate, async (req, res) => {
    const { recipientId, amount, reason, message, senderCardId, recipientCardId } = req.body;

    if (!recipientId || !amount || !senderCardId) {
        return res.status(400).json({ error: "recipientId, amount, and senderCardId are required" });
    }
    if (req.userId == recipientId) {
        return res.status(400).json({ error: "User can't send to himself" })
    }

    try {
        const sender = await prisma.user.findUnique({ where: { id: req.userId } });
        const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
        const senderCard = await prisma.card.findUnique({ where: { id: senderCardId } });

        if (!recipient) return res.status(404).json({ error: "Recipient not found" });
        if (!senderCard) return res.status(404).json({ error: "Sender card not found" });
        if (senderCard.userId !== req.userId) return res.status(403).json({ error: "Card does not belong to sender" });
        if (senderCard.balance < amount) return res.status(400).json({ error: "Insufficient balance" });

        // Deduct from sender card
        await prisma.card.update({
            where: { id: senderCardId },
            data: { balance: senderCard.balance - amount }
        });

        // Add to recipient card if provided
        if (recipientCardId) {
            const recipientCard = await prisma.card.findUnique({ where: { id: recipientCardId } });
            if (!recipientCard) return res.status(404).json({ error: "Recipient card not found" });
            await prisma.card.update({
                where: { id: recipientCardId },
                data: { balance: recipientCard.balance + amount }
            });
        }

        // Create transfer record
        const transfer = await prisma.transfer.create({
            data: {
                senderId: req.userId,
                recipientId,
                senderCardId,
                recipientCardId,
                amount,
                reason,
                message
            }
        });
        await notificationService.sendNotification(
            req.userId,
            `You sent $${amount} to ${recipient.firstName} ${recipient.lastName}`,
            "sent"
        );

        await notificationService.sendNotification(
            recipientId,
            `You received $${amount} from ${req.userId}`,
            "received"
        );
        res.status(201).json({ message: "Transfer successful", transfer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;