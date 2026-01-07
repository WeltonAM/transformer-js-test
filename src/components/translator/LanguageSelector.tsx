import type { ChangeEvent } from "react";

const LANGUAGES = {
  English: "eng_Latn",
  French: "fra_Latn",
  Portuguese: "por_Latn",
} as const;

export type LanguageCode = typeof LANGUAGES[keyof typeof LANGUAGES];

interface LanguageSelectorProps {
  type: "Source" | "Target";
  defaultLanguage: LanguageCode;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}


export default function LanguageSelector({
  type,
  defaultLanguage,
  onChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-zinc-500">
        {type}
      </label>

      <select
        defaultValue={defaultLanguage}
        onChange={onChange}
        className="
          cursor-pointer
          rounded-md
          border border-zinc-300
          bg-white
          px-3 py-1.5
          text-sm
          text-zinc-800
          transition
          hover:border-zinc-400
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
        "
      >
        {Object.entries(LANGUAGES).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
