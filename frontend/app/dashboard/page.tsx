import { EegViewer } from "@/components/viewer/eeg-viewer"

export default function DashboardPage() {
    return (
        <div className="container py-6">
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">EEG Analysis Dashboard</h2>
                    <p className="text-muted-foreground">
                        Visualizing Patient-001_Data.edf (Simulated)
                    </p>
                </div>

                <EegViewer />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Placeholder for Analysis widgets */}
                    <div className="p-4 border rounded-lg bg-card h-40">
                        <h3 className="font-semibold text-sm mb-2">Spectral Analysis</h3>
                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                            Alpha Dominant (10Hz)
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg bg-card h-40">
                        <h3 className="font-semibold text-sm mb-2">AI Findings</h3>
                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm text-center">
                            No seizure activity detected in current window.
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg bg-card h-40">
                        <h3 className="font-semibold text-sm mb-2">Hypnogram</h3>
                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                            Stage: N2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
