import { NavLink } from "react-router-dom";

interface HeaderNavProps {
    onNavigate?: () => void;
    direction?: "row" | "column";
}

export function HeaderNav({ onNavigate, direction = "row" }: HeaderNavProps) {
    const linkClass = ({ isActive }: { isActive: boolean }) => `
        block px-4 py-3 rounded-lg font-medium transition-all hover:bg-indigo-100 
        ${isActive
            ? "bg-indigo-600 text-white hover:bg-indigo-600"
            : "text-gray-700"
        }
    `;

    return (
        <nav
            className={
                direction === "row"
                    ? "flex gap-2"
                    : "flex flex-col space-y-2"
            }
        >
            <NavLink
                to="/translator"
                className={linkClass}
                onClick={onNavigate}
            >
                Translator
            </NavLink>

            <NavLink
                to="/ats"
                className={linkClass}
                onClick={onNavigate}
            >
                ATS Analyzer
            </NavLink>
        </nav>
    );
}
