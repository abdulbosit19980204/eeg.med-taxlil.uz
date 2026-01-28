"use client"

import { Button } from "@/components/ui/button"
import { MedCard } from "@/components/shared/med-card"
import { EegSignalPreview } from "@/components/shared/eeg-signal-preview"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Cpu, Database, ShieldCheck, Zap, Server, Globe, Users, TrendingUp, AlertCircle, Play, History, BrainCircuit } from "lucide-react"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function DashboardPage() {
    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden pb-12">
            <BrainSignalBackground />

            <div className="container py-10 relative z-10">
                {/* Executive Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm mb-4">
                            <Server className="mr-2 h-4 w-4 fill-emerald-500" />
                            Neural Operations Center
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                            Operatsiyalar <span className="text-emerald-500 italic">Markazi</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 mt-2">Barcha klinik tugunlar va AI tahlillarning real vaqtdagi umumiy holati.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status</div>
                            <div className="text-emerald-500 font-bold flex items-center justify-end gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                All Systems Optimal
                            </div>
                        </div>
                        <Link href="/analysis">
                            <Button size="xl" className="rounded-2xl h-16 px-8 font-black shadow-xl shadow-emerald-500/20 micro-interact glow-teal">
                                <Play className="w-5 h-5 mr-2 fill-white" />
                                Yangi Tahlil
                            </Button>
                        </Link>
                    </motion.div>
                </header>

                {/* Main Dashboard Grid */}
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Top Row: Global Intelligence Stats */}
                    <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard icon={Users} label="Active Patients" value="1.2k" sub="+12% today" color="emerald" />
                        <StatCard icon={TrendingUp} label="AI Accuracy" value="98.4%" sub="Rolling 24h" color="blue" />
                        <StatCard icon={Globe} label="Region Nodes" value="14" sub="Latency: 4ms" color="orange" />
                        <StatCard icon={Database} label="Neural Data" value="4.8PB" sub="99.9% Redundancy" color="purple" />
                    </div>

                    {/* Left: Active Monitor */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 space-y-8"
                    >
                        <MedCard className="bg-slate-900 text-white border-none p-1 overflow-hidden h-[400px] flex flex-col group">
                            <div className="p-8 pb-4 flex justify-between items-center relative z-10">
                                <div>
                                    <h3 className="text-lg font-black tracking-tight">Global Neural Pulse</h3>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time aggregate signal stream</p>
                                </div>
                                <div className="flex gap-4">
                                    <Badge label="16 Channels" color="emerald" />
                                    <Badge label="Inference Active" color="blue" />
                                </div>
                            </div>
                            <div className="flex-1 relative">
                                <EegSignalPreview active speed={0.5} className="absolute inset-0 w-full h-full opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />

                                {/* Simulated Heatmap Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="w-1/2 h-1/2 bg-emerald-500 rounded-full blur-[120px]"
                                    />
                                </div>
                            </div>
                        </MedCard>

                        <div className="grid md:grid-cols-2 gap-8">
                            <MedCard className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-emerald-500/10">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center">
                                    <History className="w-4 h-4 mr-2 text-emerald-500" />
                                    Recent Diagnostic Events
                                </h4>
                                <div className="space-y-4">
                                    <EventRow id="P-102" time="2m ago" action="Epilepsy Detected" status="High Priority" color="text-red-500" />
                                    <EventRow id="P-105" time="14m ago" action="REM Sleep Cycle" status="Normal" color="text-emerald-500" />
                                    <EventRow id="P-108" time="1h ago" action="Alpha Burst" status="Observation" color="text-orange-500" />
                                    <EventRow id="P-112" time="3h ago" action="Tahlil Yakunlandi" status="Success" color="text-blue-500" />
                                </div>
                                <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-50">
                                    To'liq Arxivni Ko'rish
                                </Button>
                            </MedCard>

                            <MedCard className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-blue-500/10">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center">
                                    <BrainCircuit className="w-4 h-4 mr-2 text-blue-500" />
                                    AI Model Performance
                                </h4>
                                <div className="space-y-6">
                                    <ProgressStat label="LSTM-v3 Neural Core" progress={88} color="bg-blue-500" />
                                    <ProgressStat label="Spectral Decomposition" progress={94} color="bg-emerald-500" />
                                    <ProgressStat label="Artifact Filtration" progress={76} color="bg-orange-500" />
                                    <div className="pt-2">
                                        <div className="flex items-center gap-3 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                                            <Zap className="w-8 h-8 text-blue-500 fill-blue-500" />
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">Pro Tip</div>
                                                <p className="text-[10px] text-slate-500 font-medium">Model v3.1 is 12% faster for large datasets.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MedCard>
                        </div>
                    </motion.div>

                    {/* Right: Fleet Health & Tasks */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <MedCard className="bg-white/80 dark:bg-transparent backdrop-blur-xl border-emerald-500/10 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center">
                                    <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
                                    Fleet Node Security
                                </h3>
                                <div className="space-y-6">
                                    <NodeItem label="Node-01 (Tashkent)" status="Online" latency="2ms" />
                                    <NodeItem label="Node-02 (Samarkand)" status="Online" latency="12ms" />
                                    <NodeItem label="Node-03 (Backup)" status="Standby" latency="--" />
                                    <NodeItem label="GPU-Cluster-X" status="Heavy Load" latency="94ms" warning />

                                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Mesh</span>
                                            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Active</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ width: ["100%", "98%", "100%"] }}
                                                transition={{ duration: 5, repeat: Infinity }}
                                                className="h-full bg-emerald-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </MedCard>
                        </motion.div>

                        <MedCard className="bg-emerald-600 text-white border-none p-8 overflow-hidden relative group">
                            <div className="absolute right-0 top-0 p-8 opacity-20">
                                <AlertCircle className="w-24 h-24" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-4">Urgent Tasks</h3>
                            <div className="text-3xl font-black mb-1">04</div>
                            <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Pending Clinician Review</div>
                            <Button className="mt-6 w-full bg-white text-emerald-600 rounded-2xl h-12 font-black hover:bg-emerald-50 transition-all border-none shadow-lg">
                                Review Queue
                            </Button>
                        </MedCard>
                    </div>

                </div>
            </div>
        </div>
    )
}

