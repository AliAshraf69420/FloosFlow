import React, { useState } from 'react';
import { FaWhatsapp, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

export default function UsersTable({ users, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const startEdit = (user) => {
        setEditingId(user.id);
        setEditForm({ ...user });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const saveEdit = async () => {
        if (window.confirm("Are you sure you want to save these changes?")) {
            await onUpdate(editingId, editForm);
            setEditingId(null);
        }
    };

    const handleDelete = async (user) => {
        if (window.confirm(`Are you SURE you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`)) {
            await onDelete(user.id);
        }
    };

    const openWhatsApp = (phone) => {
        if (!phone) {
            alert("No phone number available for this user.");
            return;
        }
        // Remove non-numeric characters
        const cleanPhone = phone.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

    return (
        <div className="ff-card overflow-hidden hover:bg-none hover:text-inherit cursor-default">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200/50 dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                    No users found matching filters.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => {
                                const isEditing = editingId === user.id;

                                return (
                                    <tr key={user.id} className="hover:bg-gray-500/5 dark:hover:bg-white/[0.04] transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={editForm.firstName}
                                                            onChange={handleEditChange}
                                                            className="ff-input text-xs py-1 px-2"
                                                            placeholder="First"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={editForm.lastName}
                                                            onChange={handleEditChange}
                                                            className="ff-input text-xs py-1 px-2"
                                                            placeholder="Last"
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={editForm.username || ''}
                                                        onChange={handleEditChange}
                                                        className="ff-input text-xs py-1 px-2 w-full"
                                                        placeholder="Username"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden border border-white/10">
                                                        {user.profileImage ? (
                                                            <img src={user.profileImage.startsWith('http') ? user.profileImage : `http://localhost:5000${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                                                        ) : (
                                                            `${user.firstName[0]}${user.lastName[0]}`
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-900 dark:text-white font-medium">{user.firstName} {user.lastName}</p>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">@{user.username || 'n/a'}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editForm.email}
                                                        onChange={handleEditChange}
                                                        className="ff-input text-xs py-1 px-2 w-full"
                                                        placeholder="Email"
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="phoneNumber"
                                                        value={editForm.phoneNumber || ''}
                                                        onChange={handleEditChange}
                                                        className="ff-input text-xs py-1 px-2 w-full"
                                                        placeholder="Phone"
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-gray-700 dark:text-gray-300 text-sm">{user.email}</p>
                                                    <p className="text-gray-500 dark:text-gray-500 text-xs">{user.phoneNumber || 'no phone'}</p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            {isEditing ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={saveEdit}
                                                        className="p-2 bg-green-600/20 text-green-400 hover:bg-green-600/40 rounded-lg transition-all"
                                                        title="Save Changes"
                                                    >
                                                        <FaCheck size={14} />
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-lg transition-all"
                                                        title="Cancel"
                                                    >
                                                        <FaTimes size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">


                                                    {user.role !== 'ADMIN' && (
                                                        <>
                                                            <button
                                                                onClick={() => openWhatsApp(user.phoneNumber)}
                                                                className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-all"
                                                                title="Contact via WhatsApp"
                                                            >
                                                                <FaWhatsapp size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => startEdit(user)}
                                                                className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                                                title="Edit User"
                                                            >
                                                                <FaEdit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(user)}
                                                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                                title="Delete User"
                                                            >
                                                                <FaTrash size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
