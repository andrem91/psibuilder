import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AccountPageClient } from "./account-page-client";

export default async function ContaPage() {
    const supabase = await createClient();

    // Verificar autenticação
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Buscar dados do perfil
    const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name, email, whatsapp, crp")
        .eq("user_id", user.id)
        .single();

    if (!profile) {
        redirect("/dashboard/onboarding");
    }

    // Buscar dados do site (para integrações)
    const { data: site } = await supabase
        .from("sites")
        .select("id, subdomain, google_analytics_id, clarity_id, facebook_pixel_id, gtm_id")
        .eq("profile_id", profile.id)
        .single();

    return (
        <div className="p-6 md:p-10">
            <AccountPageClient
                profile={profile}
                site={site}
            />
        </div>
    );
}
