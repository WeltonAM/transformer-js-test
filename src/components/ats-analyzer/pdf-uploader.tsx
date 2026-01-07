import { useState, useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { FileText, Upload, CheckCircle2, X, File as FileIcon } from "lucide-react";
import { useToast } from "../../data/hooks/use-toasify";

interface PDFUploaderProps {
    label: string;
    onFileSelect: (file: File | null) => void;
}

export default function PDFUploader({ label, onFileSelect }: PDFUploaderProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { warn } = useToast();

    const processFile = (file: File) => {
        if (file.type !== "application/pdf") {
            warn("Apenas arquivos PDF são permitidos.");
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        setFileName(file.name);
        onFileSelect(file);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const clearFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFileName(null);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col w-full">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2 ml-1">
                <FileIcon size={16} className="text-indigo-500" />
                {label}
            </span>

            <label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative flex flex-col items-center justify-center w-full 
                    min-h-36 py-4 px-4
                    border-2 border-dashed rounded-xl transition-all duration-200
                    cursor-pointer overflow-hidden
                    ${isDragging
                        ? "border-indigo-500 bg-indigo-50 scale-[1.01]"
                        : fileName
                            ? "border-green-400 bg-green-50"
                            : "border-slate-300 bg-white hover:bg-slate-50 hover:border-blue-400"
                    }
                `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="flex flex-col items-center justify-center w-full text-center pointer-events-none">
                    {!fileName ? (
                        <div className="flex flex-col items-center">
                            <div className={`p-3 mb-3 rounded-full transition-colors ${isDragging ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-50 text-blue-500'}`}>
                                <Upload size={24} />
                            </div>
                            <p className="text-sm text-slate-600 font-semibold px-2">
                                {isDragging ? "Solte o arquivo agora" : "Clique ou arraste o currículo aqui"}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Apenas formato PDF</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="p-3 mb-2 rounded-full bg-green-100 text-green-600">
                                <CheckCircle2 size={24} />
                            </div>

                            <div className="flex items-center justify-center gap-2 w-full max-w-64 sm:max-w-xs px-4">
                                <FileText size={16} className="text-slate-400 shrink-0" />
                                <span className="text-sm font-medium text-slate-700 truncate">
                                    {fileName}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={clearFile}
                                className="mt-3 text-xs text-red-500 hover:text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center gap-1 font-medium transition-colors border border-transparent hover:border-red-200 pointer-events-auto"
                            >
                                <X size={14} />
                                Substituir arquivo
                            </button>
                        </div>
                    )}
                </div>
            </label>
        </div>
    );
}