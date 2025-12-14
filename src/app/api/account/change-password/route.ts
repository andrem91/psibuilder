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
        const { new_password } = body;

        if (!new_password || new_password.length < 6) {
            return NextResponse.json({ error: "Senha deve ter pelo menos 6 caracteres" }, { status: 400 });
        }

        // Atualizar senha via Supabase Auth
        const { error } = await supabase.auth.updateUser({
            password: new_password,
        });

        if (error) {
            console.error("Password update error:", error);
            return NextResponse.json({ error: error.message || "Erro ao alterar senha" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
