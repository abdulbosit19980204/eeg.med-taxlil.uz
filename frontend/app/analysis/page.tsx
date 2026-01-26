"use client"

import { useState } from "react"
import { MedCard } from "@/components/shared/med-card"
import { EdfUpload } from "@/components/upload/edf-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BrainCircuit, History, ShieldCheck, Activity, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"

export default function AnalysisPage() {
    const [analyzing, setAnalyzing] = useState(false)
    const [results, setResults] = useState<any>(null)

    const handleSuccess = (data: any) => {
        console.log("Upload Success", data)
        setAnalyzing(false)
        setResults(data.analysis)
    }

    return (
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950">
            {/* Neural Background */}
            <BrainSignalBackground />

            <div className="container py-16 md:py-24 flex flex-col items-center relative z-10">
                {/* Enhanced Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-6"
                >
                    <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm">
                        <Activity className="mr-2 h-4 w-4 fill-emerald-500" />
                        Real-Time Neural Analysis
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1] text-slate-900 dark:text-white">
                        AI <span className="text-primary italic">Diagnostika</span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        EEG ma'lumotlarini yuklang va sun'iy intellekt yordamida chuqur tahlil oling.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <MedCard className="w-full max-w-4xl p-0 overflow-hidden border-none shadow-[0_40px_100px_-15px_rgba(16,185,129,0.3)]">
                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="w-full h-20 grid grid-cols-2 rounded-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-3 border-b border-slate-200 dark:border-slate-800">
                                <TabsTrigger
                                    value="upload"
                                    className="rounded-2xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-lg border-r text-lg font-bold micro-interact h-full"
                                >
                                    <BrainCircuit className="w-6 h-6 mr-3" />
                                    Yangi Analiz
                                </TabsTrigger>
                                <TabsTrigger
                                    value="history"
                                    className="rounded-2xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-lg text-lg font-bold micro-interact h-full"
                                >
                                    <History className="w-6 h-6 mr-3" />
                                    Oxirgi Tahlillar
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="upload" className="p-12 md:p-16 mt-0 focus-visible:ring-0">
                                <div className="space-y-8">
                                    {!results ? (
                                        <>
                                            <div>
                                                <span className="med-label text-lg">Fayl Yuklash</span>
                                                <EdfUpload
                                                    onSuccess={handleSuccess}
                                                    onUploadStart={() => setAnalyzing(true)}
                                                />
                                            </div>

                                            {analyzing && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-center p-8 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-[2rem] border border-emerald-200 dark:border-emerald-800"
                                                >
                                                    <div className="flex items-center justify-center gap-3 mb-4">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        >
                                                            <Zap className="w-8 h-8 text-emerald-500" />
                                                        </motion.div>
                                                        <p className="text-xl font-bold text-emerald-600">AI signallarni qayta ishlamoqda...</p>
                                                    </div>
                                                    <p className="text-sm text-slate-500">Deep Learning modelimiz EEG to'lqinlarini tahlil qilmoqda</p>
                                                </motion.div>
                                            )}
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-8"
                                        >
                                            <div className="flex items-center justify-between p-8 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-[2rem] border border-emerald-100 dark:border-emerald-800 shadow-sm">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40">
                                                        <ShieldCheck className="w-10 h-10" />
                                                    </div>
                                                    <div>
                                                        <div className="med-label mb-1">Tahlil Tayyor</div>
                                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">Neyro-diagnostika xulosasi</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EHTIMOLI</div>
                                                    <div className="text-4xl font-black text-emerald-600">{(results.probability * 100).toFixed(1)}%</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                <ResultChip label="STATUS" value="Tugallandi" color="emerald" />
                                                <ResultChip label="MODEL" value="v3.0 Emerald" color="blue" />
                                                <ResultChip label="LATENCY" value="12.4ms" color="orange" />
                                                <ResultChip label="DUR." value="45:00" color="purple" />
                                            </div>

                                            <div className="p-12 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm leading-relaxed text-2xl text-slate-700 dark:text-slate-300 relative overflow-hidden">
                                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500" />
                                                <span className="font-bold text-emerald-600">AI Xulosasi:</span> "{results.summary}"
                                            </div>

                                            <div className="flex gap-8">
                                                <Button size="xl" className="flex-1 rounded-full shadow-xl shadow-emerald-500/20 micro-interact glow-teal h-16 text-lg">
                                                    Professional Hisobot (.PDF)
                                                </Button>
                                                <Button size="xl" variant="outline" className="flex-1 rounded-full micro-interact h-16 text-lg" onClick={() => setResults(null)}>
                                                    Yangi Tahlil
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="history" className="p-12 md:p-16 mt-0 focus-visible:ring-0">
                                <div className="h-96 flex flex-col items-center justify-center text-slate-400 space-y-6">
                                    <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <History className="w-10 h-10 opacity-40" />
                                    </div>
                                    <p className="text-xl font-medium">Hozircha tahlillar mavjud emas</p>
                                    <p className="text-sm text-slate-400">Birinchi tahlilni yuqoridagi "Yangi Analiz" bo'limidan boshlang</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </MedCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 flex items-center gap-16"
                >
                    <StatMini label="O'QITILGAN" value="12k+" />
                    <StatMini label="ANIQLIK" value="98.4%" />
                    <StatMini label="VAQT" value="~15s" />
                </motion.div>
            </div>
        </div>
    )
}

function ResultChip({ label, value, color }: { label: string, value: string, color: string }) {
    const colors: any = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        orange: "bg-orange-50 text-orange-600 border-orange-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
    }
    return (
        <div className={cn("px-6 py-4 rounded-2xl border flex flex-col items-center justify-center", colors[color])}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">{label}</span>
            <span className="text-base font-bold">{value}</span>
        </div>
    )
}

function StatMini({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col items-center group">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest leading-none mb-3 group-hover:text-emerald-500 transition-colors uppercase">{label}</span>
            <span className="text-4xl font-black text-slate-800 dark:text-slate-200">{value}</span>
        </div>
    )
}
