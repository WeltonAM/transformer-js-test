import { NavLink } from "react-router-dom";
import { useState } from "react";
import { HeaderNav } from "./header-nav";
import { MobileDrawer } from "./mobile-drawer";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <NavLink
                        to="/translator"
                        className="flex justify-center items-center gap-2 text-xl font-bold text-indigo-600"
                    >
                        <span className="text-4xl -mt-2">🤗</span>
                        AI Tools
                    </NavLink>

                    <div className="hidden md:block">
                        <HeaderNav />
                    </div>

                    <button
                        className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpen(true)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>
                </div>
            </header>

            <MobileDrawer open={open} onClose={() => setOpen(false)}>
                <HeaderNav
                    direction="column"
                    onNavigate={() => setOpen(false)}
                />
            </MobileDrawer>
        </>
    );
}
