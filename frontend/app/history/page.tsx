"use client"

import React, { useState, useEffect, useCallback } from "react"
import { MedCard } from "@/components/shared/med-card"
import { FileText, Download, Trash2, Search, Filter, Activity, Clock, Database, ChevronRight, Brain, Zap, ShieldCheck, Microscope, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { EegSignalPreview } from "@/components/shared/eeg-signal-preview"
import { cn } from "@/lib/utils"
import apiClient from "@/lib/api-client"

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const fetchHistory = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await apiClient.get("/analysis/records/")
            setHistory(response.data)
        } catch (err) {
            console.error("Failed to fetch history:", err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchHistory()
    }, [fetchHistory])

    const filteredHistory = history.filter(item =>
        item.edf_file.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patient_details?.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const stats = {
        totalSize: (history.length * 45.2).toFixed(1), // Simulated aggregate
        avgConfidence: history.length > 0
            ? (history.reduce((acc, curr) => acc + (curr.seizure_probability || 0), 0) / history.length * 100).toFixed(1)
            : "0",
        countsByStatus: {
            completed: history.filter(h => h.status === 'completed').length,
            error: history.filter(h => h.status === 'error').length,
            processing: history.filter(h => h.status === 'processing').length
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm("Ushbu tahlilni o'chirishni xohlaysizmi?")) {
            try {
                await apiClient.delete(`/analysis/records/${id}/`)
                setHistory(prev => prev.filter(h => h.id !== id))
            } catch (err) {
                console.error("Delete failed:", err)
            }
        }
    }

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <BrainSignalBackground />

            <div className="container py-12 relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm mb-4">
                            <Clock className="mr-2 h-4 w-4 fill-emerald-500" />
                            Clinical Archive V2.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                            Tarixiy <span className="text-emerald-500 italic">Arxiv</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 mt-2">Neyron tahlillar va kognitiv hisobotlar ombori.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80 group">
                            <div className="absolute inset-0 bg-emerald-500/5 blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 z-10" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 rounded-2xl h-14 border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg shadow-slate-200/50 dark:shadow-none relative z-0"
                                placeholder="Bemor ismi yoki fayl nomi..."
                            />
                        </div>
                        <Button variant="outline" className="rounded-2xl h-14 w-14 p-0 shrink-0" onClick={fetchHistory}>
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
                        </Button>
                    </motion.div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        <MedCard className="bg-slate-900 text-white border-none p-8 overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/40 transition-all duration-700" />
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6">Database Insights</div>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-4xl font-black">{stats.totalSize} MB</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Local Storage Used</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black">{stats.avgConfidence}%</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Avg AI Confidence</div>
                                </div>
                            </div>
                        </MedCard>

                        <MedCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-emerald-500/10 p-6">
                            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center">
                                <Microscope className="w-4 h-4 mr-2 text-emerald-500" />
                                Analysis Breakdown
                            </h3>
                            <div className="space-y-4">
                                <FilterMini category="Completed" count={stats.countsByStatus.completed} active />
                                <FilterMini category="Processing" count={stats.countsByStatus.processing} />
                                <FilterMini category="Errors" count={stats.countsByStatus.error} />
                            </div>
                        </MedCard>
                    </div>

                    <div className="lg:col-span-9">
                        <MedCard className="p-0 overflow-hidden border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl min-h-[400px]">
                            {isLoading && !history.length ? (
                                <div className="h-96 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[800px]">
                                        <thead>
                                            <tr className="bg-slate-100/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-12"></th>
                                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fayl va Status</th>
                                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bemor</th>
                                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sana</th>
                                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Amallar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredHistory.map((item) => (
                                                <React.Fragment key={item.id}>
                                                    <motion.tr
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className={cn(
                                                            "border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all cursor-pointer group",
                                                            expandedId === item.id && "bg-emerald-50/50 dark:bg-emerald-900/20"
                                                        )}
                                                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                                    >
                                                        <td className="p-6">
                                                            <ChevronRight className={cn("w-4 h-4 text-slate-300 transition-transform duration-300", expandedId === item.id && "rotate-90 text-emerald-500")} />
                                                        </td>
                                                        <td className="p-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-500">
                                                                    <FileText className="w-6 h-6" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{item.edf_file.split('/').pop()}</div>
                                                                    <div className={cn("text-[10px] font-black uppercase tracking-widest",
                                                                        item.status === 'completed' ? 'text-emerald-500' :
                                                                            item.status === 'error' ? 'text-red-500' : 'text-blue-500'
                                                                    )}>
                                                                        {item.status}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-6 text-sm font-black text-slate-700 dark:text-slate-200">{item.patient_details?.fullname || "Unknown"}</td>
                                                        <td className="p-6 text-sm font-bold text-slate-400">{new Date(item.created_at).toLocaleDateString()}</td>
                                                        <td className="p-6">
                                                            <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                                                                <a href={item.edf_file} download className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-emerald-500 transition-all">
                                                                    <Download className="w-4 h-4" />
                                                                </a>
                                                                <Button variant="ghost" className="w-10 h-10 rounded-xl text-red-500 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}>
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>

                                                    <AnimatePresence>
                                                        {expandedId === item.id && (
                                                            <tr>
                                                                <td colSpan={5} className="p-0 border-b border-slate-100 dark:border-slate-800">
                                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
                                                                        <div className="p-8 grid lg:grid-cols-2 gap-10">
                                                                            <div className="space-y-6">
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg"><Brain className="w-5 h-5" /></div>
                                                                                    <div>
                                                                                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">AI Clinical Insights</div>
                                                                                        <div className="text-lg font-black text-slate-900 dark:text-white">Diagnostik Xulosa</div>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 italic">
                                                                                    "{item.ai_summary || "Tahlil xulosasi kutilmoqda..."}"
                                                                                </p>
                                                                                <div className="grid grid-cols-3 gap-4">
                                                                                    <InsightChip icon={Zap} label="Confidence" value={item.seizure_probability ? `${(item.seizure_probability * 100).toFixed(1)}%` : "--"} color="emerald" />
                                                                                    <InsightChip icon={ShieldCheck} label="Verification" value="v3.0.4" color="blue" />
                                                                                    <InsightChip icon={Activity} label="Channels" value={item.channels_count || "--"} color="orange" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="space-y-4">
                                                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Neural Trace Preview</div>
                                                                                <div className="h-44 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative">
                                                                                    <EegSignalPreview active={item.status === 'completed'} speed={1} className="w-full h-full opacity-60" />
                                                                                    <div className="absolute top-4 right-4"><div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em] border border-emerald-500/20">Live Preview</div></div>
                                                                                </div>
                                                                                <Button className="w-full h-12 rounded-2xl font-black bg-white dark:bg-slate-900 text-emerald-600 border border-emerald-500/10 hover:bg-emerald-50 transition-all">
                                                                                    To'liq Hisobotni Ochish
                                                                                    <ChevronRight className="w-4 h-4 ml-2" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </AnimatePresence>
                                                </React.Fragment>
                                            ))}
                                            {!history.length && !isLoading && (
                                                <tr>
                                                    <td colSpan={5} className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Arxiv bo'sh</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </MedCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilterMini({ category, count, active = false }: { category: string, count: number, active?: boolean }) {
    return (
        <div className={cn("flex justify-between items-center p-3 rounded-2xl transition-all", active ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 shadow-sm" : "text-slate-400")}>
            <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
            <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">{count}</span>
        </div>
    )
}

function InsightChip({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    const colors: any = {
        emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100",
        blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/10 border-blue-100",
        orange: "text-orange-600 bg-orange-50 dark:bg-orange-900/10 border-orange-100",
    }
    return (
        <div className={cn("flex flex-col items-center justify-center p-3 rounded-2xl border", colors[color])}>
            <Icon className="w-4 h-4 mb-2 opacity-70" />
            <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">{label}</div>
            <div className="text-sm font-black tracking-tight">{value}</div>
        </div>
    )
}
