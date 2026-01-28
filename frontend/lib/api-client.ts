import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request Interceptor for JWT
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

// Response Interceptor for handling token refresh
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any
        
        // Skip refresh logic for login endpoint
        const isLoginRequest = originalRequest.url.includes('/auth/token/') && !originalRequest.url.includes('/refresh/')

        if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
            originalRequest._retry = true
            try {
                const refreshToken = localStorage.getItem('refresh_token')
                if (!refreshToken) throw new Error("No refresh token")

                const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
                    refresh: refreshToken,
                })
                localStorage.setItem('access_token', response.data.access)
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${response.data.access}`
                }
                return apiClient(originalRequest)
            } catch (err) {
                localStorage.clear()
                // Only redirect to login if we weren't already there
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                    window.location.href = '/login'
                }
            }
        }
        return Promise.reject(error)
    }
)

export default apiClient
