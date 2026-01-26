"use client"

import { MedCard } from "@/components/shared/med-card"
import { FileText, Download, Trash2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const MOCK_HISTORY = [
    { id: 1, name: "Bemor_102.edf", patient: "Abduvaliyev J.", date: "22.01.2024", size: "24.5 MB", status: "Completed" },
    { id: 2, name: "Sleep_Study.edf", patient: "Ismoilova G.", date: "20.01.2024", size: "112.1 MB", status: "Completed" },
    { id: 3, name: "Alpha_Test.edf", patient: "Karimov T.", date: "18.01.2024", size: "45.0 MB", status: "Completed" },
]

export default function HistoryPage() {
    return (
        <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tarix</h1>
                    <p className="text-slate-500">Barcha o'tkazilgan tahlillar hisoboti.</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input className="pl-10 rounded-full h-10" placeholder="Qidirish..." />
                    </div>
                    <Button variant="outline" size="icon-lg" className="rounded-full shrink-0">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <MedCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b">
                                <th className="p-4 med-label mb-0">FAYL NOMLARI</th>
                                <th className="p-4 med-label mb-0">BEMOR</th>
                                <th className="p-4 med-label mb-0">SANA</th>
                                <th className="p-4 med-label mb-0">XOLATI</th>
                                <th className="p-4 med-label mb-0 text-right">AMALLAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_HISTORY.map((item) => (
                                <tr key={item.id} className="border-b last:border-0 hover:bg-slate-50/30 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm">{item.name}</div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{item.size}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-medium">{item.patient}</td>
                                    <td className="p-4 text-sm text-slate-500">{item.date}</td>
                                    <td className="p-4 text-sm">
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon-sm" className="rounded-full">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon-sm" className="rounded-full text-destructive hover:bg-destructive/10">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MedCard>
        </div>
    )
}
