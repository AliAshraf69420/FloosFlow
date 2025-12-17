import apiClient from './apiClient';
const cardService = {
    addCard: async (cardData) => {
        try {
            const response = await apiClient.post('/cards/add-card', cardData);
            console.log(response.data);
            return response.data;
        }

        catch (error) {
            console.log(error);
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
            console.log(err)
        }
    },
    selectReceivingCard: async (cardId) => {
        return await apiClient.patch(`/cards/${cardId}/select-receiving`);
    },
}

export default cardService;