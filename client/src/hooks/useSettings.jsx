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
  providers: [],
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
  } catch {
    // ignore
  }
}

export default function useSettings() {
  const [settings, setSettings] = useState(() => readStorage());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const saveTimer = useRef(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setSettings(readStorage());
      setLoading(false);
    }, 300);

    return () => {
      clearTimeout(t);
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  // debounced save
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
    let nextPrefs;
    setSettings(prev => {
      nextPrefs = { ...prev.preferences, ...prefs };
      const next = { ...prev, preferences: nextPrefs };
      debouncedSave(next);
      return next;
    });
    await fakeNetwork(400);
    return nextPrefs;
  };

  const uploadAvatar = async (file) => {
    setError(null);
    await fakeNetwork(700);

    const reader = new FileReader();
    const url = await new Promise((res) => {
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(file);
    });

    setSettings(prev => {
      const next = { ...prev, avatarUrl: url };
      debouncedSave(next);
      return next;
    });

    return url;
  };

  const removeAvatar = async () => {
    setError(null);
    await fakeNetwork(300);
    setSettings(prev => {
      const next = { ...prev, avatarUrl: null };
      debouncedSave(next);
      return next;
    });
    return null;
  };

  const disconnectProvider = async (providerId) => {
    setError(null);
    let nextProviders;
    setSettings(prev => {
      nextProviders = (prev.providers || []).filter(p => p.id !== providerId);
      const next = { ...prev, providers: nextProviders };
      debouncedSave(next);
      return next;
    });
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
    setSettings(prev => {
      const next = { ...prev, providers: [...(prev.providers || []), newProvider] };
      debouncedSave(next);
      return next;
    });
    return newProvider;
  };

  const updatePersonalInfo = async (payload) => {
    setError(null);
    let updatedPersonal;
    setSettings(prev => {
      updatedPersonal = { ...prev.personal, ...payload };
      const next = { ...prev, personal: updatedPersonal };
      debouncedSave(next);
      return next;
    });
    await fakeNetwork(400);
    return updatedPersonal;
  };

  const updateEmail = async (email) => {
    setError(null);
    let updatedAccount;
    setSettings(prev => {
      updatedAccount = { ...prev.account, email };
      const next = { ...prev, account: updatedAccount };
      debouncedSave(next);
      return next;
    });
    await fakeNetwork(600);
    return updatedAccount;
  };

  const updatePassword = async ({ current, new: newPass, confirm }) => {
    setError(null);
    if (!current || !newPass) throw new Error("Missing password fields");
    if (newPass !== confirm) throw new Error("Passwords do not match");
    await fakeNetwork(700);
    return { success: true };
  };

  const deleteAccount = async () => {
    setError(null);
    await fakeNetwork(800);
    localStorage.removeItem(STORAGE_KEY);
    setSettings(DEFAULT_SETTINGS);
    return { deleted: true };
  };

  const changeTheme = async (theme) => {
    setError(null);
    let updatedTheme;
    setSettings(prev => {
      updatedTheme = theme;
      const next = { ...prev, theme };
      debouncedSave(next);
      return next;
    });
    await fakeNetwork(200);
    return updatedTheme;
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
