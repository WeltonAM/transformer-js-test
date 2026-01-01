import { useEffect, useRef, useState } from "react";
import "./App.css";

import LanguageSelector from "./LanguageSelector";
import Progress from "./Progress";

function App() {
  const worker = useRef(null);

  // Model loading
  const [ready, setReady] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState<any>([]);

  // Inputs and outputs
  const [input, setInput] = useState("I love walking my dog.");
  const [sourceLanguage, setSourceLanguage] = useState("eng_Latn");
  const [targetLanguage, setTargetLanguage] = useState("por_Latn");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case "initiate":
          // Model file start load: add a new progress item to the list.
          setReady(false);
          setProgressItems((prev) => [...prev, e.data]);
          break;

        case "progress":
          // Model file progress: update one of the progress items.
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress };
              }
              return item;
            })
          );
          break;

        case "done":
          // Model file loaded: remove the progress item from the list.
          setProgressItems((prev) =>
            prev.filter((item) => item.file !== e.data.file)
          );
          break;

        case "ready":
          // Pipeline ready: the worker is ready to accept messages.
          setReady(true);
          break;

        case "update":
          // Generation update: update the output text.
          setOutput(e.data.output);
          break;

        case "complete":
          // Generation complete: re-enable the "Translate" button
          console.log("Translation complete:", e.data.output);
          setOutput(e.data.output[0].generated_text);
          setDisabled(false);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const translate = () => {
    setDisabled(true);
    worker.current.postMessage({
      text: input,
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
        Transformer.js Translator
      </h1>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-4 mb-6">
            <LanguageSelector
              type={"Source"}
              defaultLanguage={"eng_Latn"}
              onChange={(x) => setSourceLanguage(x.target.value)}
            />
            <LanguageSelector
              type={"Target"}
              defaultLanguage={"fra_Latn"}
              onChange={(x) => setTargetLanguage(x.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Source Text
              </label>
              <textarea
                value={input}
                rows={6}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none font-medium text-gray-800"
                placeholder="Enter text to translate..."
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Translation
              </label>
              <textarea
                value={output}
                rows={6}
                readOnly
                className="w-full p-4 border-2 border-gray-200 rounded-lg bg-gray-50 resize-none font-medium text-gray-800"
                placeholder="Translation will appear here..."
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={disabled}
          onClick={translate}
          className="mt-6 px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
        >
          Translate
        </button>

        <div className="w-full max-w-4xl mt-8">
          {ready === false && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <label className="text-blue-800 font-medium flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading models... (only runs once)
              </label>
            </div>
          )}
          <div className="space-y-3">
            {progressItems.map((data) => (
              <div key={data.file} className="bg-white rounded-lg shadow p-4">
                <Progress text={data.file} percentage={data.progress} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
