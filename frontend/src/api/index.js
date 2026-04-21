import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // Crucial for sending secure httpOnly cookies automatically!
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if error is due to authentication failure (401 Unauthorized)
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized access - Session may have expired");
            // Optional: Force logout if needed, e.g., using a global event or redirecting
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;
