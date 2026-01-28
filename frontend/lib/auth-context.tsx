"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, pass: string) => Promise<void>
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
        // Simulate checking local storage/session
        const savedUser = localStorage.getItem("med_user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, pass: string) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            const mockUser = { id: "1", name: "Dr. Abduvaliyev Akmal", email, role: "Neurophysiologist" }
            setUser(mockUser)
            localStorage.setItem("med_user", JSON.stringify(mockUser))
            setIsLoading(false)
            router.push("/dashboard")
        }, 1500)
    }

    const signup = async (name: string, email: string, pass: string) => {
        setIsLoading(true)
        setTimeout(() => {
            const mockUser = { id: "1", name, email, role: "Clinician" }
            setUser(mockUser)
            localStorage.setItem("med_user", JSON.stringify(mockUser))
            setIsLoading(false)
            router.push("/dashboard")
        }, 1500)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("med_user")
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
