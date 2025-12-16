"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Specialty } from "@/types/specialty";

// Mapeamento de especialidades para ícone e descrição padrão
const SPECIALTY_DEFAULTS: Record<string, { icon: string; description: string }> = {
    "Ansiedade": { icon: "brain", description: "Tratamento de transtornos ansiosos e crises de pânico" },
    "Depressão": { icon: "cloud", description: "Acompanhamento para transtornos depressivos" },
    "Terapia de Casal": { icon: "users", description: "Fortalecimento de vínculos e resolução de conflitos" },
    "Terapia Familiar": { icon: "home", description: "Dinâmicas familiares e comunicação" },
    "Luto": { icon: "feather", description: "Acolhimento no processo de elaboração de perdas" },
    "Autoestima": { icon: "star", description: "Desenvolvimento da confiança e autovalorização" },
    "Estresse": { icon: "activity", description: "Gerenciamento de estresse e burnout" },
    "TDAH": { icon: "zap", description: "Acompanhamento de déficit de atenção e hiperatividade" },
    "Autismo": { icon: "puzzle", description: "Suporte para pessoas no espectro autista" },
    "Infantil": { icon: "baby", description: "Psicoterapia para crianças" },
    "Adolescentes": { icon: "trending-up", description: "Acompanhamento na fase de transição" },
    "Carreira": { icon: "compass", description: "Orientação vocacional e profissional" },
    "Transtornos Alimentares": { icon: "heart", description: "Tratamento de anorexia, bulimia e compulsão alimentar" },
    "Dependência Química": { icon: "shield", description: "Suporte para dependências e vícios" },
    "Relacionamentos": { icon: "heart", description: "Dificuldades em relacionamentos interpessoais e afetivos" },
};

// Converte array de nomes para formato Specialty[]
function convertToSpecialtiesData(specialtyNames: string[]): Specialty[] {
    return specialtyNames.map(name => {
        const defaults = SPECIALTY_DEFAULTS[name];
        return {
            name,
            icon: defaults?.icon || "heart",
            description: defaults?.description || "",
        };
    });
}

interface OnboardingData {
    full_name: string;
    crp: string;
    whatsapp: string;
    bio: string;
    bio_short: string;
    specialties: string[];
}

// Salvar progresso do onboarding (step parcial)
export async function saveOnboardingStep(
    profileId: string,
    data: Partial<OnboardingData>
) {
    const supabase = await createClient();

    // Converter especialidades para formato JSONB com ícones e descrições
    const specialties_data = data.specialties
        ? convertToSpecialtiesData(data.specialties)
        : undefined;

    const { error } = await supabase
        .from("profiles")
        .update({
            full_name: data.full_name,
            crp: data.crp,
            whatsapp: data.whatsapp,
            bio: data.bio,
            bio_short: data.bio_short,
            specialties: data.specialties, // Manter para compatibilidade
            specialties_data, // Salvar formato rico
            updated_at: new Date().toISOString(),
        })
        .eq("id", profileId);

    if (error) {
        return { error: "Erro ao salvar dados. Tente novamente." };
    }

    return { success: true };
}

// FAQs padrão para novos sites
const DEFAULT_FAQS = [
    {
        question: "Qual é a frequência e duração das sessões?",
        answer: "As sessões têm duração de aproximadamente 50 minutos. A frequência inicial recomendada é semanal, podendo ser ajustada conforme a evolução do processo terapêutico.",
    },
    {
        question: "Preciso ter um diagnóstico para começar a terapia?",
        answer: "Não. A psicoterapia é indicada para qualquer pessoa que deseje autoconhecimento, desenvolvimento pessoal ou ajuda para lidar com questões emocionais e comportamentais.",
    },
    {
        question: "A terapia funciona online?",
        answer: "Sim! O atendimento online é tão eficaz quanto o presencial e oferece mais flexibilidade. Utilizo plataformas seguras que garantem sigilo e qualidade na conexão.",
    },
    {
        question: "Como funciona o sigilo profissional?",
        answer: "Tudo o que é compartilhado em sessão é absolutamente confidencial, conforme o Código de Ética do Psicólogo. Suas informações nunca serão compartilhadas sem autorização.",
    },
    {
        question: "Quanto tempo dura o tratamento?",
        answer: "O tempo varia de acordo com os objetivos e necessidades de cada pessoa. Algumas questões podem ser trabalhadas em poucos meses, outras requerem acompanhamento mais longo.",
    },
];

