"use client"

import { useState, useCallback } from "react"
import { UploadCloud, File, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"

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

    const uploadFile = async (file: File) => {
        setUploading(true)
        onUploadStart()
        const formData = new FormData()
        formData.append("edf_file", file)

        // Find or use a patient ID (In production this would come from selection)
        // For integration, we'll assume the parent component might pass it or we fetch first.
        try {
            // Check for patients first
            const patientsRes = await apiClient.get("/clinical/patients/")
            let patientId;

            if (patientsRes.data.length > 0) {
                patientId = patientsRes.data[0].id
            } else {
                // Create a temporary test patient
                const newPatient = await apiClient.post("/clinical/patients/", {
                    fullname: "Patient-Simulated-001",
                    gender: "M",
                    age: 35
                })
                patientId = newPatient.data.id
            }

            formData.append("patient", patientId)

            const response = await apiClient.post("/analysis/records/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            onSuccess(response.data)
        } catch (err) {
            setError("Backend connection error. Ensure Django server is running.")
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const file = acceptedFiles[0]
            setSelectedFile(file)
            uploadFile(file)
        }
    }, [onUploadStart, onSuccess])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/octet-stream': ['.edf', '.bdf']
        },
        multiple: false
    })

    return (
        <Card className="w-full max-w-2xl mx-auto border-dashed border-2">
            <CardContent className="p-0">
                <div
                    {...getRootProps()}
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-64 transition-colors duration-200 cursor-pointer outline-none",
                        isDragActive ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                    )}
                >
                    <input {...getInputProps()} id="file-upload" />

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
                            <File className="w-12 h-12 mb-4 text-primary" />
                            <p className="mb-2 text-sm font-medium text-foreground text-center truncate w-full">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>

                            {uploading && (
                                <div className="w-full max-w-xs mt-4">
                                    <Progress value={undefined} className="h-1" />
                                    <p className="text-[10px] text-center mt-1 text-muted-foreground">Uploading to server...</p>
                                </div>
                            )}

                            {!uploading && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 text-destructive hover:text-destructive"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(null);
                                        setError(null);
                                    }}
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
