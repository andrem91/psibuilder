"use client";

import { cn } from "@/lib/utils";

interface AvatarInitialsProps {
    name: string;
    primaryColor?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
};

/**
 * Gera um avatar com as iniciais do nome
 * Útil como fallback quando não há foto/logo de perfil
 */
export function AvatarInitials({
    name,
    primaryColor = "#6366f1",
    size = "md",
    className
}: AvatarInitialsProps) {
    // Extrair iniciais do nome (máximo 2 letras)
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            className={cn(
                "rounded-full flex items-center justify-center font-bold select-none",
                sizeClasses[size],
                className
            )}
            style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
            }}
            aria-label={`Avatar de ${name}`}
        >
            {initials}
        </div>
    );
}
