export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-300">
            <div className="flex flex-col gap-1 max-w-6xl mx-auto p-4 text-sm text-gray-500 text-center">
                <span>
                    © {new Date().getFullYear()} — Powered by Transformer.js
                </span>

                <span className="text-gray-500">
                    Runs locally in your browser
                </span>

            </div>
        </footer>
    );
}
