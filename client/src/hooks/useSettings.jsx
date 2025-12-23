import { useUser } from "../context/UserContext";
import userService from "../services/userService";
import authService from "../services/authService";

/**
 * useSettings - Lightweight hook that surfaces UserContext state and helpers.
 * Removes redundant local state to prevent UI "damage".
 */
export default function useSettings() {
  const { user, loading, error, fetchUser, updateUser } = useUser();

  // Simple pass-throughs for actions if needed, 
  // though sections currently handle their own API calls.

  const updatePreferences = (prefs) => {
    updateUser({ preferences: prefs });
  };

  const uploadAvatar = async (file) => {
    const res = await userService.uploadProfileImage(file);
    if (res?.user) updateUser(res.user);
    return res;
  };

  const removeAvatar = async () => {
    const res = await userService.deleteProfileImage();
    if (res?.user) updateUser(res.user);
    return res;
  };

  const updatePersonalInfo = async (payload) => {
    const res = await userService.updateInfo(payload);
    if (res?.user) updateUser(res.user);
    return res;
  };

  const updateEmail = async (email) => {
    const res = await userService.updateInfo({ email });
    if (res?.user) updateUser(res.user);
    return res;
  };

  const updatePassword = async (payload) => {
    return userService.updatePassword(payload);
  };

  const deleteAccount = async () => {
    const res = await userService.deleteAccount();
    authService.logout();
    return res;
  };

  const disconnectProvider = async (providerId) => {
    const res = await userService.disconnectProvider(providerId);
    if (res?.user) updateUser(res.user);
    return res;
  };

  return {
    settings: user,
    loading,
    error,
    refresh: fetchUser,
    updatePreferences,
    uploadAvatar,
    removeAvatar,
    updatePersonalInfo,
    updateEmail,
    updatePassword,
    deleteAccount,
    disconnectProvider,
  };
}
