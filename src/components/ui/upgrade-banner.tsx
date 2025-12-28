"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UpgradeBannerProps {
    /** "warning" = antes do limite, "blocked" = limite atingido */
    mode: "warning" | "blocked";
    /** Nome da funcionalidade (ex: "posts no blog") */
    feature: string;
    /** Quantidade atual */
    current: number;
    /** Limite do plano */
    limit: number;
    /** Classe CSS adicional */
    className?: string;
}

// Mensagens persuasivas por recurso
const BENEFIT_MESSAGES: Record<string, { title: string; benefit: string }> = {
    "posts no blog": {
        title: "Atraia mais pacientes pelo Google!",
        benefit: "Psicólogos com blogs ativos recebem 3x mais contatos através de busca orgânica.",
    },
    "depoimentos": {
        title: "Aumente sua credibilidade!",
        benefit: "Depoimentos aumentam em até 270% a taxa de conversão de visitantes em pacientes.",
    },
    "default": {
        title: "Destaque-se da concorrência!",
        benefit: "Recursos ilimitados para você conquistar mais pacientes.",
    },
};

export function UpgradeBanner({
    mode,
    feature,
    current,
    limit,
    className = "",
}: UpgradeBannerProps) {
    const isBlocked = mode === "blocked";
    const messages = BENEFIT_MESSAGES[feature] || BENEFIT_MESSAGES["default"];

    return (
        <div
            className={`relative overflow-hidden rounded-2xl p-6 ${isBlocked
                    ? "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                } ${className}`}
        >
            {/* Decoração */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -right-4 -bottom-8 w-24 h-24 bg-white/5 rounded-full" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                    {/* Contador */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isBlocked
                                ? "bg-white/20 text-white"
                                : "bg-white/20 text-white"
                            }`}>
                            {isBlocked ? "🚫" : "⚡"} {current}/{limit} {feature}
                        </span>
                    </div>

                    {/* Título impactante */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {isBlocked ? `Seu potencial está limitado!` : messages.title}
                    </h3>

                    {/* Benefício */}
                    <p className="text-white/90 text-sm md:text-base mb-3">
                        {isBlocked
                            ? `Você atingiu o limite de ${feature}. ${messages.benefit}`
                            : messages.benefit
                        }
                    </p>

                    {/* Prova social */}
                    <p className="text-white/70 text-xs flex items-center gap-1.5">
                        <span className="inline-flex">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-300 text-sm">★</span>
                            ))}
                        </span>
                        +50 psicólogos já são Pro
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-start md:items-end gap-2">
                    <Link href="/dashboard/planos">
                        <Button
                            size="lg"
                            className={`
                                font-bold shadow-lg transition-all hover:scale-105
                                ${isBlocked
                                    ? "bg-white text-rose-600 hover:bg-gray-100"
                                    : "bg-white text-indigo-600 hover:bg-gray-100"
                                }
                            `}
                        >
                            🚀 Liberar {feature} ilimitados
                        </Button>
                    </Link>
                    <span className="text-white/80 text-xs">
                        Apenas R$47/mês • Cancele quando quiser
                    </span>
                </div>
            </div>
        </div>
    );
}
