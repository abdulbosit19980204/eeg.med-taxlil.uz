"use client"

import { useState, useEffect } from "react"
import { MedCard } from "@/components/shared/med-card"
import { EdfUpload } from "@/components/upload/edf-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BrainCircuit, History, ShieldCheck, Activity, Zap, Cpu, Search, Database, FileText, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"
import { EegSignalPreview } from "@/components/shared/eeg-signal-preview"

type AnalysisState = 'IDLE' | 'UPLOADING' | 'PRE_PROCESSING' | 'NEURAL_INFERENCE' | 'POST_PROCESSING' | 'COMPLETED'

export default function AnalysisPage() {
    const [state, setState] = useState<AnalysisState>('IDLE')
    const [results, setResults] = useState<any>(null)
    const [logs, setLogs] = useState<{ time: string, msg: string, type: 'info' | 'warn' | 'success' }[]>([])

    const addLog = (msg: string, type: 'info' | 'warn' | 'success' = 'info') => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setLogs(prev => [{ time, msg, type }, ...prev].slice(0, 8))
    }

    const handleUploadStart = () => {
        setState('UPLOADING')
        addLog("Initializing connection to Neural Core...", 'info')
        addLog("Streaming EDF data to GPU cluster...", 'info')
    }

    const handleSuccess = (data: any) => {
        console.log("Upload Success", data)
        // Simulate deep processing steps
        addLog("Upload complete. Beginning artifact filtration...", 'success')
        setState('PRE_PROCESSING')

        setTimeout(() => {
            addLog("Signal segmented. Loading LSTM-v3 model...", 'info')
            setState('NEURAL_INFERENCE')

            setTimeout(() => {
                addLog("Neural inference complete. High confidence detected.", 'success')
                addLog("Synthesizing clinical summary...", 'info')
                setState('POST_PROCESSING')

                setTimeout(() => {
                    setResults(data.analysis)
                    setState('COMPLETED')
                    addLog("Analysis finalized. Report ready.", 'success')
                }, 1500)
            }, 2000)
        }, 1500)
    }

    const stepLabel = {
        IDLE: "Tayyor",
        UPLOADING: "Yuklanmoqda...",
        PRE_PROCESSING: "Filtrlanmoqda...",
        NEURAL_INFERENCE: "AI Tahlil...",
        POST_PROCESSING: "Xulosa tayyorlash...",
        COMPLETED: "Tugallandi"
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] relative bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <BrainSignalBackground />

            <div className="container py-8 md:py-12 relative z-10">
                {/* Dashboard Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left Panel: System Status */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-3 space-y-6"
                    >
                        <MedCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-emerald-500/10 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <h3 className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center">
                                <Cpu className="w-4 h-4 mr-2 text-emerald-500" />
                                System Core Status
                            </h3>
                            <div className="space-y-4">
                                <StatusRow label="AI Inference" value="Online" color="text-emerald-500" />
                                <StatusRow label="GPU Load" value="12%" color="text-slate-500" />
                                <StatusRow label="Latency" value="2.4ms" color="text-slate-500" />
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">Neural Health</div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            animate={{ width: ["90%", "95%", "92%"] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="h-full bg-emerald-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </MedCard>

                        <MedCard className="bg-slate-900 text-white border-none p-5 overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700" />
                            <h3 className="text-[10px] font-black tracking-[0.2em] text-emerald-400 uppercase mb-4">Quick Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-2xl font-black">12.4k</div>
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">Processed</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black">98.4%</div>
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">Accuracy</div>
                                </div>
                            </div>
                        </MedCard>
                    </motion.div>

                    {/* Middle Panel: Main Command Zone */}
                    <div className="lg:col-span-6 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-emerald-500/5 border border-slate-100 dark:border-slate-800 p-2"
                        >
                            <Tabs defaultValue="upload" className="w-full">
                                <TabsList className="w-full h-16 grid grid-cols-2 bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] p-1.5 mb-2">
                                    <TabsTrigger value="upload" className="rounded-2xl text-sm font-bold micro-interact data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-lg">
                                        <BrainCircuit className="w-4 h-4 mr-2" />
                                        Yangi Analiz
                                    </TabsTrigger>
                                    <TabsTrigger value="history" className="rounded-2xl text-sm font-bold micro-interact data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-lg">
                                        <History className="w-4 h-4 mr-2" />
                                        Tarix
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="upload" className="p-6 md:p-10 outline-none">
                                    <AnimatePresence mode="wait">
                                        {state === 'IDLE' ? (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="space-y-8"
                                            >
                                                <div className="text-center space-y-2 mb-8">
                                                    <h2 className="text-4xl font-black tracking-tight dark:text-white text-slate-900">Command Zone</h2>
                                                    <p className="text-slate-500 text-sm">EEG faylini tanlang va tahlil turlarini belgilang</p>
                                                </div>

                                                <div className="relative group">
                                                    <div className="absolute inset-0 bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <EdfUpload
                                                        onSuccess={handleSuccess}
                                                        onUploadStart={handleUploadStart}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    <SmallModeCard icon={Search} label="Anomalies" active />
                                                    <SmallModeCard icon={Database} label="Spectral" />
                                                    <SmallModeCard icon={Zap} label="Fast Trace" />
                                                </div>
                                            </motion.div>
                                        ) : state === 'COMPLETED' ? (
                                            <motion.div
                                                key="completed"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="space-y-8"
                                            >
                                                <div className="flex items-center justify-between p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/50 shadow-sm shadow-emerald-500/10">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40">
                                                            <ShieldCheck className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5 whitespace-nowrap">Result Finalized</div>
                                                            <div className="text-lg font-black text-slate-900 dark:text-white">Diagnostika Xulosasi</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-3xl font-black text-emerald-600">{(results.probability * 100).toFixed(1)}%</div>
                                                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Confidence Score</div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-4 gap-3">
                                                    <CompactChip label="STAT" value="Normal" color="emerald" />
                                                    <CompactChip label="VER" value="v3.0" color="blue" />
                                                    <CompactChip label="PROC" value="1.2s" color="orange" />
                                                    <CompactChip label="CHAN" value="16" color="purple" />
                                                </div>

                                                <div className="p-8 bg-slate-50 dark:bg-slate-950/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-xl text-slate-700 dark:text-slate-300 relative">
                                                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-emerald-500 rounded-r-full" />
                                                    <span className="font-black text-emerald-500 mr-2">AI Summary:</span>
                                                    <span className="italic">"{results.summary}"</span>
                                                </div>

                                                <div className="flex gap-4">
                                                    <Button className="flex-1 rounded-full h-14 font-bold shadow-xl shadow-emerald-500/20 micro-interact glow-teal">
                                                        <FileText className="w-4 h-4 mr-2" />
                                                        Download PDF
                                                    </Button>
                                                    <Button variant="outline" className="flex-1 rounded-full h-14 font-bold micro-interact" onClick={() => setState('IDLE')}>
                                                        New Analysis
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="processing"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center py-12 space-y-10"
                                            >
                                                <div className="relative w-48 h-48">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30"
                                                    />
                                                    <motion.div
                                                        animate={{ rotate: -360 }}
                                                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-4 rounded-full border border-dashed border-emerald-500/20"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.div
                                                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="flex flex-col items-center"
                                                        >
                                                            <Activity className="w-12 h-12 text-emerald-500 mb-2" />
                                                            <div className="text-[10px] font-black text-emerald-600 tracking-[0.2em]">{stepLabel[state]}</div>
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                <EegSignalPreview active speed={state === 'NEURAL_INFERENCE' ? 2 : 1} className="w-full h-32 rounded-2xl bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-100 dark:border-slate-800" />

                                                <div className="w-full space-y-2 px-8">
                                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                        <span>Processing Neural Data</span>
                                                        <span className="text-emerald-500">
                                                            {state === 'UPLOADING' && "25%"}
                                                            {state === 'PRE_PROCESSING' && "45%"}
                                                            {state === 'NEURAL_INFERENCE' && "75%"}
                                                            {state === 'POST_PROCESSING' && "90%"}
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-emerald-500"
                                                            initial={{ width: "0%" }}
                                                            animate={{
                                                                width: state === 'UPLOADING' ? "25%" :
                                                                    state === 'PRE_PROCESSING' ? "45%" :
                                                                        state === 'NEURAL_INFERENCE' ? "75%" : "95%"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </TabsContent>

                                <TabsContent value="history" className="p-10 outline-none focus-visible:ring-0">
                                    <div className="h-80 flex flex-col items-center justify-center text-slate-400 space-y-6">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                            <History className="w-8 h-8 opacity-40" />
                                        </div>
                                        <p className="font-bold text-sm">Hozircha tahlillar mavjud emas</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </div>

                    {/* Right Panel: Live Logs */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-3 space-y-6"
                    >
                        <MedCard className="bg-white/80 dark:bg-transparent backdrop-blur-xl border-emerald-500/10 min-h-[400px] flex flex-col p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <h3 className="text-xs font-black tracking-[0.2em] text-emerald-500 uppercase mb-6 flex items-center">
                                <Activity className="w-4 h-4 mr-2" />
                                Neural Core Logs
                            </h3>
                            <div className="flex-1 space-y-4 overflow-hidden">
                                <AnimatePresence initial={false}>
                                    {logs.length === 0 && (
                                        <div className="flex flex-col items-center justify-center h-48 opacity-10 grayscale">
                                            <FileText className="w-10 h-10 mb-2 text-slate-400" />
                                            <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Waiting for stream...</div>
                                        </div>
                                    )}
                                    {logs.map((log, i) => (
                                        <motion.div
                                            key={`${log.time}-${i}`}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-1"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-[8px] font-black font-mono text-slate-400">[{log.time}]</span>
                                                <div className={cn(
                                                    "w-1 h-1 rounded-full",
                                                    log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                                                )} />
                                            </div>
                                            <div className={cn(
                                                "text-[9px] font-bold leading-tight pl-2 border-l border-slate-100 dark:border-slate-800 ml-1",
                                                log.type === 'success' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'
                                            )}>
                                                {log.msg}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <motion.div
                                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Live core stream active</span>
                                </motion.div>
                            </div>
                        </MedCard>

                        <Button variant="outline" className="w-full rounded-2xl h-14 group border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shadow-lg shadow-slate-200/20 dark:shadow-none">
                            <span className="text-xs font-bold mr-auto text-slate-600 dark:text-slate-400">Advanced Settings</span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>

                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 flex flex-wrap justify-center items-center gap-x-16 gap-y-8 py-10 border-t border-slate-200 dark:border-slate-800/50"
                >
                    <StatMini label="Neural Parameters" value="48.5M" />
                    <StatMini label="Model Checkpoint" value="v3.g0" />
                    <StatMini label="Cloud Storage" value="99.9%" />
                </motion.div>
            </div>
        </div>
    )
}

function StatusRow({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="flex justify-between items-center text-[11px] font-bold">
            <span className="text-slate-400 uppercase tracking-widest">{label}</span>
            <span className={cn(color)}>{value}</span>
        </div>
    )
}

function SmallModeCard({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={cn(
            "p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 group",
            active ? "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-500/20" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-200"
        )}>
            <Icon className={cn("w-5 h-5", active ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-500")} />
            <span className={cn("text-[9px] font-black uppercase tracking-[0.15em]", active ? "text-emerald-700" : "text-slate-400")}>{label}</span>
        </div>
    )
}

function CompactChip({ label, value, color }: { label: string, value: string, color: string }) {
    const colors: any = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800",
        blue: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800",
        orange: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:border-orange-800",
        purple: "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800",
    }
    return (
        <div className={cn("px-2 py-3 rounded-xl border flex flex-col items-center justify-center", colors[color])}>
            <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">{label}</span>
            <span className="text-xs font-black">{value}</span>
        </div>
    )
}

function StatMini({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col items-center group">
            <span className="text-[10px] font-black text-slate-400 tracking-widest leading-none mb-3 group-hover:text-emerald-500 transition-colors uppercase">{label}</span>
            <span className="text-3xl font-black text-slate-800 dark:text-slate-200">{value}</span>
        </div>
    )
}
