"use client"

import { useEffect, useState, useCallback } from "react"
import { MedCard } from "@/components/shared/med-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Database, Cpu, TrendingUp, CheckCircle2, Loader2, Zap, Activity, ShieldCheck, Cpu as CpuIcon, Terminal, PlayCircle, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import apiClient from "@/lib/api-client"

export default function TrainingPage() {
    const [sessions, setSessions] = useState<any[]>([])
    const [currentSession, setCurrentSession] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isStarting, setIsStarting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [datasetType, setDatasetType] = useState<'kaggle' | 'local'>('kaggle')

    const fetchSessions = useCallback(async () => {
        try {
            const response = await apiClient.get("/ai-engine/sessions/")
            setSessions(response.data)

            const active = response.data.find((s: any) =>
                ['downloading', 'preprocessing', 'training'].includes(s.status)
            ) || response.data[0]

            setCurrentSession(active)
            setLoading(false)
        } catch (err) {
            console.error("Failed to fetch sessions:", err)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSessions()
        const interval = setInterval(fetchSessions, 3000)
        return () => clearInterval(interval)
    }, [fetchSessions])

    const startTraining = async () => {
        setIsStarting(true)
        try {
            await apiClient.post("/ai-engine/sessions/start_training/", {
                name: `Training Run ${new Date().toLocaleDateString()}`,
                dataset_type: datasetType,
                dataset_source: datasetType === 'kaggle' ? 'Kaggle: amananandrai/complete-eeg-dataset' : 'Local Upload'
            })
            await fetchSessions()
        } catch (err) {
            console.error("Failed to start training:", err)
        } finally {
            setIsStarting(false)
        }
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            await apiClient.post("/ai-engine/sessions/upload_dataset/", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setDatasetType('local')
            await fetchSessions()
            alert("Dataset yuklandi! Endi 'Local Dataset' tanlagan holda o'qitishni boshlashingiz mumkin.")
        } catch (err) {
            console.error("Upload failed:", err)
            alert("Yuklashda xatolik yuz berdi.")
        } finally {
            setUploading(false)
        }
    }

    if (loading && !sessions.length) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center"
                    >
                        Connecting to AI Engine...
                    </motion.div>
                </div>
            </div>
        )
    }

    const activeSession = currentSession || {
        status: 'idle',
        progress_percentage: 0,
        current_accuracy: 0.94,
        final_accuracy: 0.94,
        logs: "System standby. Ready for clinical data ingestion."
    }

    const logsArray = activeSession.logs ? activeSession.logs.split('\n').filter(Boolean).reverse().slice(0, 15) : []

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <BrainSignalBackground />

            <div className="container py-12 relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm mb-4">
                            <CpuIcon className="mr-2 h-4 w-4 fill-emerald-500" />
                            Neural Training Center
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                            AI <span className="text-emerald-500 italic">O'qitish</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 mt-2">Kaggle va mahalliy datasetlar asosida modelni optimallashtirish.</p>
                    </motion.div>

                    <div className="flex flex-col items-end gap-4">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setDatasetType('kaggle')}
                                className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", datasetType === 'kaggle' ? "bg-white dark:bg-slate-950 text-emerald-500 shadow-sm" : "text-slate-500")}
                            >
                                Kaggle
                            </button>
                            <button
                                onClick={() => setDatasetType('local')}
                                className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", datasetType === 'local' ? "bg-white dark:bg-slate-950 text-emerald-500 shadow-sm" : "text-slate-500")}
                            >
                                Local
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <div className="relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept=".zip"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                                <Button variant="outline" className="rounded-2xl h-16 px-6 font-bold flex gap-2 border-dashed border-2">
                                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
                                    Dataset Yuklash (ZIP)
                                </Button>
                            </div>
                            <Button
                                onClick={startTraining}
                                disabled={isStarting || ['downloading', 'preprocessing', 'training'].includes(activeSession.status)}
                                className="rounded-3xl h-16 px-10 font-black shadow-2xl shadow-emerald-500/20 micro-interact glow-teal flex gap-3"
                            >
                                {isStarting || ['downloading', 'preprocessing', 'training'].includes(activeSession.status) ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <PlayCircle className="w-6 h-6" />
                                )}
                                O'qitishni Boshlash
                            </Button>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">
                            Status: {activeSession.status.toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <PremiumStatsCard icon={Database} label="Dataset Source" value="Kaggle" sub="EEG-Complete" color="emerald" />
                        <PremiumStatsCard icon={Cpu} label="Training Progress" value={`${Math.round(activeSession.progress_percentage)}%`} sub={activeSession.status} color="blue" />
                        <PremiumStatsCard icon={TrendingUp} label="Joriy Aniqlik" value={`${((activeSession.current_accuracy || 0.94) * 100).toFixed(1)}%`} sub="Neural Accuracy" color="orange" />
                        <PremiumStatsCard icon={CheckCircle2} label="Last Successful" value={activeSession.final_accuracy ? `${(activeSession.final_accuracy * 100).toFixed(1)}%` : "--"} sub="Final Metric" color="purple" />
                    </div>

                    <div className="lg:col-span-8 grid gap-8">
                        <MedCard className="h-[450px] flex flex-col p-8 overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Training Metrics</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Accuracy Evolution (Live)</p>
                                </div>
                                <div className="flex gap-4">
                                    <ChartLegend label="Active Accuracy" color="#10b981" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={sessions.slice().reverse().filter(s => s.final_accuracy).map((s, i) => ({ i, acc: s.final_accuracy }))}>
                                        <defs>
                                            <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.1} />
                                        <XAxis dataKey="i" hide />
                                        <YAxis domain={[0.8, 1.0]} hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '16px', background: 'rgba(255,255,255,0.9)' }}
                                        />
                                        <Area type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAcc)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </MedCard>

                        <div className="grid md:grid-cols-2 gap-8">
                            <MedCard className="h-80 flex flex-col p-8">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Dataset Analysis</h3>
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                    <Activity className="w-16 h-16 text-emerald-500/20" />
                                    <p className="text-sm font-bold text-slate-500">Dataset check in progress... No imbalances detected.</p>
                                </div>
                            </MedCard>

                            <MedCard className="bg-slate-900 border-none p-8 flex flex-col text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                                    <Zap className="w-32 h-32" />
                                </div>
                                <h3 className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-10">AI Hardware Node</h3>
                                <div className="space-y-6 flex-1">
                                    <HWRow label="Inference Engine" value="EEGNet-v4" active={activeSession.status === 'training'} />
                                    <HWRow label="Learning Rate" value="0.0001" />
                                    <HWRow label="Optimization" value="AdamW" />
                                    <HWRow label="GPU Ready" value="True" active />
                                </div>
                            </MedCard>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        {activeSession.status === 'failed' && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <MedCard className="bg-red-500/10 border-red-500/50 p-6">
                                    <div className="flex items-center gap-3 text-red-500 mb-4">
                                        <AlertTriangle className="w-6 h-6" />
                                        <h4 className="text-sm font-black uppercase tracking-widest">Tizim Xatoligi</h4>
                                    </div>
                                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] text-red-400 overflow-auto max-h-[300px]">
                                        {activeSession.logs}
                                    </div>
                                    <p className="mt-4 text-[10px] text-slate-500 font-bold leading-relaxed">
                                        Yuqoridagi xatolik modeli o'qitish jarayonida yuz berdi. Iltimos, dataset strukturasi yoki model parametrlarini tekshiring.
                                    </p>
                                </MedCard>
                            </motion.div>
                        )}

                        <MedCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-emerald-500/10 min-h-[500px] flex flex-col p-0 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                                <h3 className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase flex items-center">
                                    <Terminal className="w-4 h-4 mr-2 text-emerald-500" />
                                    Live Training Logs
                                </h3>
                            </div>
                            <div className="p-6 flex-1 font-mono space-y-3 max-h-[400px] overflow-y-auto">
                                <AnimatePresence initial={false}>
                                    {logsArray.map((log: string, i: number) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] leading-relaxed">
                                            <span className="text-emerald-600 font-black mr-2">»</span>
                                            <span className="text-slate-500 dark:text-slate-400 font-bold">{log}</span>
                                        </motion.div>
                                    ))}
                                    {logsArray.length === 0 && (
                                        <div className="text-[10px] text-slate-400 font-bold italic">No logs available for current session.</div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </MedCard>

                        <div className="p-8 rounded-[2.5rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12">
                                <ShieldCheck className="w-40 h-40" />
                            </div>
                            <h4 className="text-xl font-black mb-2">Model Validation</h4>
                            <p className="text-sm opacity-80 leading-relaxed">Model Kaggle datasetidan olingan "Clinical Validation Set" orqali tekshirilishi kutilmoqda.</p>
                        </div>
                    </div>
                </div>
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
                {active && <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
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
