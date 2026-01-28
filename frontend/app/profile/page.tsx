"use client"

import { MedCard } from "@/components/shared/med-card"
import { User, Mail, Calendar, Settings2, ShieldCheck, Clock, Activity, LogOut, Award, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <BrainSignalBackground />

            <div className="container py-12 relative z-10">
                <div className="max-w-5xl mx-auto space-y-12">

                    {/* Hero Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center gap-10 p-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/20 shadow-2xl shadow-emerald-500/5"
                    >
                        <div className="relative group">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 rounded-full border-2 border-dashed border-emerald-500/20"
                            />
                            <div className="w-40 h-40 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border-8 border-white dark:border-slate-800 shadow-2xl relative z-10 overflow-hidden">
                                <User className="w-20 h-20 text-emerald-600" />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 border-4 border-white dark:border-slate-800 z-20">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-4">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-500/20">
                                    Verified Professional
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Dr. Abduvaliyev Akmal</h1>
                                <p className="text-xl text-slate-500 font-medium">Neyrofiziolog • <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Med-Taxlil Hub</span></p>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <Button className="rounded-2xl h-12 px-8 font-black shadow-xl shadow-emerald-500/20 micro-interact glow-teal">
                                    Edit Profile
                                </Button>
                                <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <Settings2 className="w-4 h-4 mr-2" />
                                    Security
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid gap-8 md:grid-cols-4">
                        <ProfileStatCard icon={Activity} label="Total Analysis" value="482" sub="Across all centers" color="emerald" />
                        <ProfileStatCard icon={Clock} label="System Uptime" value="128h" sub="Active research sessions" color="blue" />
                        <ProfileStatCard icon={Award} label="Experience" value="12y" sub="Board certified clinical" color="orange" />
                        <ProfileStatCard icon={Zap} label="Model Access" value="v3.1" sub="Enterprise License" color="purple" />
                    </div>

                    {/* Information Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <MedCard className="p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                                    Contact & Credentials
                                </h2>
                            </div>
                            <div className="p-8 space-y-6">
                                <InfoRow label="Professional Email" value="dr.akmal@med-taxlil.uz" />
                                <InfoRow label="Specialization" value="Neurophysiologist" />
                                <InfoRow label="Medical ID" value="MT-99420-EEG" />
                                <InfoRow label="Auth Method" value="Biometric + 2FA" />
                            </div>
                        </MedCard>

                        <MedCard className="p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl flex flex-col">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center">
                                    <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
                                    Subscription & Billing
                                </h2>
                            </div>
                            <div className="p-8 flex-1 flex flex-col justify-center text-center space-y-6">
                                <div>
                                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">Enterprise Plan</div>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Next renewal: 12.01.2025</p>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-3/4" />
                                </div>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-emerald-500/20 text-emerald-600 font-black hover:bg-emerald-50">
                                    Upgrade License
                                </Button>
                            </div>
                        </MedCard>
                    </div>

                    {/* Danger Zone */}
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <div className="space-y-1">
                            <h3 className="font-black text-slate-900 dark:text-white">Account Management</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Signed in since 12 hours ago</p>
                        </div>
                        <Button variant="destructive" className="h-14 px-10 rounded-2xl font-black shadow-2xl shadow-red-500/20 group">
                            <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Chiqish
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProfileStatCard({ icon: Icon, label, value, sub, color }: { icon: any, label: string, value: string, sub: string, color: string }) {
    const colors: any = {
        emerald: "bg-emerald-500",
        blue: "bg-blue-500",
        orange: "bg-orange-500",
        purple: "bg-purple-500",
    }
    return (
        <MedCard className="flex flex-col items-center text-center p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-emerald-500/5 group">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform", colors[color])}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
            <div className="text-[10px] font-bold text-slate-400 opacity-60 italic">{sub}</div>
        </MedCard>
    )
}

function InfoRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-2 group">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">{label}</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">{value}</span>
        </div>
    )
}
