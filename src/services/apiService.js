const API_BASE_URL = "http://localhost:8080"; // Replace with your backend URL

// Helper function to handle API calls
async function apiCall(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Auth APIs
export function login(email, password) {
  return apiCall("/api/auth/login", "POST", { email, password });
}

export function register(email, password) {
  return apiCall("/api/auth/register", "POST", { email, password });
}

// User Profile APIs
export function fetchUserProfile() {
  return apiCall("/api/users/me");
}

// Product APIs
export function fetchProducts() {
  return apiCall("/api/products");
}

export function fetchProductById(productId) {
  return apiCall(`/api/products/${productId}`);
}

// Cart APIs
export function fetchCart() {
  return apiCall("/api/cart");
}

export function addToCart(productId, quantity) {
  return apiCall("/api/cart", "POST", { productId, quantity });
}

export function removeFromCart(productId) {
  return apiCall(`/api/cart/${productId}`, "DELETE");
}

// Order APIs
export function fetchOrderHistory() {
  return apiCall("/api/orders");
}

export function placeOrder(orderDetails) {
  return apiCall("/api/orders", "POST", orderDetails);
}

// Address Management APIs
export function fetchAddresses() {
  return apiCall("/api/addresses");
}

export function addAddress(address) {
  return apiCall("/api/addresses", "POST", address);
}

export function deleteAddress(addressId) {
  return apiCall(`/api/addresses/${addressId}`, "DELETE");
}

// Categories APIs
export function fetchCategories() {
  return apiCall("/api/categories");
}
