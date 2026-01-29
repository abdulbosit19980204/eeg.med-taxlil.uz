"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { MedCard } from "@/components/shared/med-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuit, Mail, Lock, Loader2, ChevronRight, Activity } from "lucide-react"
import { motion } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import Link from "next/link"

export default function LoginPage() {
    const { login, isLoading } = useAuth()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, pass)
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <BrainSignalBackground />

            <div className="container relative z-10 flex justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <MedCard className="p-10 md:p-12 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border-none shadow-[0_40px_100px_-20px_rgba(16,185,129,0.15)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <BrainCircuit className="w-32 h-32" />
                        </div>

                        <div className="flex flex-col items-center text-center space-y-4 mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-4">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Xush kelibsiz</h1>
                            <p className="text-slate-500 font-medium">Med-Taxlil tizimiga kirish uchun ma'lumotlaringizni kiriting.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Manzil</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                        <Input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-12 h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50"
                                            placeholder="doctor@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parol</label>
                                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600 transition-colors">Tiklash?</Link>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                        <Input
                                            type="password"
                                            required
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                            className="pl-12 h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-emerald-500/20 micro-interact glow-teal group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Tizimga Kirish
                                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-sm text-slate-500 font-medium">
                                Hisobingiz yo'qmi?{" "}
                                <Link href="/register" className="text-emerald-600 font-black hover:underline">Ro'yxatdan o'tish</Link>
                            </p>
                        </div>

                        <div className="mt-8 flex justify-center gap-6 opacity-30">
                            <Activity className="w-4 h-4" />
                            <ShieldCheck className="w-4 h-4" />
                            <Activity className="w-4 h-4" />
                        </div>
                    </MedCard>
                </motion.div>
            </div>
        </div>
    )
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
