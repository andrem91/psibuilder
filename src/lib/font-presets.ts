/**
 * Font Presets para Sites dos Psicólogos
 * 
 * Três combinações de fontes profissionais:
 * - Clássico: Elegante e sofisticado
 * - Moderno: Clean e contemporâneo  
 * - Acolhedor: Amigável e acessível
 */

export interface FontPreset {
    id: string;
    name: string;
    description: string;
    headingFont: string;
    bodyFont: string;
    headingWeight: number;
    bodyWeight: number;
}

export const FONT_PRESETS: Record<string, FontPreset> = {
    classic: {
        id: "classic",
        name: "Clássico",
        description: "Elegante e sofisticado",
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        headingWeight: 700,
        bodyWeight: 400,
    },
    modern: {
        id: "modern",
        name: "Moderno",
        description: "Clean e contemporâneo",
        headingFont: "Outfit",
        bodyFont: "Inter",
        headingWeight: 600,
        bodyWeight: 400,
    },
    warm: {
        id: "warm",
        name: "Acolhedor",
        description: "Amigável e acessível",
        headingFont: "Lora",
        bodyFont: "Source Sans 3",
        headingWeight: 600,
        bodyWeight: 400,
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
