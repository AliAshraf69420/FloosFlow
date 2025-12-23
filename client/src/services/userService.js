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
    updatePassword: async ({ currentPassword, newPassword }) => {
        try {
            const response = await apiClient.post("/users/me/update-password", {
                currentPassword,
                newPassword,
            });
            return response.data;

        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    // Upload profile image
    uploadProfileImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            console.log("Uploading image:", imageFile);
            const response = await apiClient.post('/users/me/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("Upload response:", response.data);
            console.log("Uploaded image URL:", response.status);
            return response.data;
        }
        catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }

    },

    // Delete profile image
    deleteProfileImage: async () => {
        try {
            const response = await apiClient.delete('/users/me/delete-image');
            console.log(response.data)
            console.log(response.status)

            return response.data;
        }
        catch (err) {
            console.log(err)
        }

    },

    // Change balance (admin or specific operation)
    changeBalance: async (amount, operation = 'add') => {
        const response = await apiClient.patch('/user/balance', {
            amount,
            operation, // 'add' or 'subtract'
        });
        return response.data;
    },

    // Delete account
    deleteAccount: async () => {
        const response = await apiClient.delete('/users/me');
        return response.data;
    },

    // Disconnect OAuth provider
    disconnectProvider: async (providerId) => {

        const response = await apiClient.patch('/users/me', { [`${providerId}Id`]: null });
        return response.data;
    }
};

export default userService;