// Get base URL without /api
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log('🔍 API Configuration:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Base URL:', baseURL);
console.log('Mode:', import.meta.env.MODE);

async function request(endpoint, options = {}) {
  // Endpoint should start with / (e.g., /api/auth/login)
  const url = `${baseURL}${endpoint}`;
  
  console.log('🌐 Full request URL:', url);
  
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

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Something went wrong");
    }
    return response.json();
  } catch (error) {
    console.error('❌ API Error:', error);
    console.error('Failed URL:', url);
    throw error;
  }
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