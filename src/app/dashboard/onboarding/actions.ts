"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface OnboardingData {
    full_name: string;
    crp: string;
    whatsapp: string;
    bio: string;
    specialties: string[];
}

// Salvar progresso do onboarding (step parcial)
export async function saveOnboardingStep(
    profileId: string,
    data: Partial<OnboardingData>
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("profiles")
        .update({
            full_name: data.full_name,
            crp: data.crp,
            whatsapp: data.whatsapp,
            bio: data.bio,
            specialties: data.specialties,
            updated_at: new Date().toISOString(),
        })
        .eq("id", profileId);

    if (error) {
        return { error: "Erro ao salvar dados. Tente novamente." };
    }

    return { success: true };
}

// Completar onboarding e criar site
export async function completeOnboarding(
    profileId: string,
    data: OnboardingData
) {
    const supabase = await createClient();

    // 1. Atualizar perfil com todos os dados
    const { error: profileError } = await supabase
        .from("profiles")
        .update({
            full_name: data.full_name,
            crp: data.crp,
            whatsapp: data.whatsapp,
            bio: data.bio,
            specialties: data.specialties,
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

    if (existingUserSite) {
        // Atualizar site existente
        const { error: siteError } = await supabase
            .from("sites")
            .update({
                is_published: true,
                site_title: `${data.full_name} - Psicólogo(a)`,
                meta_description: data.bio.substring(0, 160),
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
        const { error: siteError } = await supabase.from("sites").insert({
            profile_id: profileId,
            subdomain: finalSubdomain,
            is_published: true,
            site_title: `${data.full_name} - Psicólogo(a)`,
            meta_description: data.bio.substring(0, 160),
            theme_config: {
                primaryColor: "#6366f1",
                backgroundColor: "#ffffff",
                fontFamily: "Inter",
            },
        });

        if (siteError) {
            return { error: "Erro ao criar site. Tente novamente." };
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
