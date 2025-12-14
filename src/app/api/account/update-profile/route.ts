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
        const { full_name, email, whatsapp, crp } = body;

        // Atualizar perfil
        const { error } = await supabase
            .from("profiles")
            .update({
                full_name,
                email,
                whatsapp,
                crp,
                updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id);

        if (error) {
            console.error("Update error:", error);
            return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
