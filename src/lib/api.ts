import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config)=>{
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
})

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response, // If response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    // If the backend says our Access Token is expired (401), and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark it so we don't get stuck in an infinite loop
      
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem("refreshToken") : null;
      
      if (refreshToken) {
        try {
          // Call the refresh endpoint (using raw axios to avoid interceptor loops)
          const res = await axios.post("http://localhost:5000/api/auth/refresh", { refreshToken });
          
          // Save the brand new access token
          if (typeof window !== 'undefined') {
              localStorage.setItem("token", res.data.token);
          }
          
          // Attach the new token to our original request and try it again!
          originalRequest.headers['Authorization'] = `Bearer ${res.data.token}`;
          return api(originalRequest);
          
        } catch (refreshError) {
          // If the Refresh Token itself is expired (after 7 days), forcefully log the user out
          if (typeof window !== 'undefined') {
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("role");
              window.location.href = "/login";
          }
        }
      }
    }
    return Promise.reject(error);
  }
);