// DO NOT add fallbacks in production
const API_URL = import.meta.env.VITE_API_URL;

if (import.meta.env.MODE === "production" && !API_URL) {
  throw new Error("VITE_API_URL is not defined in production");
}
//We're spiralliiiiiing
console.log("API CONFIG:");
console.log("MODE:", import.meta.env.MODE);
console.log("VITE_API_URL:", API_URL);

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  console.log("Request URL:", url);

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  };

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let error = {};
    try {
      error = await response.json();
    } catch { }
    throw new Error(error.message || "API request failed");
  }

  return response.json();
}

export const api = {
  get: (endpoint) => request(endpoint, { method: "GET" }),
  post: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(data)
    }),
  put: (endpoint, data) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  patch: (endpoint, data) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data)
    }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" })
};
