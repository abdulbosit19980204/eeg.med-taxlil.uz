"use client"

import { useEffect, useState } from "react"
import { MedCard } from "@/components/shared/med-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Database, Cpu, TrendingUp, CheckCircle2, Loader2 } from "lucide-react"

const DATASET_PROGRESS = [
    { name: 'Yan', count: 400 },
    { name: 'Fev', count: 650 },
    { name: 'Mar', count: 900 },
    { name: 'Apr', count: 1200 },
];

const ACCURACY_STATS = [
    { epoch: 1, acc: 0.65 },
    { epoch: 10, acc: 0.82 },
    { epoch: 20, acc: 0.91 },
    { epoch: 50, acc: 0.98 },
];

export default function TrainingPage() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

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
    }, [])

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        )
    }

    // Use real data from API or fallbacks
    const displayStats = stats || {
        dataset_size: 0,
        epochs_completed: 0,
        total_epochs: 100,
        accuracy: 0
    }
    return (
        <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI O'qitish Jarayoni</h1>
                    <p className="text-slate-500">Modelning o'sish dinamikasi va dataset statistikasi.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Model Holati: ACTIVE TRAINING
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4 mb-10">
                <StatsCard icon={Database} label="DATASET HAJMI" value={displayStats.dataset_size.toLocaleString()} sub="EEG Fayllari" />
                <StatsCard icon={Cpu} label="EPOCHLAR" value={`${displayStats.epochs_completed} / ${displayStats.total_epochs}`} sub="Training progress" />
                <StatsCard icon={TrendingUp} label="ANIQLIK" value={`${displayStats.accuracy}%`} sub="Current model accuracy" />
                <StatsCard icon={CheckCircle2} label="MODEL VERSION" value={displayStats.model_version || "v3.0"} sub="Emerald Processing" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <MedCard className="h-80 flex flex-col">
                    <span className="med-label">Dataset O'sishi (Oylik)</span>
                    <div className="flex-1 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DATASET_PROGRESS}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </MedCard>

                <MedCard className="h-80 flex flex-col">
                    <span className="med-label">Model Aniqligi (Accuracy)</span>
                    <div className="flex-1 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={ACCURACY_STATS}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="epoch" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </MedCard>
            </div>
        </div>
    )
}

function StatsCard({ icon: Icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
    return (
        <MedCard premium={false} className="flex flex-col space-y-2 hover:bg-slate-50/50 transition-colors">
            <div className="p-2 w-10 h-10 rounded-xl bg-teal-50 text-primary flex items-center justify-center">
                <Icon className="w-5 h-5" />
            </div>
            <span className="med-label mb-0">{label}</span>
            <div className="flex flex-col">
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-xs text-slate-500">{sub}</span>
            </div>
        </MedCard>
    )
}
