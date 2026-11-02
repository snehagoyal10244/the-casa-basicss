const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  register: (userData) =>
    api.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  guestLogin: () =>
    api.request('/auth/guest', {
      method: 'POST',
    }),

  getProfile: (token) =>
    api.request('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default api;
