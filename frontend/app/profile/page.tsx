"use client"

import { useState } from "react"
import { MedCard } from "@/components/shared/med-card"
import { User, Mail, Calendar, Settings2, ShieldCheck, Clock, Activity, LogOut, Award, Zap, Bell, Shield, Key, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
    const { user, logout } = useAuth()
    const [activeTab, setActiveTab] = useState("overview")

    if (!user) return null

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <BrainSignalBackground />

            <div className="container py-12 relative z-10">
                <div className="max-w-5xl mx-auto">

                    {/* Hero Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center gap-10 p-10 md:p-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/20 shadow-2xl shadow-emerald-500/5 mb-12"
                    >
                        <div className="relative group">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 rounded-full border-2 border-dashed border-emerald-500/20"
                            />
                            <div className="w-40 h-40 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border-8 border-white dark:border-slate-800 shadow-2xl relative z-10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent flex items-center justify-center">
                                    <span className="text-4xl font-black text-emerald-600">{user.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 border-4 border-white dark:border-slate-800 z-20">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-4 flex-1">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-500/20">
                                    {user.role} Verified
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{user.name}</h1>
                                <p className="text-xl text-slate-500 font-medium">{user.role} • <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Med-Taxlil Hub</span></p>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                                <Button className="rounded-2xl h-12 px-8 font-black shadow-xl shadow-emerald-500/20 micro-interact glow-teal" onClick={() => setActiveTab("settings")}>
                                    Account Settings
                                </Button>
                                <Button variant="destructive" className="rounded-2xl h-12 px-6 font-bold shadow-xl shadow-red-500/10 group" onClick={logout}>
                                    <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Chiqish
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-12 h-16 rounded-[2rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-2 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 transition-all">
                            <TabsTrigger value="overview" className="rounded-2xl font-black text-sm micro-interact data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Overview</TabsTrigger>
                            <TabsTrigger value="settings" className="rounded-2xl font-black text-sm micro-interact data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Configuration</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-12"
                                >
                                    {/* Stats Grid */}
                                    <div className="grid gap-8 md:grid-cols-4">
                                        <ProfileStatCard icon={Activity} label="Total Analysis" value="482" sub="Across all centers" color="emerald" />
                                        <ProfileStatCard icon={Clock} label="System Uptime" value="128h" sub="Active research sessions" color="blue" />
                                        <ProfileStatCard icon={Award} label="Experience" value="12y" sub="Board certified clinical" color="orange" />
                                        <ProfileStatCard icon={Zap} label="Model Access" value="v3.1" sub="Enterprise License" color="purple" />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <MedCard className="p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
                                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center">
                                                    <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                                                    Identity Info
                                                </h2>
                                            </div>
                                            <div className="p-8 space-y-6">
                                                <InfoRow label="Professional Email" value={user.email} />
                                                <InfoRow label="Specialization" value={user.role} />
                                                <InfoRow label="Medical ID" value="MT-99420-EEG" />
                                                <InfoRow label="Auth Method" value="Biometric + 2FA" />
                                            </div>
                                        </MedCard>

                                        <MedCard className="p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
                                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center">
                                                    <Bell className="w-4 h-4 mr-2 text-blue-500" />
                                                    Activity Feed
                                                </h2>
                                            </div>
                                            <div className="p-8 flex flex-col justify-center text-center space-y-4">
                                                <div className="text-xl font-bold italic text-slate-400">No recent notifications</div>
                                                <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-emerald-500">View Archive</Button>
                                            </div>
                                        </MedCard>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </TabsContent>

                        <TabsContent value="settings">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid md:grid-cols-12 gap-8"
                                >
                                    <div className="md:col-span-4 space-y-6">
                                        <MedCard className="p-6 bg-white/80 dark:bg-slate-900/80 border-emerald-500/10">
                                            <div className="space-y-4">
                                                <SettingsNavItem icon={User} label="Personal Data" active />
                                                <SettingsNavItem icon={Shield} label="Privacy & Security" />
                                                <SettingsNavItem icon={Key} label="Passkeys" />
                                                <SettingsNavItem icon={Bell} label="Notification Hub" />
                                            </div>
                                        </MedCard>
                                        <MedCard className="p-6 bg-red-500/5 border-red-500/10 space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500">Danger Zone</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Permanently delete your clinical history and AI models.</p>
                                            <Button variant="outline" className="w-full text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Delete Account</Button>
                                        </MedCard>
                                    </div>

                                    <div className="md:col-span-8">
                                        <MedCard className="p-10 border-none shadow-xl bg-white dark:bg-slate-900 space-y-10">
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black tracking-tight">Personal Information</h3>
                                                <p className="text-sm text-slate-500">Update your clinical profile details.</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                                    <Input defaultValue={user.name} className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                                    <Input defaultValue={user.email} className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role / Department</label>
                                                    <Input defaultValue={user.role} className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Language</label>
                                                    <select className="flex h-14 w-full rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                                        <option>O'zbekcha</option>
                                                        <option>English</option>
                                                        <option>Русский</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                                <Button className="rounded-2xl h-14 px-10 font-black shadow-xl shadow-emerald-500/20 micro-interact glow-teal">
                                                    Save Configuration
                                                </Button>
                                            </div>
                                        </MedCard>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </TabsContent>
                    </Tabs>
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
        <MedCard className="flex flex-col items-center text-center p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-emerald-500/5 group hover:shadow-2xl transition-all h-full">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform", colors[color])}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
            <div className="text-[10px] font-bold text-slate-400 opacity-60 italic">{sub}</div>
        </MedCard>
    )
}

function SettingsNavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all group",
            active ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        )}>
            <Icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:text-emerald-500")} />
            <span className="text-xs font-black uppercase tracking-widest flex-1">{label}</span>
            <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1", active && "opacity-100 translate-x-0")} />
        </div>
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
