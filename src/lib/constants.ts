/**
 * Constantes centralizadas do PsiBuilder
 * Evita código duplicado e facilita manutenção
 */

// Cores padrão do tema
export const THEME_DEFAULTS = {
    primaryColor: "#6366f1",      // Indigo-500
    secondaryColor: "#a855f7",    // Purple-500
} as const;

// Configurações de imagem
export const IMAGE_LIMITS = {
    profile: {
        maxSize: 1024,
        quality: 85,
    },
    logo: {
        maxSize: 512,
        quality: 90,
    },
    blog: {
        maxSize: 1200,
        quality: 85,
    },
} as const;

// Planos disponíveis
export const PLANS = {
    FREE: "free",
    BASIC: "basico",
    PRO: "pro",
} as const;

// Limites por plano
export const PLAN_LIMITS = {
    [PLANS.FREE]: {
        blogPosts: 5,
        customDomain: false,
        analytics: false,
    },
    [PLANS.BASIC]: {
        blogPosts: 20,
        customDomain: true,
        analytics: true,
    },
    [PLANS.PRO]: {
        blogPosts: -1, // Ilimitado
        customDomain: true,
        analytics: true,
    },
} as const;
