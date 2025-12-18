import { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <header className="w-full p-6">
                <Link href="/" className="flex items-center gap-2 w-fit">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        PsicoSites
                    </span>
                </Link>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="w-full p-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} PsicoSites. Todos os direitos reservados.
            </footer>
        </div>
    );
}
