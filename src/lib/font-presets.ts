/**
 * Font Presets para Sites dos Psicólogos
 * 
 * Combinações de fontes profissionais:
 * - FREE: Clássico, Moderno
 * - PRO: Acolhedor, Elegante, Minimalista
 */

export interface FontPreset {
    id: string;
    name: string;
    description: string;
    headingFont: string;
    bodyFont: string;
    headingWeight: number;
    bodyWeight: number;
    isPro: boolean;
}

export const FONT_PRESETS: Record<string, FontPreset> = {
    // FREE
    classic: {
        id: "classic",
        name: "Clássico",
        description: "Elegante e sofisticado",
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        headingWeight: 700,
        bodyWeight: 400,
        isPro: false,
    },
    modern: {
        id: "modern",
        name: "Moderno",
        description: "Clean e contemporâneo",
        headingFont: "Outfit",
        bodyFont: "Inter",
        headingWeight: 600,
        bodyWeight: 400,
        isPro: false,
    },
    // PRO
    warm: {
        id: "warm",
        name: "Acolhedor",
        description: "Amigável e acessível",
        headingFont: "Lora",
        bodyFont: "Source Sans 3",
        headingWeight: 600,
        bodyWeight: 400,
        isPro: true,
    },
    elegant: {
        id: "elegant",
        name: "Elegante",
        description: "Refinado e premium",
        headingFont: "Cormorant Garamond",
        bodyFont: "Nunito",
        headingWeight: 600,
        bodyWeight: 400,
        isPro: true,
    },
    minimal: {
        id: "minimal",
        name: "Minimalista",
        description: "Simples e direto",
        headingFont: "DM Sans",
        bodyFont: "Inter",
        headingWeight: 500,
        bodyWeight: 400,
        isPro: true,
    },
};


export const DEFAULT_FONT_PRESET = "modern";

/**
 * Retorna o preset de fonte ou o default
 */
export function getFontPreset(presetId?: string): FontPreset {
    if (presetId && FONT_PRESETS[presetId]) {
        return FONT_PRESETS[presetId];
    }
    return FONT_PRESETS[DEFAULT_FONT_PRESET];
}

/**
 * Gera o URL do Google Fonts para um preset
 */
export function getGoogleFontsUrl(preset: FontPreset): string {
    const fonts = new Set<string>();

    // Adicionar fonte de título
    const headingFontParam = preset.headingFont.replace(/ /g, "+");
    fonts.add(`family=${headingFontParam}:wght@${preset.headingWeight}`);

    // Adicionar fonte de corpo (se diferente)
    if (preset.bodyFont !== preset.headingFont) {
        const bodyFontParam = preset.bodyFont.replace(/ /g, "+");
        fonts.add(`family=${bodyFontParam}:wght@${preset.bodyWeight};500;600`);
    }

    return `https://fonts.googleapis.com/css2?${Array.from(fonts).join("&")}&display=swap`;
}

/**
 * Gera as variáveis CSS para as fontes
 */
export function getFontCSSVariables(preset: FontPreset): Record<string, string> {
    return {
        "--font-heading": `"${preset.headingFont}", serif`,
        "--font-body": `"${preset.bodyFont}", sans-serif`,
        "--font-heading-weight": String(preset.headingWeight),
        "--font-body-weight": String(preset.bodyWeight),
    };
}
