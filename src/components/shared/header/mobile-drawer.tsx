interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
    return (
        <>
            <div
                className={`
                    fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity
                    ${open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
                onClick={onClose}
            />

            <aside
                className={`
                    fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl
                    transform transition-transform duration-300 ease-out
                    ${open
                        ? "translate-x-0"
                        : "translate-x-full"
                    }
                `}
            >
                <div className="p-4 flex items-center justify-between border-b border-gray-300">
                    <span className="font-semibold text-indigo-600">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4">{children}</div>
            </aside>
        </>
    );
}
