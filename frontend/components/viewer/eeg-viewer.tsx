"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, ZoomIn, ZoomOut, Settings2 } from "lucide-react"

const CHANNELS = [
    "Fp1", "Fp2", "F7", "F3", "Fz", "F4", "F8", "T3", "C3", "Cz", "C4", "T4", "T5", "P3", "Pz", "P4", "T6", "O1", "O2"
]

export function EegViewer() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [offset, setOffset] = useState(0) // Time offset in seconds
    const [scale, setScale] = useState(1) // Vertical scale
    const [speed, setSpeed] = useState(1)

    // Simulation refs
    const animationFrameRef = useRef<number | null>(null)
    const lastTimeRef = useRef<number>(0)

    // Draw function
    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number, timeOffset: number) => {
        ctx.clearRect(0, 0, width, height)

        // Background
        ctx.fillStyle = "#020817" // Dark background matched to theme
        ctx.fillRect(0, 0, width, height)

        // Grid lines
        ctx.strokeStyle = "#1e293b"
        ctx.lineWidth = 1

        const channelHeight = height / CHANNELS.length
        const pxPerSec = 100 // 100px = 1 second

        // Draw vertical time grid (every 1 sec)
        for (let x = -(timeOffset * pxPerSec) % pxPerSec; x < width; x += pxPerSec) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
        }

        // Draw Signals
        ctx.lineWidth = 1.5
        CHANNELS.forEach((channel, index) => {
            const centerY = index * channelHeight + channelHeight / 2

            // Draw channel label area
            // We'll draw labels in HTML overlay, but lets verify lines first

            // Simulate Signal
            ctx.beginPath()
            ctx.strokeStyle = "#14b8a6" // Teal 500

            for (let x = 0; x < width; x += 2) {
                // Calculate time at this x pixel
                const t = timeOffset + x / pxPerSec

                // Random complex wave simulation
                // combining different frequencies
                const noise = Math.sin(t * 50) * 2
                const alpha = Math.sin(t * 10 * Math.PI * 2) * 10 // ~10Hz
                const slow = Math.sin(t * 1 * Math.PI * 2) * 20

                // Unique phase per channel to look real
                const phase = index * 13.5

                const signal = (alpha + slow + noise) * scale * (Math.sin(t + phase) > 0.9 ? 3 : 1) // Add simulated spikes

                const y = centerY + signal

                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.stroke()

            // Draw separator
            ctx.beginPath()
            ctx.strokeStyle = "#334155"
            ctx.moveTo(0, (index + 1) * channelHeight)
            ctx.lineTo(width, (index + 1) * channelHeight)
            ctx.stroke()
        })
    }

    // Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const render = (time: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = time
            const deltaTime = (time - lastTimeRef.current) / 1000
            lastTimeRef.current = time

            if (isPlaying) {
                setOffset(prev => prev + deltaTime * speed)
            }

            const width = canvas.width
            const height = canvas.height

            // We pass offset from state directly if not playing, 
            // but inside loop we need current value.
            // For smooth animation we use the state value which is updated.
            // But React state update is async, so this loop might lag if we depend only on state.
            // For this simple demo, it's fine.

            draw(ctx, width, height, offset)  // using current state offset might be jittery if setting state in loop
            // Ideally we use a ref for offset in animation loop
            // But to keep it simple and reactive:

            if (isPlaying) {
                animationFrameRef.current = requestAnimationFrame(render)
            }
        }

        // Initial draw
        const width = canvas.parentElement?.clientWidth || 800
        const height = canvas.parentElement?.clientHeight || 800
        canvas.width = width
        canvas.height = height

        // If NOT playing, just draw once.
        if (!isPlaying) {
            draw(ctx, width, height, offset)
            lastTimeRef.current = 0
        } else {
            animationFrameRef.current = requestAnimationFrame(render)
        }

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        }
    }, [isPlaying, offset, scale, speed])

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth
                canvasRef.current.height = containerRef.current.clientHeight
                // Redraw needed
                // For now, toggle play/pause or rely on effect dep
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] w-full gap-4">
            {/* Controls */}
            <div className="flex items-center justify-between p-2 border rounded-lg bg-card text-card-foreground">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <div className="flex items-center gap-2 px-4">
                        <span className="text-sm font-medium whitespace-nowrap">Speed: {speed}x</span>
                        <Slider
                            className="w-[100px]"
                            min={0.5} max={5} step={0.5}
                            value={[speed]}
                            onValueChange={(v) => setSpeed(v[0])}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.1, s - 0.1))}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => s + 0.1)}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Viewer Area */}
            <div className="relative flex-1 border rounded-md overflow-hidden bg-slate-950" ref={containerRef}>
                {/* Channel Labels Overlay */}
                <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-0 z-10 bg-slate-900/80 border-r border-slate-800">
                    {CHANNELS.map((ch, i) => (
                        <div key={ch} className="flex-1 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                            {ch}
                        </div>
                    ))}
                </div>

                <canvas
                    ref={canvasRef}
                    className="block w-full h-full cursor-crosshair ml-12"
                />

                {/* Time Overlay (e.g. at bottom) */}
                <div className="absolute bottom-2 right-4 text-xs font-mono text-teal-500">
                    Time: {offset.toFixed(2)}s
                </div>
            </div>
        </div>
    )
}
