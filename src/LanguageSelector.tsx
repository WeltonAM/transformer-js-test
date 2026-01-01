const LANGUAGES = {
  English: "eng_Latn",
  French: "fra_Latn",
  Portuguese: "por_Latn",
};

export default function LanguageSelector({
  type,
  onChange,
  defaultLanguage,
}: any) {
  return (
    <div className="language-selector">
      <label>{type}: </label>
      <select onChange={onChange} defaultValue={defaultLanguage}>
        {Object.entries(LANGUAGES).map(([key, value]) => {
          return (
            <option key={key} value={value}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
}
