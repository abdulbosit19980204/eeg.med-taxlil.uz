"use client"

import { useState, useRef } from "react"
import { UploadCloud, File as FileIcon, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import apiClient from "@/lib/api-client"

interface EdfUploadProps {
    onSuccess: (data: any) => void
    onUploadStart: () => void
}

export function EdfUpload({ onSuccess, onUploadStart }: EdfUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const [isDragActive, setIsDragActive] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadFile = async (file: File) => {
        setUploading(true)
        setError(null)
        setStatusMessage("Yuklanmoqda...")
        onUploadStart()

        const formData = new FormData()
        formData.append("edf_file", file)

        try {
            setStatusMessage("Bemorlar ro'yxati tekshirilmoqda...")
            const patientsRes = await apiClient.get("/clinical/patients/")
            let patientId;

            if (patientsRes.data.length > 0) {
                patientId = patientsRes.data[0].id
            } else {
                setStatusMessage("Test bemor yaratilmoqda...")
                const newPatient = await apiClient.post("/clinical/patients/", {
                    fullname: "Test Patient",
                    gender: "M",
                    age: 35
                })
                patientId = newPatient.data.id
            }

            formData.append("patient", patientId)

            setStatusMessage("EEG fayli yuklanmoqda...")
            const response = await apiClient.post("/analysis/records/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            setStatusMessage("Muvaffaqiyatli!")
            onSuccess(response.data)
        } catch (err: any) {
            console.error("Upload error:", err)
            const errorMsg = err?.response?.data?.detail || err?.response?.data?.error || err?.message || "Noma'lum xatolik"
            setError(`Xatolik: ${errorMsg}`)
            setStatusMessage("")
        } finally {
            setUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setError(null)
            uploadFile(file)
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragActive(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragActive(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragActive(false)
        const file = e.dataTransfer.files?.[0]
        if (file && (file.name.endsWith('.edf') || file.name.endsWith('.bdf'))) {
            setSelectedFile(file)
            setError(null)
            uploadFile(file)
        } else {
            setError("Faqat .edf yoki .bdf fayllarni yuklang")
        }
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedFile(null)
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto border-dashed border-2">
            <CardContent className="p-0">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".edf,.bdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="edf-file-input"
                />
                <div
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-64 transition-colors duration-200 cursor-pointer outline-none",
                        isDragActive ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                    )}
                >
                    {!selectedFile ? (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            <UploadCloud className="w-12 h-12 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">EDF or BDF files (Brain signals)</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                            <FileIcon className="w-12 h-12 mb-4 text-primary" />
                            <p className="mb-2 text-sm font-medium text-foreground text-center truncate w-full">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>

                            {uploading && (
                                <div className="w-full max-w-xs mt-4 flex flex-col items-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mb-2" />
                                    <Progress value={undefined} className="h-1" />
                                    <p className="text-[10px] text-center mt-1 text-emerald-600 font-medium">{statusMessage}</p>
                                </div>
                            )}

                            {!uploading && !error && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 text-destructive hover:text-destructive"
                                    onClick={handleRemove}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                {error && (
                    <div className="flex items-center justify-center p-4 text-sm text-destructive bg-destructive/10">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {error}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
