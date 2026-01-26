"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function BrainSignalBackground() {
    const [lines, setLines] = useState<{ id: number; path: string; duration: number; delay: number }[]>([])

    useEffect(() => {
        // Generate random wave paths
        const newLines = Array.from({ length: 12 }).map((_, i) => {
            const y = 20 + i * 8
            const path = `M 0 ${y} Q 25 ${y + (Math.random() - 0.5) * 40} 50 ${y} T 100 ${y}`
            return {
                id: i,
                path,
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 2
            }
        })
        setLines(newLines)
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-30">
            <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="w-full h-full"
            >
                {lines.map((line) => (
                    <motion.path
                        key={line.id}
                        d={line.path}
                        stroke="currentColor"
                        strokeWidth="0.1"
                        fill="transparent"
                        className="text-emerald-500"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                            x: [0, 5, 0]
                        }}
                        transition={{
                            duration: line.duration,
                            repeat: Infinity,
                            delay: line.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </svg>
            
            {/* Animated Pulses */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-px w-32 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: "-10%"
                    }}
                    animate={{ 
                        x: ["0vw", "120vw"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}
