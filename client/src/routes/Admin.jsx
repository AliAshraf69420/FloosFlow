import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import adminService from '../services/adminService';
import authService from '../services/authService';
import UserFilter from '../components/Admin/UserFilter';
import UsersTable from '../components/Admin/UsersTable';
import LoadingSpinner from '../components/Notifications/LoadingSpinner';

export default function Admin() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});

    // Redirect if not admin
    useEffect(() => {
        if (user && user.role !== 'ADMIN') {
            navigate('/Dashboard');
        }
    }, [user, navigate]);

    const fetchUsers = useCallback(async (currentFilters = filters) => {
        setLoading(true);
        try {
            const data = await adminService.getUsers(currentFilters);
            setUsers(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError("Failed to load users. Please check your permissions.");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            fetchUsers();
        }
    }, [user, fetchUsers]);

    const handleFilter = useCallback((newFilters) => {
        setFilters(newFilters);
        fetchUsers(newFilters);
    }, [fetchUsers]);

    const handleUpdateUser = async (id, data) => {
        try {
            await adminService.updateUser(id, data);
            await fetchUsers(); // Refresh list
        } catch (err) {
            alert("Failed to update user: " + (err.response?.data?.error || err.message));
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await adminService.deleteUser(id);
            await fetchUsers(); // Refresh list
        } catch (err) {
            alert("Failed to delete user: " + (err.response?.data?.error || err.message));
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            authService.logout();
        }
    };

    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="min-h-screen bg-ff-bg-light dark:bg-ff-bg-dark text-gray-900 dark:text-gray-100">
        {/* Admin Specialized Header */}
        <header className="bg-white dark:bg-ff-bg-dark border-b border-gray-200 dark:border-white/10 sticky top-0 z-50" role="banner">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link 
                to="/Admin" 
                className="flex items-center gap-2" 
                aria-label="Go to Admin Panel"
                >
                <img 
                    src="/logo.svg" 
                    alt="FloosFlow Logo" 
                    className="h-8" 
                    role="img" 
                    aria-label="FloosFlow" 
                />
                <span className="text-xl font-bold tracking-tight">
                    Admin<span className="text-green-500">Panel</span>
                </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6" aria-label="Admin Navigation">
                <span className="text-sm font-medium text-green-400" role="link">User Management</span>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 mr-4 border-r border-gray-200 dark:border-white/10 pr-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{user.role}</p>
                </div>
                <img
                    src={user.profileImage ?? "../../assets/defaultimage.png"}
                    alt={`${user.firstName} ${user.lastName}'s Profile`}
                    className="w-10 h-10 rounded-full border border-green-500/50 object-cover"
                    role="img"
                    aria-label="User Profile"
                />
                </div>

                <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600/50 border border-red-600/30 rounded-lg hover:bg-red-600/20 transition-all active:scale-95"
                aria-label="Log out of the Admin Panel"
                type="button"
                >
                Logout
                </button>
            </div>
            </div>
        </header>

        <main className="p-4 sm:p-8 max-w-7xl mx-auto">
            <section className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white" id="user-management-header">
                User Management
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
                Search, edit, and manage all users on the platform.
            </p>
            </section>

            <UserFilter onFilter={handleFilter} />

            {loading ? (
            <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" role="progressbar" aria-live="polite" />
            </div>
            ) : error ? (
            <div 
                className="ff-card p-12 text-center text-red-400" 
                role="alert" 
                aria-live="assertive"
            >
                {error}
            </div>
            ) : (
            <UsersTable
                users={users}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
                aria-labelledby="user-management-header"
            />
            )}
        </main>
        </div>

    );
}
