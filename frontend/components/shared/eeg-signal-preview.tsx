"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface EegSignalPreviewProps {
    active: boolean
    speed?: number
    className?: string
}

export function EegSignalPreview({ active, speed = 1, className }: EegSignalPreviewProps) {
    const [paths, setPaths] = useState<string[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Generate 4 channels of wave paths
        const generateWave = (offset: number) => {
            let path = `M 0 ${10 + offset}`
            for (let i = 0; i <= 100; i += 2) {
                const noise = Math.sin(i * 0.5) * 5 + (Math.random() - 0.5) * 8
                path += ` L ${i} ${10 + offset + noise}`
            }
            return path
        }

        setPaths([generateWave(0), generateWave(15), generateWave(30), generateWave(45)])
    }, [])

    return (
        <div ref={containerRef} className={className}>
            <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-full h-full">
                {paths.map((path, i) => (
                    <motion.path
                        key={i}
                        d={path}
                        stroke="currentColor"
                        strokeWidth="0.2"
                        fill="none"
                        className="text-emerald-500/40"
                        animate={active ? {
                            x: [0, -10, 0],
                            opacity: [0.3, 0.8, 0.3]
                        } : {}}
                        transition={{
                            duration: (2 / speed) + Math.random(),
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* Scanning line */}
                {active && (
                    <motion.line
                        x1="0" y1="0" x2="0" y2="60"
                        stroke="#10b981"
                        strokeWidth="0.5"
                        animate={{ x: ["0%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="drop-shadow-[0_0_5px_#10b981]"
                    />
                )}
            </svg>
        </div>
    )
}
