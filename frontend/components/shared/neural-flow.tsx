"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Node {
    id: number
    x: number
    y: number
}

interface Connection {
    from: number
    to: number
    id: number
}

export function NeuralNetworkFlow() {
    const [nodes, setNodes] = useState<Node[]>([])
    const [connections, setConnections] = useState<Connection[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const nodeCount = 15
        const newNodes = Array.from({ length: nodeCount }).map((_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80
        }))

        const newConnections: Connection[] = []
        newNodes.forEach((node, i) => {
            // Connect to 2 nearest or random nodes
            for (let j = 0; j < 2; j++) {
                const target = (i + 1 + Math.floor(Math.random() * 5)) % nodeCount
                newConnections.push({ from: node.id, to: target, id: i * 10 + j })
            }
        })

        setNodes(newNodes)
        setConnections(newConnections)
    }, [])

    if (!mounted) return null

    return (
        <div className="w-full h-full relative overflow-hidden opacity-40 dark:opacity-60">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                {/* Connection Lines (Static) */}
                {connections.map((conn) => {
                    const from = nodes.find(n => n.id === conn.from)
                    const to = nodes.find(n => n.id === conn.to)
                    if (!from || !to) return null
                    return (
                        <line
                            key={`line-${conn.id}`}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="currentColor"
                            strokeWidth="0.2"
                            className="text-emerald-500/20"
                        />
                    )
                })}

                {/* Flowing Signals (Animated) */}
                {connections.map((conn, i) => {
                    const from = nodes.find(n => n.id === conn.from)
                    const to = nodes.find(n => n.id === conn.to)
                    if (!from || !to) return null
                    return (
                        <motion.circle
                            key={`signal-${conn.id}`}
                            r="0.4"
                            fill="#10b981"
                            className="shadow-[0_0_8px_#10b981]"
                            animate={{
                                cx: [from.x, to.x],
                                cy: [from.y, to.y],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "linear"
                            }}
                        />
                    )
                })}

                {/* Neurons */}
                {nodes.map((node) => (
                    <motion.circle
                        key={`node-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        r="0.8"
                        fill="currentColor"
                        className="text-emerald-500"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}
