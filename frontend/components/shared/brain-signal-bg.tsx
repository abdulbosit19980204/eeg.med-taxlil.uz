"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function BrainSignalBackground() {
    const [mounted, setMounted] = useState(false)
    const [channels, setChannels] = useState<{ id: number; path: string; duration: number }[]>([])
    const [sparks, setSparks] = useState<{ id: number; delay: number; top: string; scale: number }[]>([])

    useEffect(() => {
        setMounted(true)
        
        // Create 8 "EEG channels" with unique waveform characteristics
        const newChannels = Array.from({ length: 12 }).map((_, i) => {
            const baseCenter = 10 + i * 7
            let path = `M 0 ${baseCenter}`
            
            // Randomize points for a more "organic" EEG look
            for (let x = 0; x <= 100; x += 5) {
                const noise = (Math.random() - 0.5) * (i % 2 === 0 ? 15 : 8)
                path += ` L ${x} ${baseCenter + noise}`
            }
            
            return {
                id: i,
                path,
                duration: 4 + Math.random() * 6
            }
        })
        setChannels(newChannels)

        // Synaptic sparks that float around
        const newSparks = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 10,
            top: `${Math.random() * 100}%`,
            scale: 0.5 + Math.random()
        }))
        setSparks(newSparks)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Background Gradient Depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-500/5 to-transparent dark:via-emerald-500/10" />
            
            <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-[0.08] dark:opacity-[0.15]"
            >
                {/* Multi-channel EEG Lines */}
                {channels.map((channel, i) => (
                    <motion.path
                        key={channel.id}
                        d={channel.path}
                        stroke="currentColor"
                        strokeWidth="0.15"
                        fill="none"
                        className="text-emerald-500"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                            pathLength: [0, 1, 1, 0],
                            opacity: [0, 1, 1, 0],
                            x: ["-5%", "5%"]
                        }}
                        transition={{
                            duration: channel.duration,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </svg>

            {/* Neural "Connectome" Sparks */}
            {sparks.map((spark) => (
                <motion.div
                    key={spark.id}
                    className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 blur-[2px]"
                    style={{
                        top: spark.top,
                        left: "-5%"
                    }}
                    animate={{ 
                        x: ["0vw", "110vw"],
                        y: ["0%", "20%", "-20%", "0%"],
                        opacity: [0, 0.8, 0],
                        scale: [spark.scale, spark.scale * 1.5, spark.scale]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 10,
                        repeat: Infinity,
                        delay: spark.delay,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Radial glow for focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    )
}
