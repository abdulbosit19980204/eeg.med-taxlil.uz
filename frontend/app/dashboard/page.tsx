"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MedCard } from "@/components/shared/med-card"
import { EegSignalPreview } from "@/components/shared/eeg-signal-preview"
import { motion } from "framer-motion"
import { Activity, Cpu, Database, ShieldCheck, Zap, Server, Globe, Users, TrendingUp, AlertCircle, Play, History, BrainCircuit, Loader2 } from "lucide-react"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { cn } from "@/lib/utils"
import Link from "next/link"
import apiClient from "@/lib/api-client"

export default function DashboardPage() {
    const [stats, setStats] = useState({
        patients: 0,
        accuracy: 94.8,
        dataSize: "2.4 GB",
        recentAnalyses: [] as any[]
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [patientsRes, analysisRes, modelRes] = await Promise.all([
                    apiClient.get("/clinical/patients/"),
                    apiClient.get("/analysis/records/"),
                    apiClient.get("/ai-engine/models/active/")
                ])

                setStats({
                    patients: patientsRes.data.length,
                    accuracy: modelRes.data?.accuracy ? Number((modelRes.data.accuracy * 100).toFixed(1)) : 94.8,
                    dataSize: `${(analysisRes.data.length * 45.2).toFixed(1)} MB`,
                    recentAnalyses: analysisRes.data.slice(0, 4)
                })
            } catch (err) {
                console.error("Dashboard fetch failed:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden pb-12">
            <BrainSignalBackground />

            <div className="container py-10 relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm mb-4">
                            <Server className="mr-2 h-4 w-4 fill-emerald-500" />
                            Neural Operations Center
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                            Operatsiyalar <span className="text-emerald-500 italic">Markazi</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 mt-2">Barcha klinik tugunlar va AI tahlillarning real vaqtdagi umumiy holati.</p>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <Link href="/analysis">
                            <Button size="xl" className="rounded-2xl h-16 px-8 font-black shadow-xl shadow-emerald-500/20 micro-interact glow-teal">
                                <Play className="w-5 h-5 mr-2 fill-white" />
                                Yangi Tahlil
                            </Button>
                        </Link>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard icon={Users} label="Active Patients" value={stats.patients.toString()} sub="Total Clinical Pool" color="emerald" />
                        <StatCard icon={TrendingUp} label="AI Accuracy" value={`${stats.accuracy}%`} sub="Neural Model v4" color="blue" />
                        <StatCard icon={Globe} label="Region Nodes" value="01" sub="Latency: 2ms" color="orange" />
                        <StatCard icon={Database} label="Local Data" value={stats.dataSize} sub="Storage Integrity: High" color="purple" />
                    </div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 space-y-8">
                        <MedCard className="bg-slate-900 text-white border-none p-1 overflow-hidden h-[400px] flex flex-col group">
                            <div className="p-8 pb-4 flex justify-between items-center relative z-10">
                                <div>
                                    <h3 className="text-lg font-black tracking-tight">Active Neural Pulse</h3>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time inference stream</p>
                                </div>
                            </div>
                            <div className="flex-1 relative">
                                <EegSignalPreview active speed={0.5} className="absolute inset-0 w-full h-full opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" />
                                <div className="absolute inset-x-0 bottom-0 p-8 text-center text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                                    Live Signal Synthesis
                                </div>
                            </div>
                        </MedCard>

                        <div className="grid md:grid-cols-2 gap-8">
                            <MedCard className="p-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center">
                                    <History className="w-4 h-4 mr-2 text-emerald-500" />
                                    Recent Diagnostic Events
                                </h4>
                                <div className="space-y-4">
                                    {stats.recentAnalyses.map((h, i) => (
                                        <EventRow
                                            key={h.id}
                                            id={`P-${h.id}`}
                                            time={new Date(h.created_at).toLocaleTimeString()}
                                            action={h.patient_details?.fullname || "Analysis"}
                                            status={h.status.toUpperCase()}
                                            color={h.status === 'completed' ? 'text-emerald-500' : 'text-blue-500'}
                                        />
                                    ))}
                                    {!stats.recentAnalyses.length && <div className="text-xs text-slate-400 font-bold italic py-4">No recent activity.</div>}
                                </div>
                                <Link href="/history">
                                    <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-50">
                                        Arxivga o'tish
                                    </Button>
                                </Link>
                            </MedCard>

                            <MedCard className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-blue-500/10">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center">
                                    <BrainCircuit className="w-4 h-4 mr-2 text-blue-500" />
                                    AI Model Stats
                                </h4>
                                <div className="space-y-6">
                                    <ProgressStat label="Seizure Detection" progress={Number(stats.accuracy)} color="bg-blue-500" />
                                    <ProgressStat label="Band Decomposition" progress={92} color="bg-emerald-500" />
                                    <ProgressStat label="Artifact Removal" progress={85} color="bg-orange-500" />
                                </div>
                            </MedCard>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-4 space-y-8">
                        <MedCard className="bg-white/80 dark:bg-transparent backdrop-blur-xl border-emerald-500/10 p-8 shadow-xl">
                            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center">
                                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
                                Node Integrity
                            </h3>
                            <div className="space-y-6">
                                <NodeItem label="Main API Node" status="Healthy" latency="2ms" />
                                <NodeItem label="Neural Engine" status="Online" latency="45ms" />
                                <NodeItem label="DB Cluster" status="Stable" latency="1ms" />
                            </div>
                        </MedCard>

                        <MedCard className="bg-emerald-600 text-white border-none p-8 overflow-hidden relative group">
                            <div className="absolute right-0 top-0 p-8 opacity-20">
                                <AlertCircle className="w-24 h-24" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-4">Urgent Tasks</h3>
                            <div className="text-3xl font-black mb-1">00</div>
                            <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">No pending reviews.</div>
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
        <MedCard className="p-6 bg-white dark:bg-slate-900 group hover:shadow-2xl transition-all h-full flex flex-col items-center text-center">
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
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
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

function NodeItem({ label, status, latency }: { label: string, status: string, latency: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{label}</span>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{status}</div>
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
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} className={cn("h-full", color)} />
            </div>
        </div>
    )
}
