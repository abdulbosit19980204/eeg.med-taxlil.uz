"use client"

import { useState } from "react"
import { MedCard } from "@/components/shared/med-card"
import { EdfUpload } from "@/components/upload/edf-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BrainCircuit, History, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AnalysisPage() {
    const [analyzing, setAnalyzing] = useState(false)
    const [results, setResults] = useState<any>(null)

    const handleSuccess = (data: any) => {
        console.log("Upload Success", data)
        setAnalyzing(false)
        setResults(data.analysis)
    }

    return (
        <div className="container py-12 md:py-20 flex flex-col items-center">
            <div className="text-center mb-10 space-y-2">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                    AI Diagnostika
                </h1>
                <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
                    EEG ma'lumotlarini yuklang va sun'iy intellekt yordamida chuqur tahlil oling.
                </p>
            </div>

            <MedCard className="w-full max-w-3xl p-0 overflow-hidden border-none shadow-2xl">
                <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="w-full h-16 grid grid-cols-2 rounded-none bg-slate-50/50 p-2 border-b">
                        <TabsTrigger value="upload" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm border-r text-base font-bold">
                            <BrainCircuit className="w-5 h-5 mr-3" />
                            Yangi Analiz
                        </TabsTrigger>
                        <TabsTrigger value="history" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm text-base font-bold">
                            <History className="w-5 h-5 mr-3" />
                            Oxirgi Tahlillar
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="p-12 mt-0 focus-visible:ring-0">
                        <div className="space-y-6">
                            {!results ? (
                                <>
                                    <div>
                                        <span className="med-label">Fayl Yuklash</span>
                                        <EdfUpload
                                            onSuccess={handleSuccess}
                                            onUploadStart={() => setAnalyzing(true)}
                                        />
                                    </div>

                                    {analyzing && (
                                        <div className="text-center animate-pulse">
                                            <p className="text-sm font-medium text-emerald-500 italic">AI signallarni qayta ishlamoqda...</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40">
                                                <ShieldCheck className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <div className="med-label mb-0">Tahlil Tayyor</div>
                                                <div className="text-xl font-bold text-slate-900">Neyro-diagnostika xulosasi</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EHIMOLI</div>
                                            <div className="text-3xl font-black text-emerald-600">{(results.probability * 100).toFixed(1)}%</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <ResultChip label="STATUS" value="Tugallandi" color="emerald" />
                                        <ResultChip label="MODEL" value="v3.0 Emerald" color="blue" />
                                        <ResultChip label="LATENCY" value="12.4ms" color="orange" />
                                        <ResultChip label="DUR." value="45:00" color="purple" />
                                    </div>

                                    <div className="p-12 bg-white rounded-[2rem] border border-slate-100 shadow-sm leading-relaxed text-2xl text-slate-700 relative overflow-hidden">
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

                    <TabsContent value="history" className="p-12 mt-0 focus-visible:ring-0">
                        <div className="h-80 flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <History className="w-12 h-12 opacity-20" />
                            <p className="text-lg">Hozircha tahlillar mavjud emas</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </MedCard>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-20 flex items-center gap-16"
            >
                <StatMini label="O'QITILGAN" value="12k+" />
                <StatMini label="ANIQLIK" value="98.4%" />
                <StatMini label="VREMYA" value="~15s" />
            </motion.div>
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
