import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function UserFilter({ onFilter }) {
    const [filters, setFilters] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: ''
    });

    // Debounce the filter action
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilter(filters);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [filters, onFilter]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            firstName: '',
            lastName: '',
            username: '',
            email: ''
        });
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Filter Users</h3>
                <button
                    onClick={clearFilters}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={filters.firstName}
                        onChange={handleInputChange}
                        className="ff-input pl-10 h-10 text-sm"
                    />
                </div>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={filters.lastName}
                        onChange={handleInputChange}
                        className="ff-input pl-10 h-10 text-sm"
                    />
                </div>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={filters.username}
                        onChange={handleInputChange}
                        className="ff-input pl-10 h-10 text-sm"
                    />
                </div>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={filters.email}
                        onChange={handleInputChange}
                        className="ff-input pl-10 h-10 text-sm"
                    />
                </div>
            </div>
        </div>
    );
}
