"use client"

import { MedCard } from "@/components/shared/med-card"
import { User, Mail, Calendar, Settings2, ShieldCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
    return (
        <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-xl">
                        <User className="w-12 h-12 text-emerald-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Dr. Abduvaliyev Akmal</h1>
                        <p className="text-slate-500">Neyroxirurg • Med-Taxlil Markazi</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <MedCard className="flex flex-col items-center text-center p-8">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold">482</span>
                        <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Tahlillar</span>
                    </MedCard>

                    <MedCard className="flex flex-col items-center text-center p-8">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold">128h</span>
                        <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Faol Vaqt</span>
                    </MedCard>

                    <MedCard className="flex flex-col items-center text-center p-8">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold">v2.4</span>
                        <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Litsenziya</span>
                    </MedCard>
                </div>

                <MedCard className="p-0 overflow-hidden">
                    <div className="p-6 border-b bg-slate-50/50">
                        <h2 className="font-bold">Hisob ma'lumotlari</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500">Email</span>
                            <span className="text-sm font-medium">dr.akmal@med-taxlil.uz</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500">Mutaxassislik</span>
                            <span className="text-sm font-medium">Neyrofiziolog</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-slate-500">Ro'yxatdan o'tilgan</span>
                            <span className="text-sm font-medium">12.01.2024</span>
                        </div>
                    </div>
                    <div className="p-6 bg-slate-50/50 flex justify-end gap-3">
                        <Button variant="outline" size="sm" className="rounded-full">
                            <Settings2 className="w-4 h-4 mr-2" />
                            Sozlamalar
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-full">
                            Chiqish
                        </Button>
                    </div>
                </MedCard>
            </div>
        </div>
    )
}
