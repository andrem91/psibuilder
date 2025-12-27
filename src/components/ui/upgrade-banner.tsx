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

export function UpgradeBanner({
    mode,
    feature,
    current,
    limit,
    className = "",
}: UpgradeBannerProps) {
    const isBlocked = mode === "blocked";

    return (
        <div
            className={`rounded-xl p-4 ${isBlocked
                    ? "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200"
                    : "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200"
                } ${className}`}
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">
                        {isBlocked ? "🚫" : "⚠️"}
                    </span>
                    <div>
                        <p className={`font-medium ${isBlocked ? "text-red-800" : "text-amber-800"}`}>
                            {isBlocked
                                ? `Limite atingido!`
                                : `Você está usando ${current}/${limit} ${feature}`}
                        </p>
                        <p className={`text-sm ${isBlocked ? "text-red-600" : "text-amber-600"}`}>
                            {isBlocked
                                ? `Faça upgrade para o Pro e tenha ${feature} ilimitados.`
                                : `Faça upgrade para o Pro e tenha ${feature} ilimitados.`}
                        </p>
                    </div>
                </div>
                <Link href="/dashboard/planos">
                    <Button
                        size="sm"
                        className={
                            isBlocked
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-amber-600 hover:bg-amber-700 text-white"
                        }
                    >
                        ⭐ Upgrade Pro
                    </Button>
                </Link>
            </div>
        </div>
    );
}
