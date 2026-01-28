"use client"

import React, { useState } from "react"
import { MedCard } from "@/components/shared/med-card"
import { FileText, Download, Trash2, Search, Filter, Activity, Clock, Database, ChevronRight, ChevronDown, Brain, Zap, ShieldCheck, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { EegSignalPreview } from "@/components/shared/eeg-signal-preview"
import { cn } from "@/lib/utils"

const MOCK_HISTORY = [
    { id: 1, name: "Bemor_102.edf", patient: "Abduvaliyev J.", date: "2024-01-22", size: "24.5 MB", status: "Completed", type: "Alpha-Stress", probability: 0.94, summary: "Alpha to'lqinlarining sezilarli pasayishi va vaqtinchalik disritmiya aniqlandi. Neyrotizim barqaror." },
    { id: 2, name: "Sleep_Study.edf", patient: "Ismoilova G.", date: "2024-01-20", size: "112.1 MB", status: "Completed", type: "REM-Phase", probability: 0.88, summary: "REM bosqichining davomiyligi normadan 15% ga ko'p. Gipersomniya belgilari kuzatilmoqda." },
    { id: 3, name: "Alpha_Test.edf", patient: "Karimov T.", date: "2024-01-18", size: "45.0 MB", status: "Completed", type: "Spectral", probability: 0.97, summary: "Spektral tahlil barcha zonalarda normal ritmni ko'rsatmoqda. Anomal holatlar aniqlanmadi." },
    { id: 4, name: "Neural_Trace.edf", patient: "Omonov D.", date: "2024-01-15", size: "12.2 MB", status: "Completed", type: "Spikes", probability: 0.91, summary: "Frontal zonada markazlashgan spike-to'lqin komplekslari. Epileptiform faollik ehtimoli mavjud." },
]

export default function HistoryPage() {
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredHistory = MOCK_HISTORY.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patient.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <BrainSignalBackground />

            <div className="container py-12 relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm mb-4">
                            <Clock className="mr-2 h-4 w-4 fill-emerald-500" />
                            Clinical Archive V2.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                            Tarixiy <span className="text-emerald-500 italic">Arxiv</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 mt-2">Neyron tahlillar va kognitiv hisobotlar ombori.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 w-full md:w-auto"
                    >
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
                        <Button variant="outline" size="xl" className="rounded-2xl h-14 w-14 p-0 shrink-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <Filter className="w-5 h-5 text-slate-400" />
                        </Button>
                    </motion.div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Database Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3 space-y-6"
                    >
                        <MedCard className="bg-slate-900 text-white border-none p-8 overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/40 transition-all duration-700" />
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6">Database Insights</div>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-4xl font-black">1.2 TB</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Storage Density</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black">94.5%</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Avg AI Confidence</div>
                                </div>
                            </div>
                        </MedCard>

                        <MedCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-emerald-500/10 p-6 shadow-xl shadow-slate-200/40 dark:shadow-none">
                            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center">
                                <Microscope className="w-4 h-4 mr-2 text-emerald-500" />
                                Neural Filter
                            </h3>
                            <div className="space-y-4">
                                <FilterMini category="Spikes" count={12} active />
                                <FilterMini category="Alpha" count={45} />
                                <FilterMini category="Spectral" count={28} />
                                <FilterMini category="REM" count={14} />
                            </div>
                        </MedCard>
                    </motion.div>

                    {/* Table View */}
                    <div className="lg:col-span-9">
                        <MedCard className="p-0 overflow-hidden border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-slate-100/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-12"></th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fayl va Tur</th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bemor</th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sana</th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Amallar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredHistory.map((item, i) => (
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
                                                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-500 shadow-sm transition-transform">
                                                                <FileText className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">{item.name}</div>
                                                                <div className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">{item.type} • {item.size}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-6 text-sm font-black text-slate-700 dark:text-slate-200">{item.patient}</td>
                                                    <td className="p-6 text-sm font-bold text-slate-400">{item.date}</td>
                                                    <td className="p-6">
                                                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                                                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:text-emerald-500">
                                                                <Download className="w-4 h-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-destructive hover:bg-destructive/10">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </motion.tr>

                                                <AnimatePresence>
                                                    {expandedId === item.id && (
                                                        <tr>
                                                            <td colSpan={5} className="p-0 border-b border-slate-100 dark:border-slate-800">
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="overflow-hidden bg-slate-50/50 dark:bg-slate-950/20"
                                                                >
                                                                    <div className="p-8 grid lg:grid-cols-2 gap-10">
                                                                        <div className="space-y-6">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                                                                    <Brain className="w-5 h-5" />
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">AI Clinical Insights</div>
                                                                                    <div className="text-lg font-black text-slate-900 dark:text-white">Diagnostik Xulosa</div>
                                                                                </div>
                                                                            </div>
                                                                            <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm italic">
                                                                                "{item.summary}"
                                                                            </p>
                                                                            <div className="grid grid-cols-3 gap-4">
                                                                                <InsightChip icon={Zap} label="Confidence" value={`${item.probability * 100}%`} color="emerald" />
                                                                                <InsightChip icon={ShieldCheck} label="Verification" value="v3.0.4" color="blue" />
                                                                                <InsightChip icon={Activity} label="Complexity" value="Med-Level" color="orange" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="space-y-4">
                                                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Neural Trace Preview</div>
                                                                            <div className="h-44 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative group">
                                                                                <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
                                                                                <EegSignalPreview active={true} speed={1} className="w-full h-full opacity-60" />
                                                                                <div className="absolute top-4 right-4 flex gap-2">
                                                                                    <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em] border border-emerald-500/20">Live Channel Monitor</div>
                                                                                </div>
                                                                            </div>
                                                                            <Button className="w-full h-12 rounded-2xl font-black bg-white dark:bg-slate-900 text-emerald-600 border border-emerald-500/10 hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-500/5">
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
                                    </tbody>
                                </table>
                            </div>
                        </MedCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilterMini({ category, count, active = false }: { category: string, count: number, active?: boolean }) {
    return (
        <div className={cn(
            "flex justify-between items-center p-3 rounded-2xl cursor-pointer transition-all",
            active ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800/50 shadow-sm" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400"
        )}>
            <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
            <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">{count}</span>
        </div>
    )
}

function InsightChip({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    const colors: any = {
        emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/50",
        blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/50",
        orange: "text-orange-600 bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/50",
    }
    return (
        <div className={cn("flex flex-col items-center justify-center p-3 rounded-2xl border", colors[color])}>
            <Icon className="w-4 h-4 mb-2 opacity-70" />
            <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">{label}</div>
            <div className="text-sm font-black tracking-tight">{value}</div>
        </div>
    )
}

function ReactImportFix() {
    // This is just a placeholder to use React in a scope to trigger imports if needed by some tools
    // But in this task I'll ensure React is imported correctly.
}
