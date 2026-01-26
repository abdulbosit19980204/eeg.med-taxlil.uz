"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function BrainSignalBackground() {
    const [mounted, setMounted] = useState(false)
    const [channels, setChannels] = useState<{ id: number; y: number; text: string; delay: number }[]>([])

    const medicalKeywords = [
        "Analyzing...", "Alpha Spike", "Theta Wave", "Neural Sync", "Feature Extraction",
        "EEG Cluster", "LSTM Inference", "Synaptic Link", "Processing", "Delta Rhythm",
        "Spike Detected", "Cognitive Flow", "Network Weight", "Artifact Filter", "Deep Learning"
    ]

    useEffect(() => {
        setMounted(true)

        // Create 8 structured EEG channels
        const newChannels = Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            y: 10 + i * 8.5, // Structured horizontal lanes
            text: medicalKeywords[Math.floor(Math.random() * medicalKeywords.length)],
            delay: Math.random() * 5
        }))
        setChannels(newChannels)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* Dark Depth Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.03)_0%,transparent_70%)]" />

            {/* Extremely subtle anatomical brain silhouette as base layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] opacity-[0.02] dark:opacity-[0.04]">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-emerald-500">
                    <path d="M13,3.03C15.42,3.22 17.5,4.43 18.87,6.2C19.5,7.03 20,8.04 20.25,9.15C21.32,9.36 22.3,9.87 23.07,10.61L21.75,12.03C20.65,13.06 19.16,13.68 17.5,13.68C16.5,13.68 15.53,13.43 14.68,13L13.35,14.47C13.78,15.22 14,16.08 14,17C14,19.26 12.5,21.16 10.45,21.79V20H9.55V21.79C7.5,21.16 6,19.26 6,17C6,16.08 6.22,15.22 6.65,14.47L5.32,13C4.47,13.43 3.5,13.68 2.5,13.68C0.84,13.68 -0.65,13.06 -1.75,12.03L-3.07,10.61C-2.3,9.87 -1.32,9.36 -0.25,9.15C0,8.04 0.5,7.03 1.13,6.2C2.5,4.43 4.58,3.22 7,3.03V2H13V3.03M12,11A1,1 0 0,0 11,10A1,1 0 0,0 10,11A1,1 0 0,0 11,12A1,1 0 0,0 12,11" />
                </svg>
            </div>

            {/* Structured EEG Channels */}
            <div className="absolute inset-x-0 inset-y-0 opacity-20 dark:opacity-30">
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        className="absolute w-full border-t border-emerald-500/10"
                        style={{ top: `${channel.y}%` }}
                    >
                        {/* The Horizontal Light Ray Pulse */}
                        <motion.div
                            className="absolute h-[1px] w-64 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_#10b981]"
                            initial={{ left: "-20%" }}
                            animate={{ left: "120%" }}
                            transition={{
                                duration: 8 + Math.random() * 5,
                                repeat: Infinity,
                                delay: channel.delay,
                                ease: "linear"
                            }}
                        />

                        {/* Synchronized Generative Text */}
                        <motion.div
                            className="absolute text-[8px] md:text-[10px] font-bold text-emerald-500/30 whitespace-nowrap uppercase tracking-widest top-[-14px]"
                            initial={{ left: "-10%", opacity: 0 }}
                            animate={{
                                left: ["-10%", "110%"],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 12 + Math.random() * 10,
                                repeat: Infinity,
                                delay: channel.delay + 1,
                                ease: "linear"
                            }}
                        >
                            {channel.text}
                        </motion.div>

                        {/* Static Subtle Wave Path */}
                        <svg viewBox="0 0 100 1" preserveAspectRatio="none" className="w-full h-4 absolute top-[-8px] opacity-10">
                            <motion.path
                                d={`M 0 0.5 Q 25 ${0.5 + Math.random()} 50 0.5 T 100 0.5`}
                                stroke="currentColor"
                                strokeWidth="0.05"
                                fill="none"
                                animate={{ x: [-100, 0] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>
                    </div>
                ))}
            </div>

            {/* Deep Static Light Beams (Very Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.02)_50%,transparent_100%)] pointer-events-none" />
        </div>
    )
}
