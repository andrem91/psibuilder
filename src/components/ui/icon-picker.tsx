"use client";

import { useState } from "react";
import { SPECIALTY_ICONS } from "@/types/specialty";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
    value: string;
    onChange: (icon: string) => void;
    primaryColor?: string;
}

// Componente para renderizar ícone Lucide dinamicamente
export function DynamicIcon({
    name,
    className,
    ...props
}: {
    name: string;
    className?: string;
    [key: string]: unknown;
}) {
    // Converte nome do ícone para PascalCase
    const iconName = name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("") as keyof typeof LucideIcons;

    const IconComponent = LucideIcons[iconName] as React.ComponentType<{ className?: string }>;

    if (!IconComponent) {
        // Fallback para Heart se o ícone não existir
        return <LucideIcons.Heart className={className} {...props} />;
    }

    return <IconComponent className={className} {...props} />;
}

export function IconPicker({ value, onChange, primaryColor = "#6366f1" }: IconPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Botão que mostra ícone selecionado */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: primaryColor + "15" }}
                >
                    <DynamicIcon
                        name={value || "heart"}
                        className="w-5 h-5"
                        style={{ color: primaryColor }}
                    />
                </div>
                <span className="text-sm text-gray-600">
                    {SPECIALTY_ICONS.find(i => i.name === value)?.label || "Selecionar ícone"}
                </span>
                <LucideIcons.ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown com grid de ícones */}
            {isOpen && (
                <>
                    {/* Overlay para fechar */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Grid de ícones */}
                    <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-[320px]">
                        <p className="text-xs text-gray-500 mb-2">Selecione um ícone:</p>
                        <div className="grid grid-cols-6 gap-2">
                            {SPECIALTY_ICONS.map((icon) => (
                                <button
                                    key={icon.name}
                                    type="button"
                                    onClick={() => {
                                        onChange(icon.name);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                                        value === icon.name
                                            ? "ring-2 ring-indigo-500 ring-offset-2"
                                            : "hover:bg-gray-100"
                                    )}
                                    style={{
                                        backgroundColor: value === icon.name ? primaryColor + "15" : undefined,
                                    }}
                                    title={icon.label}
                                >
                                    <DynamicIcon
                                        name={icon.name}
                                        className="w-5 h-5"
                                        style={{
                                            color: value === icon.name ? primaryColor : "#6b7280"
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
