"use client"

import { useEffect, useState } from "react"
import { MedCard } from "@/components/shared/med-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Database, Cpu, TrendingUp, CheckCircle2, Loader2, Zap, Activity, ShieldCheck, Cpu as CpuIcon, Terminal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DATASET_PROGRESS = [
    { name: 'Yan', count: 400 },
    { name: 'Fev', count: 650 },
    { name: 'Mar', count: 900 },
    { name: 'Apr', count: 1200 },
    { name: 'May', count: 1550 },
    { name: 'Jun', count: 2100 },
];

const ACCURACY_STATS = [
    { epoch: 1, acc: 0.65, loss: 0.45 },
    { epoch: 10, acc: 0.82, loss: 0.28 },
    { epoch: 20, acc: 0.91, loss: 0.15 },
    { epoch: 30, acc: 0.94, loss: 0.10 },
    { epoch: 40, acc: 0.96, loss: 0.07 },
    { epoch: 50, acc: 0.98, loss: 0.04 },
];

export default function TrainingPage() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [logs, setLogs] = useState<{ time: string, msg: string, type: 'info' | 'success' | 'warn' }[]>([])

    const addLog = (msg: string, type: 'info' | 'success' | 'warn' = 'info') => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setLogs(prev => [{ time, msg, type }, ...prev].slice(0, 10))
    }

    useEffect(() => {
        fetch("http://localhost:8000/api/analysis/v1/training-stats/")
            .then(res => res.json())
            .then(data => {
                setStats(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })

        // Initial Logs
        addLog("Neural Core v3.0 initializing...", "info")
        addLog("Loading weights from checkpoint-v2.9...", "info")
        addLog("Data pipeline connected to GPU Cluster-A", "success")

        const logInterval = setInterval(() => {
            const randomLogs = [
                "Adjusting weights: Layer-4 optimizer step",
                "Gradient descent check: OK",
                "New dataset batch processed (128 samples)",
                "Validation accuracy increased: +0.02%",
                "Backpropogation sequence active",
                "Epoch training phase 2/4"
            ]
            addLog(randomLogs[Math.floor(Math.random() * randomLogs.length)], "info")
        }, 5000)

        return () => clearInterval(logInterval)
    }, [])

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center"
                    >
                        Connecting to Hub...
                    </motion.div>
                </div>
            </div>
        )
    }

    const displayStats = stats || {
        dataset_size: 15402,
        epochs_completed: 74,
        total_epochs: 100,
        accuracy: 98.4
    }

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <BrainSignalBackground />

            <div className="container py-12 relative z-10">
                {/* Header Information */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm mb-4">
                            <CpuIcon className="mr-2 h-4 w-4 fill-emerald-500" />
                            Neural Training Center
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                            AI <span className="text-emerald-500 italic">O'qitish</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 mt-2">Modelning o'sish dinamikasi va dataset statistikasi.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-end gap-3"
                    >
                        <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-emerald-500/20 text-emerald-600 rounded-3xl shadow-xl shadow-emerald-500/10 font-black text-sm">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            MODEL STATUS: ACTIVE TRAINING
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Last update: {new Date().toLocaleTimeString()}</div>
                    </motion.div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Main Stats Grid */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <PremiumStatsCard icon={Database} label="Dataset Hajmi" value={displayStats.dataset_size.toLocaleString()} sub="EEG Fayllari" color="emerald" />
                        <PremiumStatsCard icon={Cpu} label="Epoch Progress" value={`${displayStats.epochs_completed}%`} sub="74 / 100 Epochs" color="blue" />
                        <PremiumStatsCard icon={TrendingUp} label="Joriy Aniqlik" value={`${displayStats.accuracy}%`} sub="+0.04% vs last epoch" color="orange" />
                        <PremiumStatsCard icon={CheckCircle2} label="Model Version" value={displayStats.model_version || "v3.0.4"} sub="Emerald Inference" color="purple" />
                    </div>

                    {/* Analytics Section */}
                    <div className="lg:col-span-8 grid gap-8">
                        <MedCard className="h-[450px] flex flex-col p-8 overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Training Metrics</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Accuracy vs Loss Dynamics</p>
                                </div>
                                <div className="flex gap-4">
                                    <ChartLegend label="Accuracy" color="#10b981" />
                                    <ChartLegend label="Loss" color="#f59e0b" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={ACCURACY_STATS}>
                                        <defs>
                                            <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.1} />
                                        <XAxis dataKey="epoch" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '16px', background: 'rgba(255,255,255,0.9)' }}
                                            itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                                        />
                                        <Area type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAcc)" />
                                        <Line type="monotone" dataKey="loss" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </MedCard>

                        <div className="grid md:grid-cols-2 gap-8">
                            <MedCard className="h-80 flex flex-col p-8">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Dataset Growth</h3>
                                <div className="flex-1">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={DATASET_PROGRESS}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.1} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                                            <YAxis hide />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(16,185,129,0.05)' }}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            />
                                            <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} barSize={32} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </MedCard>

                            <MedCard className="bg-slate-900 border-none p-8 flex flex-col text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                                    <Activity className="w-32 h-32" />
                                </div>
                                <h3 className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-10">Neural HW Status</h3>
                                <div className="space-y-6 flex-1">
                                    <HWRow label="GPU Utilization" value="88%" active />
                                    <HWRow label="VRAM Allocated" value="12.4 GB" />
                                    <HWRow label="Temp (Node-A)" value="64°C" />
                                    <HWRow label="Sync Priority" value="Critical" active />
                                </div>
                            </MedCard>
                        </div>
                    </div>

                    {/* Sidebar / Logs Panel */}
                    <div className="lg:col-span-4 space-y-8">
                        <MedCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-emerald-500/10 min-h-[500px] flex flex-col p-0 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                                <h3 className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase flex items-center">
                                    <Terminal className="w-4 h-4 mr-2 text-emerald-500" />
                                    Live Training Logs
                                </h3>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            </div>
                            <div className="p-6 flex-1 font-mono space-y-4">
                                <AnimatePresence initial={false}>
                                    {logs.map((log, i) => (
                                        <motion.div
                                            key={`${log.time}-${i}`}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-1"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-slate-400">[{log.time}]</span>
                                                <div className={cn(
                                                    "w-1 h-1 rounded-full",
                                                    log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                                                )} />
                                            </div>
                                            <div className={cn(
                                                "text-[10px] font-bold leading-relaxed pl-3 border-l border-slate-100 dark:border-slate-800 ml-1.5",
                                                log.type === 'success' ? 'text-emerald-600' : 'text-slate-500 truncate'
                                            )}>
                                                {log.msg}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div className="p-4 bg-slate-900 text-center">
                                <Button variant="ghost" className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-white hover:bg-white/5 w-full">
                                    Export Full Epoch Data
                                </Button>
                            </div>
                        </MedCard>

                        <div className="p-8 rounded-[2.5rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12">
                                <ShieldCheck className="w-40 h-40" />
                            </div>
                            <h4 className="text-xl font-black mb-2">Model Validation</h4>
                            <p className="text-sm opacity-80 leading-relaxed max-w-[200px]">Model doimiy ravishda real-time tahlillar asosida tekshiriladi.</p>
                            <Button className="mt-8 bg-white text-emerald-600 rounded-2xl font-black hover:bg-slate-50 px-8 py-6 h-auto">
                                Run Test Batch
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Bottom Stats Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 flex flex-wrap justify-between items-center gap-12 py-10 border-t border-slate-200 dark:border-slate-800/50"
                >
                    <StatMini label="Uptime" value="142d" />
                    <StatMini label="Nodes Active" value="12/12" />
                    <StatMini label="Learning Rate" value="0.0002" />
                    <StatMini label="Sync Mode" value="Async" />
                    <StatMini label="Hardware" value="A100 x4" />
                </motion.div>
            </div>
        </div>
    )
}

function PremiumStatsCard({ icon: Icon, label, value, sub, color }: { icon: any, label: string, value: string, sub: string, color: string }) {
    const colorClasses: any = {
        emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/10 shadow-emerald-500/5",
        blue: "bg-blue-500/10 text-blue-600 border-blue-500/10 shadow-blue-500/5",
        orange: "bg-orange-500/10 text-orange-600 border-orange-500/10 shadow-orange-500/5",
        purple: "bg-purple-500/10 text-purple-600 border-purple-500/10 shadow-purple-500/5",
    }
    return (
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <MedCard className={cn("flex flex-col space-y-4 p-8 border hover:shadow-2xl transition-all h-full bg-white dark:bg-slate-900 group", colorClasses[color])}>
                <div className={cn("p-4 w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                    color === 'emerald' ? 'bg-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600'
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2 block">{label}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-slate-900 dark:text-white">{value}</span>
                        <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{sub}</span>
                    </div>
                </div>
            </MedCard>
        </motion.div>
    )
}

function HWRow({ label, value, active = false }: { label: string, value: string, active?: boolean }) {
    return (
        <div className="flex justify-between items-center group">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">{label}</span>
            <div className="flex items-center gap-2">
                <span className={cn("text-sm font-black font-mono", active ? "text-emerald-400" : "text-white")}>{value}</span>
                {active && <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />}
            </div>
        </div>
    )
}

function ChartLegend({ label, color }: { label: string, color: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
    )
}

function StatMini({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col group">
            <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] leading-none mb-3 group-hover:text-emerald-500 transition-colors uppercase">{label}</span>
            <span className="text-2xl font-black text-slate-800 dark:text-slate-200">{value}</span>
        </div>
    )
}
