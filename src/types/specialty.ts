// Tipos compartilhados do PsicoSites

/**
 * Especialidade com ícone e descrição
 */
export interface Specialty {
    name: string;
    description: string;
    icon: string; // Nome do ícone Lucide (ex: "brain", "heart")
}

/**
 * Lista de ícones disponíveis para especialidades
 */
export const SPECIALTY_ICONS = [
    { name: "brain", label: "Cérebro" },
    { name: "heart", label: "Coração" },
    { name: "smile", label: "Sorriso" },
    { name: "users", label: "Casal/Família" },
    { name: "baby", label: "Infantil" },
    { name: "clock", label: "Tempo" },
    { name: "shield", label: "Proteção" },
    { name: "sun", label: "Sol" },
    { name: "moon", label: "Lua" },
    { name: "zap", label: "Energia" },
    { name: "target", label: "Foco" },
    { name: "eye", label: "Visão" },
    { name: "hand", label: "Mão" },
    { name: "star", label: "Estrela" },
    { name: "leaf", label: "Folha" },
    { name: "cloud", label: "Nuvem" },
    { name: "activity", label: "Atividade" },
    { name: "anchor", label: "Âncora" },
    { name: "award", label: "Conquista" },
    { name: "book-open", label: "Livro" },
    { name: "compass", label: "Bússola" },
    { name: "feather", label: "Pena" },
    { name: "flag", label: "Bandeira" },
    { name: "home", label: "Casa" },
    { name: "key", label: "Chave" },
    { name: "lightbulb", label: "Lâmpada" },
    { name: "message-circle", label: "Diálogo" },
    { name: "puzzle", label: "Puzzle" },
    { name: "sparkles", label: "Brilhos" },
    { name: "trending-up", label: "Crescimento" },
] as const;

export type SpecialtyIconName = typeof SPECIALTY_ICONS[number]["name"];
