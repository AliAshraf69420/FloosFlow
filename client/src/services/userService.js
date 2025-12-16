// src/services/userService.js
import apiClient from './apiClient';

const userService = {
    // Get personal info
    getPersonalInfo: async () => {
        const response = await apiClient.get('/users/me');
        return response.data;
    },

    // Update personal info
    updateInfo: async (userData) => {
        const response = await apiClient.patch('/users/me', userData);
        return response.data;
    },

    // Upload profile image
    uploadProfileImage: async (imageFile) => {
        const formData = new FormData();
        formData.append('profileImage', imageFile);

        const response = await apiClient.post('/users/me/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete profile image
    deleteProfileImage: async () => {
        const response = await apiClient.delete('/users/me/upload-image');
        return response.data;
    },

    // Change balance (admin or specific operation)
    changeBalance: async (amount, operation = 'add') => {
        const response = await apiClient.patch('/user/balance', {
            amount,
            operation, // 'add' or 'subtract'
        });
        return response.data;
    }
};

export default userService;