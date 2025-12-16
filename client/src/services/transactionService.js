// src/services/transactionService.js
import apiClient from './apiClient';

const transactionService = {
    // Get all transactions
    getAllTransactions: async (params = {}) => {
        const response = await apiClient.get('/transactions/transactions', { params });
        return response.data;
    },

    // Get all transfers
    getAllTransfers: async (params = {}) => {
        const response = await apiClient.get('/transactions/transfers', { params });
        return response.data;
    },

    // Add new transaction
    addTransaction: async (transactionData) => {
        const response = await apiClient.post('/transactions/add-transaction', transactionData);
        return response.data;
    },

    // Transfer money
    transferMoney: async (transferData) => {
        const response = await apiClient.post('/transactions/transfer-money', transferData);
        return response.data;
    },

    // Add card

};

export default transactionService;