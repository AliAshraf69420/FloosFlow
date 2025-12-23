import apiClient from './apiClient';

const adminService = {

    getUsers: async (filters = {}) => {
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            if (filters[key]) params.append(key, filters[key]);
        });

        const response = await apiClient.get(`/admin/users?${params.toString()}`);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await apiClient.patch(`/admin/users/${id}`, data);
        return response.data;
    },


    deleteUser: async (id) => {
        const response = await apiClient.delete(`/admin/users/${id}`);
        return response.data;
    }
};

export default adminService;