function StatCard({ icon: Icon, label, value, sub, color }: { icon: any, label: string, value: string, sub: string, color: string }) {
    const colors: any = {
        emerald: "bg-emerald-500 shadow-emerald-500/20",
        blue: "bg-blue-500 shadow-blue-500/20",
        orange: "bg-orange-500 shadow-orange-500/20",
        purple: "bg-purple-500 shadow-purple-500/20",
    }
    return (
        <MedCard className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-emerald-500/5 group hover:shadow-2xl transition-all h-full flex flex-col items-center text-center">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform", colors[color])}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{value}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
            <div className="text-[9px] font-bold text-emerald-500">{sub}</div>
        </MedCard>
    )
}

function Badge({ label, color }: { label: string, color: string }) {
    const colors: any = {
        emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    }
    return (
        <span className={cn("px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border", colors[color])}>
            {label}
        </span>
    )
}

function EventRow({ id, time, action, status, color }: { id: string, time: string, action: string, status: string, color: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
            <div className="flex items-center gap-4">
                <div className="text-[9px] font-black text-slate-400 font-mono">[{id}]</div>
                <div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{action}</div>
                    <div className="text-[9px] font-bold text-slate-400">{time}</div>
                </div>
            </div>
            <span className={cn("text-[9px] font-black uppercase tracking-widest", color)}>{status}</span>
        </div>
    )
}

function NodeItem({ label, status, latency, warning = false }: { label: string, status: string, latency: string, warning?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    warning ? "bg-orange-500 animate-pulse" : "bg-emerald-500"
                )} />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{label}</span>
            </div>
            <div className="text-right">
                <div className={cn("text-[10px] font-black uppercase tracking-widest", warning ? "text-orange-500" : "text-emerald-500")}>{status}</div>
                <div className="text-[8px] font-bold text-slate-400">{latency}</div>
            </div>
        </div>
    )
}

function ProgressStat({ label, progress, color }: { label: string, progress: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                <span className="text-[10px] font-black text-slate-900 dark:text-white">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    className={cn("h-full", color)}
                />
            </div>
        </div>
    )
}
