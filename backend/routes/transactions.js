const express = require("express");
const prisma = require("../prisma/prisma-client");
const { authenticate } = require("../middleware/auth");
const NotificationService = require("../services/notificationService");



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
    const { transactionName, money, category, merchantName, message, cardId } = req.body;

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
                message,
                transactionName
            }
        });
        const notificationService = req.app.get("notificationService");

        await notificationService.sendNotification(
            req.userId,
            `You spent $${money} on ${merchantName}`,
            "transaction",
            message
        );
        res.status(201).json({ message: "Transaction added", transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/transfer-money", authenticate, async (req, res) => {
    const { recipientEmail, amount, senderCardId, reason, message } = req.body;

    // Validate required fields
    if (!recipientEmail || !amount || !senderCardId) {
        return res.status(400).json({
            error: "recipientEmail, amount, and senderCardId are required"
        });
    }

    try {
        const senderCard = await prisma.card.findUnique({ where: { id: senderCardId } });
        if (!senderCard) return res.status(404).json({ error: "Sender card not found" });
        if (senderCard.userId !== req.userId)
            return res.status(403).json({ error: "Card does not belong to sender" });
        if (senderCard.balance < amount)
            return res.status(400).json({ error: "Insufficient balance" });

        const recipient = await prisma.user.findUnique({ where: { email: recipientEmail } });
        if (!recipient) return res.status(404).json({ error: "Recipient not found" });
        if (recipient.id === req.userId) return res.status(400).json({ error: "Cannot send to yourself" });

        const recipientCard = await prisma.card.findFirst({
            where: {
                userId: recipient.id,
                isSelectedForReceiving: true,
                isActive: true
            }
        });
        if (!recipientCard)
            return res.status(400).json({ error: "Recipient has no selected receiving card" });

        await prisma.$transaction([
            prisma.card.update({
                where: { id: senderCard.id },
                data: { balance: senderCard.balance - amount }
            }),
            prisma.card.update({
                where: { id: recipientCard.id },
                data: { balance: recipientCard.balance + amount }
            }),
            prisma.transfer.create({
                data: {
                    senderId: req.userId,
                    senderCardId: senderCard.id,
                    recipientId: recipient.id,
                    recipientCardId: recipientCard.id,
                    amount,
                    reason,
                    message
                }
            })
        ]);
        // Get sender info for the notification
        const sender = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { email: true }
        });

        const notificationService = req.app.get("notificationService");

        await notificationService.sendNotification(
            req.userId,
            `You transfered $${amount} to ${recipientEmail}`,
            "transfer",
            message
        );


        await notificationService.sendNotification(
            recipient.id,
            `You recieved $${amount} from ${sender.email}`,
            "transfer",
            message
        );

        res.status(201).json({ message: "Transfer successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Request money - NO DATABASE RECORD, JUST NOTIFICATIONS
router.post("/request-money", authenticate, async (req, res) => {
    const { recipientEmail, amount, reason, message } = req.body;

    // Validate required fields
    if (!recipientEmail || !amount) {
        return res.status(400).json({
            error: "recipientEmail and amount are required"
        });
    }

    try {
        // Find recipient user by email
        const recipient = await prisma.user.findUnique({
            where: { email: recipientEmail },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });

        if (!recipient) {
            return res.status(404).json({ error: "Recipient not found" });
        }

        if (recipient.id === req.userId) {
            return res.status(400).json({ error: "Cannot request money from yourself" });
        }

        // Get requester info
        const requester = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });

        // Get notification service
        const notificationService = req.app.get("notificationService");

        // Send notification to recipient (person who will send money)
        await notificationService.sendNotification(
            recipient.id,
            `${requester.firstName} ${requester.lastName} is requesting $${amount}${reason ? ` for ${reason}` : ''}${message ? ` - "${message}"` : ''}`,
            "request",
            message,
            requester.email,  // Pass requester's email so recipient knows who to send to
            amount            // Pass the amount so recipient knows how much to send
        );

        // Send confirmation to requester
        await notificationService.sendNotification(
            req.userId,
            `Money request sent to ${recipient.firstName} ${recipient.lastName} for $${amount}`,
            "info",
            message
        );

        res.status(201).json({
            message: "Money request sent successfully"
        });

    } catch (error) {
        console.error("Request money error:", error);
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;