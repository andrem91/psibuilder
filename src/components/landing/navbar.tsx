"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/ui/scroll-link";

export function LandingNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg" />
                        <span className="text-xl font-bold text-gray-900">PsiBuilder</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <ScrollLink to="para-quem" className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                            Para quem
                        </ScrollLink>
                        <ScrollLink to="como-funciona" className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                            Como funciona
                        </ScrollLink>
                        <ScrollLink to="planos" className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                            Planos
                        </ScrollLink>
                        <ScrollLink to="faq" className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                            FAQ
                        </ScrollLink>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                        >
                            Entrar
                        </Link>
                        <Link
                            href="/cadastro"
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Criar meu site
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
