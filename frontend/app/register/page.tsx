"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { MedCard } from "@/components/shared/med-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Lock, Loader2, ChevronRight, Activity, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import Link from "next/link"

export default function RegisterPage() {
    const { signup, isLoading } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await signup(name, email, pass)
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <BrainSignalBackground />

            <div className="container relative z-10 flex justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-lg"
                >
                    <MedCard className="p-10 md:p-12 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border-none shadow-[0_40px_100px_-20px_rgba(16,185,129,0.15)] relative overflow-hidden">
                        <div className="flex flex-col items-center text-center space-y-4 mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/20 mb-4">
                                <User className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Ro'yxatdan O'tish</h1>
                            <p className="text-slate-500 font-medium">Klinik tahlillar va AI imkoniyatlaridan foydalanish uchun hisob yarating.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">To'liq Ism (Dr.)</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                        <Input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-12 h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50"
                                            placeholder="Masalan: Dr. Akmal Abduvaliyev"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Manzil</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
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
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Xavfsiz Parol</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
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

                            <div className="flex items-start gap-3 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                                <Globe className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                    Ro'yxatdan o'tish orqali siz bizning <Link href="#" className="text-blue-600 underline">Xavfsizlik Siyosatimiz</Link> va <Link href="#" className="text-blue-600 underline">Foydalanish Shartlarimizga</Link> rozilik bildirasiz.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white micro-interact group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Hisob Yaratish
                                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-sm text-slate-500 font-medium">
                                Hisobingiz bormi?{" "}
                                <Link href="/login" className="text-blue-600 font-black hover:underline">Tizimga kirish</Link>
                            </p>
                        </div>
                    </MedCard>
                </motion.div>
            </div>
        </div>
    )
}
