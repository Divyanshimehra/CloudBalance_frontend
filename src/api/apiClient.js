// “All authenticated requests go through a centralized API client 
// which injects JWT headers and handles global auth failures like 401. 
// Login is intentionally excluded since it does not require authentication.”

const API_BASE_URL = "http://localhost:8080";
export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  if (!(options.method === "GET")) {
  headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // token invalid or expired
    localStorage.clear();
    window.location.href = "/login"; //replace with a navigation-based logout handler.
  }

  return response;
}