// Conteúdo de ética padrão
const DEFAULT_ETHICS_CONTENT = `Ao iniciar o processo terapêutico, meu compromisso é oferecer um espaço seguro, acolhedor e pautado nos princípios éticos da Psicologia. Isso inclui:

• Sigilo absoluto: tudo o que é compartilhado em sessão é confidencial
• Respeito e acolhimento: cada paciente é único, sem julgamentos
• Base científica: utilizo métodos validados cientificamente
• Autonomia do paciente: você participa ativamente das decisões`;

// Especialidades padrão para novos sites (usuário pode editar no Dashboard)
const DEFAULT_SPECIALTIES = ["Ansiedade", "Depressão", "Autoestima", "Estresse", "Relacionamentos", "Luto"];

// Completar onboarding e criar site
export async function completeOnboarding(
    profileId: string,
    data: OnboardingData
) {
    const supabase = await createClient();

    // 1. Criar especialidades padrão com ícones e descrições
    const specialties_data = convertToSpecialtiesData(DEFAULT_SPECIALTIES);

    // 2. Atualizar perfil com todos os dados
    const { error: profileError } = await supabase
        .from("profiles")
        .update({
            full_name: data.full_name,
            crp: data.crp,
            whatsapp: data.whatsapp,
            bio: data.bio,
            bio_short: data.bio_short,
            specialties: DEFAULT_SPECIALTIES, // Especialidades padrão
            specialties_data, // Formato rico com ícones
            updated_at: new Date().toISOString(),
        })
        .eq("id", profileId);

    if (profileError) {
        return { error: "Erro ao salvar perfil. Tente novamente." };
    }

    // 2. Gerar subdomain único baseado no nome
    const subdomain = generateSubdomain(data.full_name);

    // 3. Verificar se subdomain já existe
    const { data: existingSite } = await supabase
        .from("sites")
        .select("id")
        .eq("subdomain", subdomain)
        .single();

    // Se já existe, adicionar número aleatório
    const finalSubdomain = existingSite
        ? `${subdomain}-${Math.floor(Math.random() * 1000)}`
        : subdomain;

    // 4. Criar ou atualizar site
    const { data: existingUserSite } = await supabase
        .from("sites")
        .select("id")
        .eq("profile_id", profileId)
        .single();

    let siteId: string | null = null;

    if (existingUserSite) {
        siteId = existingUserSite.id;
        // Atualizar site existente
        const { error: siteError } = await supabase
            .from("sites")
            .update({
                is_published: true,
                site_title: `${data.full_name} - Psicólogo(a)`,
                meta_description: data.bio.substring(0, 160),
                show_ethics_section: true,
                ethics_content: DEFAULT_ETHICS_CONTENT,
                show_lgpd_section: true,
                theme_config: {
                    primaryColor: "#6366f1",
                    backgroundColor: "#ffffff",
                    fontFamily: "Inter",
                },
                updated_at: new Date().toISOString(),
            })
            .eq("id", existingUserSite.id);

        if (siteError) {
            return { error: "Erro ao atualizar site. Tente novamente." };
        }
    } else {
        // Criar novo site
        const { data: newSite, error: siteError } = await supabase
            .from("sites")
            .insert({
                profile_id: profileId,
                subdomain: finalSubdomain,
                is_published: true,
                site_title: `${data.full_name} - Psicólogo(a)`,
                meta_description: data.bio.substring(0, 160),
                show_ethics_section: true,
                ethics_content: DEFAULT_ETHICS_CONTENT,
                show_lgpd_section: true,
                theme_config: {
                    primaryColor: "#6366f1",
                    backgroundColor: "#ffffff",
                    fontFamily: "Inter",
                },
            })
            .select("id")
            .single();

        if (siteError || !newSite) {
            return { error: "Erro ao criar site. Tente novamente." };
        }

        siteId = newSite.id;
    }

    // 5. Criar FAQs padrão para o site (se ainda não existirem)
    if (siteId) {
        // Verificar se já tem FAQs
        const { data: existingFaqs } = await supabase
            .from("site_faqs")
            .select("id")
            .eq("site_id", siteId)
            .limit(1);

        if (!existingFaqs || existingFaqs.length === 0) {
            // Adicionar FAQs padrão
            const faqsToInsert = DEFAULT_FAQS.map((faq, index) => ({
                site_id: siteId,
                question: faq.question,
                answer: faq.answer,
                order_index: index,
                is_active: true,
            }));

            await supabase.from("site_faqs").insert(faqsToInsert);
        }
    }

    revalidatePath("/dashboard");
    return { success: true, subdomain: finalSubdomain };
}

// Helper para gerar subdomain a partir do nome
function generateSubdomain(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
        .trim()
        .replace(/\s+/g, "-") // Espaços para hífens
        .replace(/-+/g, "-") // Remove hífens duplicados
        .substring(0, 30); // Limita tamanho
}
