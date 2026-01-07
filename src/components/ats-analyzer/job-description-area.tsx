import { Briefcase, Info, ShieldCheck } from "lucide-react";

interface JobDescriptionAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
}

export default function JobDescriptionArea({
    label,
    value,
    onChange,
    placeholder,
    rows = 8,
}: JobDescriptionAreaProps) {

    const handleTextChange = (text: string) => {
        const sanitized = text.replace(/<[^>]*>?/gm, '');

        if (sanitized.length > 15000) return;

        onChange(sanitized);
    };

    const charCount = value.length;

    return (
        <div className="flex flex-col w-full animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2 ml-1">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Briefcase size={16} className="text-indigo-500" />
                    {label}
                </label>
                <span className={`text-[10px] font-mono ${charCount > 12000 ? 'text-orange-500' : 'text-slate-400'}`}>
                    {charCount.toLocaleString()} / 15.000
                </span>
            </div>

            <div className="relative group">
                <textarea
                    value={value}
                    onChange={(e) => handleTextChange(e.target.value)}
                    rows={rows}
                    placeholder={placeholder}
                    className="
                        w-full px-4 pt-4 pb-10 
                        bg-white border-2 border-slate-200 rounded-xl
                        text-slate-700 placeholder:text-slate-400
                        focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 
                        hover:border-slate-300
                        transition-all duration-200 outline-none
                        resize-none
                    "
                />

                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded-md pointer-events-none">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                        Texto Protegido
                    </span>
                </div>
            </div>

            <div className="mt-2 flex items-start gap-2 px-1">
                <Info size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                    Para melhores resultados, cole a descrição completa da vaga, incluindo requisitos técnicos e responsabilidades.
                    Scripts e tags HTML são removidos automaticamente para sua segurança.
                </p>
            </div>
        </div>
    );
}