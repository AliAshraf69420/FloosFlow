import apiClient from './apiClient';
const cardService = {
    addCard: async (cardData) => {
        try {
            const response = await apiClient.post('/cards/add-card', cardData);
            return response.data;
        }

        catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Failed to add card";
            console.log(message)
            throw new Error(message);
        }
    },

    // Get all cards
    getAllCards: async () => {
        const response = await apiClient.get('/users/me');
        return response.data.cards;
    },

    deleteCard: async (cardId) => {
        try {
            const response = await apiClient.delete(`/cards/${cardId}`);
            console.log(response.data)
            return response.data;
        } catch (err) {
            const message =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to delete card";
            throw new Error(message);
        }
    },
    selectReceivingCard: async (cardId) => {
        return await apiClient.patch(`/cards/${cardId}/select-receiving`);
    },
}

export default cardService;