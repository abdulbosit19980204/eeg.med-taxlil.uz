"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Brain, Zap, ShieldCheck, Activity, ArrowRight, Microchip, Database, BarChart3 } from "lucide-react"
import { MedCard } from "@/components/shared/med-card"
import { motion } from "framer-motion"
import { BrainSignalBackground } from "@/components/shared/brain-signal-bg"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 bg-slate-50 dark:bg-slate-950">
        <BrainSignalBackground />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-10 text-left"
            >
              <div className="inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm">
                <Zap className="mr-2 h-4 w-4 fill-emerald-500" />
                Medical AI Solutions v3.0
              </div>

              <h1 className="text-6xl font-extrabold tracking-tight md:text-8xl leading-[1] text-slate-900 dark:text-white">
                Miya <span className="text-primary italic">AI tahlili</span>
              </h1>

              <p className="max-w-xl text-2xl text-slate-600 dark:text-slate-400 md:text-3xl leading-relaxed">
                EEG ma'lumotlarini real vaqt rejimida qayta ishlash va nevrologik xurujlarni 98.4% aniqlikda topuvchi professional ekotizim.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button size="xl" className="rounded-full shadow-2xl shadow-emerald-500/40 px-12 group micro-interact glow-teal h-14 text-lg" asChild>
                  <Link href="/analysis">
                    Tahlilni Boshlash
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="rounded-full px-12 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 micro-interact h-14 text-lg">
                  Video Demo
                </Button>
              </div>

              <div className="flex items-center gap-10 pt-10 border-t border-slate-200 dark:border-slate-800">
                <StatMini label="O'QITILGAN" value="12k+" />
                <StatMini label="AI ANIQLIK" value="98.4%" />
                <StatMini label="STANDART" value="ISO" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square md:aspect-auto md:h-[650px]"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-[150px] rounded-full -z-10" />
              <div className="relative h-full w-full rounded-[40px] overflow-hidden border border-white dark:border-slate-800 shadow-[0_40px_100px_-15px_rgba(16,185,129,0.3)]">
                <Image
                  src="/hero.png"
                  alt="EEG AI Visualisation"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                <div className="absolute bottom-10 left-10 right-10">
                  <MedCard className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-none p-6 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/40">
                          <Activity className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Jonli Signal</div>
                          <div className="text-base font-bold">Deep Neural Inference</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 h-6 items-end">
                        {[1, 0.6, 1.4, 0.8, 1.2].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: ['20%', '100%', '20%'] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                            className="w-1.5 bg-emerald-500 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </MedCard>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={Brain}
              title="Tutqanoq Aniqlash"
              description="LSTM/CNN algoritmlari orqali epileptik faollikni real vaqtda 98% aniqlikda toping."
              delay={0}
            />
            <FeatureCard
              icon={PieChart}
              title="Spektral Xaritalash"
              description="Alpha, Beta, Theta va Delta to'lqinlarini yuqori aniqlikda vizualizatsiya qiling."
              delay={0.1}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Xavfsiz Saqlash"
              description="Barcha tibbiy ma'lumotlar shifrlangan holda bulutli tizimda doimiy saqlanadi."
              delay={0.2}
            />
          </div>
        </div>
      </section>


      {/* AI Process Section */}
      <section className="py-32 bg-white dark:bg-slate-900/50 relative overflow-hidden">
        <BrainSignalBackground />
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Tibbiy aniqlik va <br />
                <span className="text-primary italic">AI texnologiyalari</span>
              </h2>
              <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Platformamiz shunchaki signallarni chizib bermaydi. Bizning AI yadroimiz EEG to'lqinlaridagi eng kichik anomaliyalarni ham inson ko'zi ilg'ay olmaydigan darajada aniqlaydi.
              </p>

              <div className="grid gap-8">
                <InfoItem
                  title="Neural Feature Extraction"
                  desc="Signallarning vaqt va chastota sohasidagi 50 dan ortiq parametrlarini tahlil qilish."
                />
                <InfoItem
                  title="Cross-Patient Validation"
                  desc="Modelimiz turli yosh va jinsdagi minglab bemorlar ma'lumotlari asosida o'qitilgan."
                />
                <InfoItem
                  title="Artifact Filtering"
                  desc="Mushak harakati va tashqi shovqinlarni (noise) avtomatik ravishda filtrlaydi."
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <MedCard className="bg-slate-900 text-white p-0 overflow-hidden border-none shadow-[0_50px_100px_-20px_rgba(16,185,129,0.2)]">
                <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                  <span className="med-label text-emerald-400 mb-0">AI ANALYTICS CORE</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-bold">Inference Active</span>
                  </div>
                </div>
                <div className="p-10 space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Deep Learning Model</span>
                      <span className="text-emerald-400 font-bold">98.4% Acc</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "98.4%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-3xl font-bold mb-1">~15s</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Processing</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-3xl font-bold mb-1">0.04</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Loss Rate</div>
                    </div>
                  </div>
                </div>
              </MedCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white dark:bg-slate-900/50">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3 space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-primary dark:bg-emerald-900/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Ko'p so'raladigan savollar</h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                Platformaning ishlash mexanizmi, xavfsizlik va tibbiy standartlar haqida qo'shimcha ma'lumot oling.
              </p>
            </div>

            <div className="lg:w-2/3 grid gap-4">
              <FaqItem
                q="Qaysi turdagi fayllarni yuklash mumkin?"
                a="Hozirgi vaqtda barcha turdagi .edf va .bdf standartidagi fayllar qabul qilinadi."
                index={1}
              />
              <FaqItem
                q="AI tahlili qanchalik ishonchli?"
                a="Modelimizning aniqlik darajasi 98.4% ni tashkil etadi."
                index={2}
              />
              <FaqItem
                q="Ma'lumotlar xavfsizligi qanday ta'minlanadi?"
                a="Barcha bemor ma'lumotlari ISO 27001 va HIPAA standartlari asosida shifrlangan."
                index={3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="container relative z-10 text-center space-y-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            Diagnostikani <span className="text-emerald-500 italic">bugun</span> boshlang
          </motion.h2>
          <div className="flex justify-center pt-4">
            <Button size="xl" className="rounded-full shadow-[0_20px_50px_rgba(16,185,129,0.3)] px-16 group micro-interact glow-teal h-20 text-xl font-extrabold" asChild>
              <Link href="/analysis">
                Hozir Sinab Ko'rish
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Compact Premium Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 relative overflow-hidden border-t border-white/5">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-2xl tracking-tighter text-white uppercase">Med-Taxlil</span>
                  <span className="text-[10px] font-black tracking-[0.4em] text-emerald-400 uppercase leading-none mt-1">EEG Analytics</span>
                </div>
              </div>
              <p className="text-base text-slate-400 max-w-xs leading-relaxed">
                Miya faolligini tahlil qilishda jahon standartlariga asoslangan professional AI ekotizimi.
              </p>
              <div className="flex gap-3">
                {[Zap, ShieldCheck, Brain].map((Icon, i) => (
                  <div key={i} className="h-10 w-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all cursor-pointer micro-interact">
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Mahsulot</h4>
              <ul className="space-y-3 text-sm font-bold">
                <li><a href="#" className="hover:text-white transition-colors">AI Diagnostika</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tahlillar Tarixi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI O'qitish</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Resurslar</h4>
              <ul className="space-y-3 text-sm font-bold">
                <li><a href="#" className="hover:text-white transition-colors">Yordam Markazi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Bog'lanish</h4>
              <div className="space-y-4">
                <div className="text-xs text-slate-300 font-bold">info@med-taxlil.uz</div>
                <Button variant="outline" size="sm" className="rounded-full border-white/10 text-white hover:bg-white hover:text-slate-900 h-10 px-8 transition-all micro-interact text-sm">
                  Telegram Bot
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            <div className="flex items-center gap-8">
              <span>© 2024 MED-TAXLIL AI LABS</span>
              <div className="flex gap-6 grayscale opacity-40 hover:opacity-100 transition-all text-[10px]">
                <span className="border px-2 py-0.5 rounded border-white/20">ISO 27001</span>
                <span className="border px-2 py-0.5 rounded border-white/20">HIPAA</span>
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InfoItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-8 group">
      <div className="h-12 w-12 rounded-2xl border border-slate-100 bg-emerald-50/30 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <div className="h-2 w-2 rounded-full bg-primary group-hover:bg-white" />
      </div>
      <div>
        <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">{title}</h4>
        <p className="text-base text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function FaqItem({ q, a, index }: { q: string, a: string, index: number }) {
  return (
    <MedCard premium={false} className="p-0 overflow-hidden hover:bg-slate-50/50 transition-all border-slate-100 group">
      <div className="p-10 flex gap-8">
        <span className="text-3xl font-black text-emerald-100 group-hover:text-emerald-200 transition-colors">0{index}</span>
        <div>
          <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{q}</h4>
          <p className="text-lg text-slate-500 leading-relaxed">{a}</p>
        </div>
      </div>
    </MedCard>
  )
}

function StatMini({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-extrabold tracking-tight">{value}</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{label}</span>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <MedCard premium={true} className="p-10 micro-interact group">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-primary dark:bg-emerald-900/30 shadow-sm group-hover:glow-teal transition-all">
          <Icon className="h-10 w-10" />
        </div>
        <h3 className="mb-4 text-3xl font-bold">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
          {description}
        </p>
      </MedCard>
    </motion.div>
  )
}

function PieChart(props: any) {
  return <BarChart3 {...props} />
}
