import { useEffect, useRef, useState } from "react";

/**
 * useSettings - simple client-side settings store with optimistic updates.
 *
 * Exposes:
 * - settings (object)
 * - loading (bool)
 * - error (string|null)
 * - refresh() - reload from storage
 * - updatePreferences(prefs)
 * - uploadAvatar(file) -> Promise<avatarUrl>
 * - removeAvatar()
 * - disconnectProvider(providerId)
 * - authorizeProvider({ provider, email }) -> simulate adding provider
 * - updatePersonalInfo(payload)
 * - updateEmail(email)
 * - updatePassword({ current, new, confirm })
 * - deleteAccount()
 * - changeTheme(theme)
 *
 * Implementation notes:
 * - Uses localStorage for persistence under key "floosflow_settings_v1"
 * - Simulates network delays with setTimeout
 * - Returns Promise for async methods
 */
const STORAGE_KEY = "floosflow_settings_v1";
const DEFAULT_SETTINGS = {
  preferences: { email: true, sms: false, marketing: false },
  avatarUrl: null,
  providers: [], // { id, name, connectedAt }
  personal: {
    firstName: "",
    lastName: "",
    username: "",
    email: "user@example.com",
    phone: "",
  },
  theme: "system",
  account: { email: "user@example.com" },
};

const fakeNetwork = (ms = 500) => new Promise((res) => setTimeout(res, ms));

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SETTINGS;
  }
}
function writeStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    // swallow
  }
}

export default function useSettings() {
  const [settings, setSettings] = useState(() => readStorage());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const saveTimer = useRef(null);

  useEffect(() => {
    setLoading(true);
    // simulate fetch
    const t = setTimeout(() => {
      setSettings(readStorage());
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // internal save to storage (debounced)
  const debouncedSave = (next) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      writeStorage(next);
      saveTimer.current = null;
    }, 300);
  };

  const refresh = () => {
    setLoading(true);
    return fakeNetwork(300).then(() => {
      const s = readStorage();
      setSettings(s);
      setLoading(false);
      return s;
    });
  };

  const updatePreferences = async (prefs) => {
    setError(null);
    const next = { ...settings, preferences: { ...settings.preferences, ...prefs } };
    setSettings(next);
    debouncedSave(next);
    await fakeNetwork(400);
    return next.preferences;
  };

  const uploadAvatar = async (file) => {
    setError(null);
    // Simulate upload and return blob URL stored in localStorage
    await fakeNetwork(700);
    // create object URL (non-persistent) — in real app upload returns a hosted url
    const url = URL.createObjectURL(file);
    const next = { ...settings, avatarUrl: url };
    setSettings(next);
    debouncedSave(next);
    return url;
  };

  const removeAvatar = async () => {
    setError(null);
    await fakeNetwork(300);
    const next = { ...settings, avatarUrl: null };
    setSettings(next);
    debouncedSave(next);
    return null;
  };

  const disconnectProvider = async (providerId) => {
    setError(null);
    // optimistic update
    const nextProviders = (settings.providers || []).filter((p) => p.id !== providerId);
    const next = { ...settings, providers: nextProviders };
    setSettings(next);
    debouncedSave(next);
    await fakeNetwork(400);
    return nextProviders;
  };

  const authorizeProvider = async ({ provider, email }) => {
    setError(null);
    await fakeNetwork(600);
    const newProvider = {
      id: `${provider}-${Date.now()}`,
      name: provider,
      connectedAt: new Date().toISOString(),
      meta: { email },
    };
    const next = { ...settings, providers: [...(settings.providers || []), newProvider] };
    setSettings(next);
    debouncedSave(next);
    return newProvider;
  };

  const updatePersonalInfo = async (payload) => {
    setError(null);
    const next = { ...settings, personal: { ...settings.personal, ...payload } };
    setSettings(next);
    debouncedSave(next);
    await fakeNetwork(400);
    return next.personal;
  };

  const updateEmail = async (email) => {
    setError(null);
    // in a real app you'd verify email, send confirmation
    const next = { ...settings, account: { ...settings.account, email } };
    setSettings(next);
    debouncedSave(next);
    await fakeNetwork(600);
    return next.account;
  };

  const updatePassword = async ({ current, new: newPass, confirm }) => {
    setError(null);
    // naive validation
    if (!current || !newPass) throw new Error("Missing password fields");
    if (newPass !== confirm) throw new Error("Passwords do not match");
    await fakeNetwork(700);
    // password never stored here; just simulate success
    return { success: true };
  };

  const deleteAccount = async () => {
    setError(null);
    await fakeNetwork(800);
    // simulate deletion by clearing storage and resetting to defaults
    localStorage.removeItem(STORAGE_KEY);
    setSettings(DEFAULT_SETTINGS);
    return { deleted: true };
  };

  const changeTheme = async (theme) => {
    setError(null);
    const next = { ...settings, theme };
    setSettings(next);
    debouncedSave(next);
    await fakeNetwork(200);
    return next.theme;
  };

  return {
    settings,
    loading,
    error,
    refresh,
    updatePreferences,
    uploadAvatar,
    removeAvatar,
    disconnectProvider,
    authorizeProvider,
    updatePersonalInfo,
    updateEmail,
    updatePassword,
    deleteAccount,
    changeTheme,
  };
}
