"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/ui/scroll-link";

// Ícone de check reutilizável
const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export function HeroSection() {
    return (
        <section className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badges */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold border-2 border-green-200">
                            🏆 SEMPRE GRÁTIS - Para sempre
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                            Adequado às normas do CRP
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Tenha sua agenda cheia e mais autoridade com um{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            site profissional
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Seu site perfeito em qualquer celular ou computador.
                        Pare de perder pacientes por não ter presença online.
                        Com o PsiBuilder, você cria um site bonito e profissional sem precisar de conhecimento técnico.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            href="/cadastro"
                            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300"
                        >
                            Quero meu site agora
                        </Link>
                        <ScrollLink
                            to="preview"
                            className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Ver exemplo de site
                        </ScrollLink>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <CheckIcon />
                            <span>Sem cartão de crédito</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckIcon />
                            <span>Pronto em 5 minutos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckIcon />
                            <span>Cancele quando quiser</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
