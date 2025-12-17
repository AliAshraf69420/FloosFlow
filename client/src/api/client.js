// where X the backend link
const x = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const url = `${x}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };


  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

export const api = {
  get: (endpoint) => request(endpoint, { method: "GET" }),
  post: (endpoint, data) =>
    request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: (endpoint, data) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  patch: (endpoint, data) =>
    request(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};