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

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="glass-header">
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
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white dark:bg-slate-900 hover:shadow-sm transition-all shadow-teal-900/5"
                    >
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Shifokor</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}
