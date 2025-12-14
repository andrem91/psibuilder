import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Verificar autenticação
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        }

        const body = await request.json();
        const { google_analytics_id, clarity_id, facebook_pixel_id, gtm_id } = body;

        // Buscar perfil do usuário
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", user.id)
            .single();

        if (!profile) {
            return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
        }

        // Atualizar site com IDs de integração
        const { error } = await supabase
            .from("sites")
            .update({
                google_analytics_id: google_analytics_id || null,
                clarity_id: clarity_id || null,
                facebook_pixel_id: facebook_pixel_id || null,
                gtm_id: gtm_id || null,
                updated_at: new Date().toISOString(),
            })
            .eq("profile_id", profile.id);

        if (error) {
            console.error("Update error:", error);
            return NextResponse.json({ error: "Erro ao salvar integrações" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
