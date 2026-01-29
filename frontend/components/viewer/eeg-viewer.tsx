"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, ZoomIn, ZoomOut, Settings2, Loader2 } from "lucide-react"
import apiClient from "@/lib/api-client"

interface EegViewerProps {
    analysisId?: number
}

export function EegViewer({ analysisId }: EegViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [offset, setOffset] = useState(0)
    const [scale, setScale] = useState(1)
    const [speed, setSpeed] = useState(1)
    const [loading, setLoading] = useState(false)

    // Real data state
    const [channels, setChannels] = useState<string[]>([])
    const [signalData, setSignalData] = useState<number[][]>([])
    const [sfreq, setSfreq] = useState(100)

    const animationFrameRef = useRef<number | null>(null)
    const lastTimeRef = useRef<number>(0)
    const offsetRef = useRef(0)

    // Fetch real signal data
    useEffect(() => {
        if (!analysisId) return

        const fetchSignalData = async () => {
            setLoading(true)
            try {
                const response = await apiClient.get(`/analysis/records/${analysisId}/signal_data/`)
                setChannels(response.data.channels)
                setSignalData(response.data.data)
                setSfreq(response.data.sfreq)
            } catch (err) {
                console.error("Failed to fetch signal data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchSignalData()
    }, [analysisId])

    // Draw function with real data
    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number, timeOffset: number) => {
        ctx.clearRect(0, 0, width, height)

        ctx.fillStyle = "#020817"
        ctx.fillRect(0, 0, width, height)

        const displayChannels = channels.length > 0 ? channels : ["Fp1", "Fp2", "F7", "F3", "Fz", "F4", "F8", "C3", "Cz", "C4", "P3", "Pz", "P4", "O1", "O2"]
        const channelHeight = height / Math.min(displayChannels.length, 16)
        const pxPerSample = 2

        // Grid
        ctx.strokeStyle = "#1e293b"
        ctx.lineWidth = 1
        for (let x = 0; x < width; x += 100) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
        }

        // Draw signals
        ctx.lineWidth = 1.5
        const startSample = Math.floor(timeOffset * 100)

        displayChannels.slice(0, 16).forEach((channel, index) => {
            const centerY = index * channelHeight + channelHeight / 2

            ctx.beginPath()
            ctx.strokeStyle = "#14b8a6"

            const channelData = signalData[index] || []

            for (let x = 0; x < width && (startSample + x) < channelData.length; x += 2) {
                const sampleIdx = startSample + x
                let signal: number

                if (channelData.length > 0 && sampleIdx < channelData.length) {
                    // Use real data (scaled for display)
                    signal = channelData[sampleIdx] * scale * 50000
                } else {
                    // Simulated fallback
                    const t = timeOffset + x / 100
                    const noise = Math.sin(t * 50 + index) * 2
                    const alpha = Math.sin(t * 10 * Math.PI * 2 + index) * 10
                    const slow = Math.sin(t * 1 * Math.PI * 2) * 15
                    signal = (alpha + slow + noise) * scale
                }

                const y = centerY + Math.max(-channelHeight / 2 + 5, Math.min(channelHeight / 2 - 5, signal))

                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.stroke()

            // Separator
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
                offsetRef.current += deltaTime * speed
                setOffset(offsetRef.current)
            }

            draw(ctx, canvas.width, canvas.height, offsetRef.current)

            if (isPlaying) {
                animationFrameRef.current = requestAnimationFrame(render)
            }
        }

        const width = containerRef.current?.clientWidth || 800
        const height = containerRef.current?.clientHeight || 600
        canvas.width = width - 48
        canvas.height = height

        if (!isPlaying) {
            offsetRef.current = offset
            draw(ctx, canvas.width, canvas.height, offset)
            lastTimeRef.current = 0
        } else {
            animationFrameRef.current = requestAnimationFrame(render)
        }

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        }
    }, [isPlaying, offset, scale, speed, signalData, channels])

    // Resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth - 48
                canvasRef.current.height = containerRef.current.clientHeight
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const displayChannels = channels.length > 0 ? channels.slice(0, 16) : ["Fp1", "Fp2", "F7", "F3", "Fz", "F4", "F8", "C3", "Cz", "C4", "P3", "Pz", "P4", "O1", "O2"]

    return (
        <div className="flex flex-col h-full w-full gap-4">
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
                    {loading && <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />}
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.1, s - 0.2))}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => s + 0.2)}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Viewer Area */}
            <div className="relative flex-1 border rounded-md overflow-hidden bg-slate-950" ref={containerRef}>
                {/* Channel Labels */}
                <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-0 z-10 bg-slate-900/80 border-r border-slate-800">
                    {displayChannels.map((ch) => (
                        <div key={ch} className="flex-1 flex items-center justify-center text-[9px] text-slate-400 font-mono truncate px-1">
                            {ch.slice(0, 4)}
                        </div>
                    ))}
                </div>

                <canvas
                    ref={canvasRef}
                    className="block w-full h-full cursor-crosshair ml-12"
                />

                {/* Time Overlay */}
                <div className="absolute bottom-2 right-4 text-xs font-mono text-teal-500">
                    Time: {offset.toFixed(2)}s
                </div>

                {signalData.length > 0 && (
                    <div className="absolute top-2 right-4 text-[10px] font-mono text-emerald-500 bg-slate-900/80 px-2 py-1 rounded">
                        Real Data: {channels.length} channels
                    </div>
                )}
            </div>
        </div>
    )
}
