"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import apiClient from "./api-client"

interface User {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
}

interface AuthContextType {
    user: User | null
    login: (username: string, pass: string) => Promise<void>
    signup: (name: string, email: string, pass: string) => Promise<void>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token")
            if (token) {
                try {
                    const response = await apiClient.get("/users/me/")
                    setUser({
                        id: response.data.id,
                        name: `${response.data.first_name} ${response.data.last_name}`.trim() || response.data.username,
                        email: response.data.email,
                        role: response.data.role,
                        avatar: response.data.avatar
                    })
                } catch (err) {
                    console.error("Auth check failed:", err)
                    localStorage.removeItem("access_token")
                }
            }
            setIsLoading(false)
        }
        checkAuth()
    }, [])

    const login = async (username: string, pass: string) => {
        setIsLoading(true)
        try {
            const response = await apiClient.post("/auth/token/", { username, password: pass })
            localStorage.setItem("access_token", response.data.access)
            localStorage.setItem("refresh_token", response.data.refresh)

            // Fetch user profile
            const profileRes = await apiClient.get("/users/me/")
            const userData = {
                id: profileRes.data.id,
                name: `${profileRes.data.first_name} ${profileRes.data.last_name}`.trim() || profileRes.data.username,
                email: profileRes.data.email,
                role: profileRes.data.role,
            }
            setUser(userData)
            localStorage.setItem("med_user", JSON.stringify(userData))
            router.push("/dashboard")
        } catch (err) {
            console.error("Login failed:", err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (name: string, email: string, pass: string) => {
        setIsLoading(true)
        try {
             // Split name into first and last
            const names = name.split(" ")
            const firstName = names[0]
            const lastName = names.slice(1).join(" ")

            await apiClient.post("/users/", {
                username: email.split("@")[0],
                email: email,
                password: pass,
                first_name: firstName,
                last_name: lastName
            })
            
            // Login after signup
            await login(email.split("@")[0], pass)
        } catch (err) {
            console.error("Signup failed:", err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.clear()
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
