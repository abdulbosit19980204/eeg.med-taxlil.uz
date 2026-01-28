"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, User, BarChart3, Upload, History } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
    { name: "Asosiy", href: "/", icon: Activity },
    { name: "AI Analiz", href: "/analysis", icon: Upload },
    { name: "Tarix", href: "/history", icon: History },
    { name: "AI O'qitish", href: "/training", icon: BarChart3 },
]

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { LayoutDashboard, LogOut, Settings, ChevronDown } from "lucide-react"

export function Navbar() {
    const pathname = usePathname()
    const { user, logout } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className="glass-header relative z-[100]">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <Activity className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
                            Med-Taxlil <span className="text-primary">EEG</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 px-1 py-1 pr-3 rounded-full border bg-white dark:bg-slate-900 border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-black text-slate-700 dark:text-slate-300 hidden sm:inline-block truncate max-w-[120px]">
                                    {user.name.split(' ')[0]}
                                </span>
                                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", isMenuOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-56 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/10 p-2 backdrop-blur-xl"
                                    >
                                        <div className="p-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</div>
                                            <div className="text-xs font-black text-slate-900 dark:text-white truncate">{user.email}</div>
                                        </div>
                                        
                                        <Link 
                                            href="/dashboard" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-all group"
                                        >
                                            <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs font-black uppercase tracking-widest">Dashboard</span>
                                        </Link>

                                        <Link 
                                            href="/profile" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-all group"
                                        >
                                            <Settings className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs font-black uppercase tracking-widest">Profil Sozlamalari</span>
                                        </Link>

                                        <button 
                                            onClick={() => {
                                                setIsMenuOpen(false)
                                                logout()
                                            }}
                                            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-all group"
                                        >
                                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                            <span className="text-xs font-black uppercase tracking-widest">Chiqish</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-6 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-sm micro-interact shadow-xl transition-all"
                        >
                            Tizimga Kirish
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
