"use client";

import { Button } from "@/components/ui/button";
import { FONT_PRESETS } from "@/lib/font-presets";
import { FREE_COLORS, PRO_ONLY_COLORS } from "@/lib/constants";
import { useSubscription } from "@/hooks/use-subscription";
import { UseSiteEditorReturn } from "../hooks/useSiteEditor";
import Link from "next/link";

// Todas as cores
const ALL_COLORS = [...FREE_COLORS, ...PRO_ONLY_COLORS];

interface ThemeTabProps {
    editor: UseSiteEditorReturn;
}

export function ThemeTab({ editor }: ThemeTabProps) {
    const {
        themeData,
        setThemeData,
        profileData,
        attendanceData,
        isPending,
        handleSaveTheme,
    } = editor;

    const { isPro, loading: subscriptionLoading } = useSubscription();

    // Ordenar fontes: FREE primeiro, PRO depois
    const sortedFonts = Object.values(FONT_PRESETS).sort((a, b) => {
        if (a.isPro === b.isPro) return 0;
        return a.isPro ? 1 : -1;
    });

    const handleColorSelect = (colorHex: string, isProColor: boolean) => {
        if (isProColor && !isPro) {
            // Não permitir seleção de cor Pro
            return;
        }
        setThemeData({ ...themeData, primaryColor: colorHex });
    };

    const handleFontSelect = (fontId: string, isProFont: boolean) => {
        if (isProFont && !isPro) {
            // Não permitir seleção de fonte Pro
            return;
        }
        setThemeData({ ...themeData, fontPreset: fontId });
    };

    return (
        <div className="space-y-6">
            {/* Seletor de Cores */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor principal do site
                </label>
                <p className="text-sm text-gray-500 mb-4">
                    Cores selecionadas para transmitir calma e profissionalismo
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {ALL_COLORS.map((color, index) => {
                        const isProColor = index >= FREE_COLORS.length;
                        const isSelected = themeData.primaryColor.toLowerCase() === color.hex.toLowerCase();
                        const isLocked = isProColor && !isPro;

                        return (
                            <button
                                key={color.hex}
                                type="button"
                                onClick={() => handleColorSelect(color.hex, isProColor)}
                                disabled={subscriptionLoading}
                                className={`relative w-12 h-12 rounded-xl transition-all ${isSelected
                                        ? "ring-2 ring-offset-2 ring-gray-900 scale-110"
                                        : isLocked
                                            ? "opacity-60 cursor-not-allowed"
                                            : "hover:scale-105 cursor-pointer"
                                    }`}
                                style={{ backgroundColor: color.hex }}
                                title={isLocked ? `${color.name} (Pro)` : color.name}
                            >
                                {isLocked && (
                                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        🔒
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Banner Pro para cores */}
                {!isPro && (
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between">
                        <p className="text-sm text-amber-800">
                            <span className="font-medium">+{PRO_ONLY_COLORS.length} cores</span> exclusivas no plano Pro
                        </p>
                        <Link href="/dashboard/planos">
                            <Button size="sm" variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-100">
                                Ver planos
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Seletor de Tipografia */}
            <div className="pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎨 Estilo de Tipografia
                </label>
                <p className="text-sm text-gray-500 mb-4">
                    Escolha uma combinação de fontes para títulos e textos
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sortedFonts.map((preset) => {
                        const isSelected = themeData.fontPreset === preset.id;
                        const isLocked = preset.isPro && !isPro;

                        return (
                            <button
                                key={preset.id}
                                type="button"
                                onClick={() => handleFontSelect(preset.id, preset.isPro)}
                                disabled={subscriptionLoading}
                                className={`relative p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                        ? "border-indigo-500 bg-indigo-50"
                                        : isLocked
                                            ? "border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed"
                                            : "border-gray-200 hover:border-gray-300 cursor-pointer"
                                    }`}
                            >
                                {isLocked && (
                                    <span className="absolute top-2 right-2 bg-amber-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                                        Pro 🔒
                                    </span>
                                )}
                                <div className="mb-2">
                                    <span
                                        className="text-2xl text-gray-900"
                                        style={{ fontFamily: `"${preset.headingFont}", serif` }}
                                    >
                                        Aa
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gray-900">{preset.name}</h4>
                                <p className="text-xs text-gray-500">{preset.description}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {preset.headingFont} + {preset.bodyFont}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Banner Pro para fontes */}
                {!isPro && (
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between">
                        <p className="text-sm text-amber-800">
                            <span className="font-medium">+3 estilos</span> de tipografia no plano Pro
                        </p>
                        <Link href="/dashboard/planos">
                            <Button size="sm" variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-100">
                                Ver planos
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Preview */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preview:
                </label>
                <div
                    className="rounded-2xl p-6 text-white"
                    style={{ backgroundColor: themeData.primaryColor }}
                >
                    <h3 className="text-xl font-bold mb-2">{profileData.full_name || "Seu Nome"}</h3>
                    <p className="opacity-90">CRP: {profileData.crp || "00/00000"}</p>
                    <div className="flex gap-2 mt-3">
                        {attendanceData.online_service && (
                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">🖥️ Online</span>
                        )}
                        {attendanceData.in_person_service && (
                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">🏢 Presencial</span>
                        )}
                    </div>
                    <button className="mt-4 px-4 py-2 bg-white rounded-full text-sm font-medium"
                        style={{ color: themeData.primaryColor }}
                    >
                        Agendar Consulta
                    </button>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSaveTheme} isLoading={isPending}>
                    Salvar Tema
                </Button>
            </div>
        </div>
    );
}
