"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function BrainNeuralIllustration() {
    const [mounted, setMounted] = useState(false)

    // Internal neural paths within the brain silhouette
    const paths = [
        "M 12 4 Q 15 6 18 10 T 17 14",
        "M 12 4 Q 9 6 6 10 T 7 14",
        "M 12 8 Q 14 10 15 13",
        "M 12 8 Q 10 10 9 13",
        "M 7 10 Q 9 12 10 16",
        "M 17 10 Q 15 12 14 16",
        "M 10 16 Q 12 18 14 16",
        "M 6 12 C 4 14 4 18 8 20",
        "M 18 12 C 20 14 20 18 16 20",
        "M 12 18 Q 12 21 12 22"
    ]

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            {/* Ambient Outer Glow */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full animate-pulse" />

            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
                {/* Brain Outline / Texture */}
                <motion.path
                    d="M13,3.03C15.42,3.22 17.5,4.43 18.87,6.2C19.5,7.03 20,8.04 20.25,9.15C21.32,9.36 22.3,9.87 23.07,10.61L21.75,12.03C20.65,13.06 19.16,13.68 17.5,13.68C16.5,13.68 15.53,13.43 14.68,13L13.35,14.47C13.78,15.22 14,16.08 14,17C14,19.26 12.5,21.16 10.45,21.79V20H9.55V21.79C7.5,21.16 6,19.26 6,17C6,16.08 6.22,15.22 6.65,14.47L5.32,13C4.47,13.43 3.5,13.68 2.5,13.68C0.84,13.68 -0.65,13.06 -1.75,12.03L-3.07,10.61C-2.3,9.87 -1.32,9.36 -0.25,9.15C0,8.04 0.5,7.03 1.13,6.2C2.5,4.43 4.58,3.22 7,3.03V2H13V3.03"
                    stroke="currentColor"
                    strokeWidth="0.1"
                    className="text-emerald-500/30"
                    fill="url(#brainGradient)"
                />

                <defs>
                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
                    </linearGradient>
                </defs>

                {/* Neural Ribers / Pathways */}
                {paths.map((p, i) => (
                    <g key={i}>
                        {/* The Pathway Line */}
                        <path
                            d={p}
                            stroke="currentColor"
                            strokeWidth="0.08"
                            className="text-emerald-500/20"
                        />

                        {/* The Glowing Pulse */}
                        <motion.path
                            d={p}
                            stroke="#10b981"
                            strokeWidth="0.2"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 0.4, 0],
                                pathOffset: [0, 0.6],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeInOut"
                            }}
                            className="drop-shadow-[0_0_3px_#10b981]"
                        />
                    </g>
                ))}

                {/* Active Synapse Points */}
                {[
                    { cx: 12, cy: 4 }, { cx: 17, cy: 14 }, { cx: 7, cy: 14 },
                    { cx: 12, cy: 18 }, { cx: 12, cy: 10 }
                ].map((pt, i) => (
                    <motion.circle
                        key={`synapse-${i}`}
                        cx={pt.cx}
                        cy={pt.cy}
                        r="0.25"
                        fill="#34d399"
                        animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}
