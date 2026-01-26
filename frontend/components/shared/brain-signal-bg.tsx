"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function BrainSignalBackground() {
    const [mounted, setMounted] = useState(false)
    const [pulses, setPulses] = useState<{ id: number; path: string; delay: number; duration: number }[]>([])

    useEffect(() => {
        setMounted(true)

        // Generate random expansive "neural" paths
        const generatePath = () => {
            const startSide = Math.random() > 0.5 ? "left" : "right"
            const startX = startSide === "left" ? -5 : 29
            const startY = Math.random() * 24

            const endX = startSide === "left" ? 29 : -5
            const endY = Math.random() * 24

            const cp1x = 12 + (Math.random() - 0.5) * 15
            const cp1y = 12 + (Math.random() - 0.5) * 15

            const cp2x = 12 + (Math.random() - 0.5) * 15
            const cp2y = 12 + (Math.random() - 0.5) * 15

            return `M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`
        }

        const newPulses = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            path: generatePath(),
            delay: Math.random() * 8,
            duration: 4 + Math.random() * 6
        }))
        setPulses(newPulses)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* Dark Depth Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.05)_0%,transparent_70%)]" />

            {/* Realistic anatomical background brain (Very subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] opacity-[0.03] dark:opacity-[0.06]">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-emerald-500">
                    <path d="M13,3.03C15.42,3.22 17.5,4.43 18.87,6.2C19.5,7.03 20,8.04 20.25,9.15C21.32,9.36 22.3,9.87 23.07,10.61L21.75,12.03C20.65,13.06 19.16,13.68 17.5,13.68C16.5,13.68 15.53,13.43 14.68,13L13.35,14.47C13.78,15.22 14,16.08 14,17C14,19.26 12.5,21.16 10.45,21.79V20H9.55V21.79C7.5,21.16 6,19.26 6,17C6,16.08 6.22,15.22 6.65,14.47L5.32,13C4.47,13.43 3.5,13.68 2.5,13.68C0.84,13.68 -0.65,13.06 -1.75,12.03L-3.07,10.61C-2.3,9.87 -1.32,9.36 -0.25,9.15C0,8.04 0.5,7.03 1.13,6.2C2.5,4.43 4.58,3.22 7,3.03V2H13V3.03M12,11A1,1 0 0,0 11,10A1,1 0 0,0 10,11A1,1 0 0,0 11,12A1,1 0 0,0 12,11M14,9A1,1 0 0,0 13,8A1,1 0 0,0 12,9A1,1 0 0,0 13,10A1,1 0 0,0 14,9M10,9A1,1 0 0,0 9,8A1,1 0 0,0 8,9A1,1 0 0,0 9,10A1,1 0 0,0 10,9M9,13A1,1 0 0,0 8,12A1,1 0 0,0 7,13A1,1 0 0,0 8,14A1,1 0 0,0 9,13M14,13A1,1 0 0,0 13,12A1,1 0 0,0 12,13A1,1 0 0,0 13,14A1,1 0 0,0 14,13Z" />
                </svg>
            </div>

            {/* Glowing Synaptic Light Rays with Solar/Electric Flare Effect */}
            <svg viewBox="0 0 28 24" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[70vw] md:h-[70vw] z-10 scale-125">
                <defs>
                    <filter id="flareGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="0.4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fff7ed" stopOpacity="0" />
                        <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                        <stop offset="100%" stopColor="#fff7ed" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {pulses.map((pulse) => (
                    <g key={pulse.id}>
                        {/* High Intensity Flare Head */}
                        <motion.path
                            d={pulse.path}
                            stroke="#fffbeb"
                            strokeWidth="0.04" // Extremely thin light ray
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 0.4, 0.4],
                                pathOffset: [0, 0.6, 1],
                                opacity: [0, 1, 0], // Flash and fade
                                scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                                duration: pulse.duration,
                                repeat: Infinity,
                                delay: pulse.delay,
                                times: [0, 0.2, 1], // Quick flash, slow fade
                                ease: "easeOut"
                            }}
                            style={{ filter: "url(#flareGlow)" }}
                        />

                        {/* Soft Solar Trailing Glow */}
                        <motion.path
                            d={pulse.path}
                            stroke="url(#solarGradient)"
                            strokeWidth="0.15" // Thinner trailing glow
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 0.8, 0.8],
                                pathOffset: [0, 0.2, 1],
                                opacity: [0, 0.6, 0]
                            }}
                            transition={{
                                duration: pulse.duration * 1.5,
                                repeat: Infinity,
                                delay: pulse.delay,
                                times: [0, 0.4, 1],
                                ease: "linear"
                            }}
                            className="drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                        />
                    </g>
                ))}

                {/* Floating "Light Embers" */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.circle
                        key={`ember-${i}`}
                        cx={Math.random() * 28}
                        cy={Math.random() * 24}
                        r="0.05"
                        fill="#fff7ed"
                        animate={{
                            opacity: [0, 0.9, 0],
                            scale: [0, 1.5, 0],
                            y: [0, -4, -8]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                        style={{ filter: "blur(0.2px)" }}
                    />
                ))}
            </svg>

            {/* Moving Light Rays */}
            <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                        style={{ top: `${20 + i * 15}%` }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </div>
        </div>
    )
}
