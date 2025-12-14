import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Função para extrair domínio do referrer
function extractReferrerSource(referrer: string): string {
    if (!referrer) return "Direto";

    try {
        const url = new URL(referrer);
        const hostname = url.hostname.toLowerCase();

        // Mapear domínios conhecidos
        if (hostname.includes("google")) return "Google";
        if (hostname.includes("instagram")) return "Instagram";
        if (hostname.includes("facebook") || hostname.includes("fb.")) return "Facebook";
        if (hostname.includes("linkedin")) return "LinkedIn";
        if (hostname.includes("twitter") || hostname.includes("x.com")) return "Twitter/X";
        if (hostname.includes("youtube")) return "YouTube";
        if (hostname.includes("whatsapp")) return "WhatsApp";
        if (hostname.includes("tiktok")) return "TikTok";

        // Retornar hostname simplificado
        return hostname.replace("www.", "").split(".")[0];
    } catch {
        return "Direto";
    }
}

// API de tracking de eventos para o site público
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { siteId, eventType, referrer } = body;

        if (!siteId || !eventType) {
            return NextResponse.json({ error: "siteId e eventType são obrigatórios" }, { status: 400 });
        }

        // Verificar se a service key está disponível
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

        if (!serviceKey || !supabaseUrl) {
            return NextResponse.json({ error: "Configuração não disponível" }, { status: 500 });
        }

        // Cliente admin para bypass RLS
        const supabase = createClient(supabaseUrl, serviceKey, {
            auth: { autoRefreshToken: false, persistSession: false },
        });

        // Data de hoje
        const today = new Date().toISOString().split("T")[0];

        // Verificar se já existe registro para hoje
        const { data: existing } = await supabase
            .from("site_analytics")
            .select("id, page_views, unique_visitors, whatsapp_clicks, cta_clicks")
            .eq("site_id", siteId)
            .eq("date", today)
            .single();

        if (existing) {
            // Atualizar contador existente
            const updates: Record<string, number> = {};

            if (eventType === "page_view") {
                updates.page_views = (existing.page_views || 0) + 1;
            } else if (eventType === "unique_visitor") {
                updates.unique_visitors = (existing.unique_visitors || 0) + 1;
            } else if (eventType === "whatsapp_click") {
                updates.whatsapp_clicks = (existing.whatsapp_clicks || 0) + 1;
            } else if (eventType === "cta_click") {
                updates.cta_clicks = (existing.cta_clicks || 0) + 1;
            }

            if (Object.keys(updates).length > 0) {
                await supabase
                    .from("site_analytics")
                    .update(updates)
                    .eq("id", existing.id);
            }
        } else {
            // Criar novo registro para hoje
            const newRecord: Record<string, string | number> = {
                site_id: siteId,
                date: today,
                page_views: eventType === "page_view" ? 1 : 0,
                unique_visitors: eventType === "unique_visitor" ? 1 : 0,
                whatsapp_clicks: eventType === "whatsapp_click" ? 1 : 0,
                cta_clicks: eventType === "cta_click" ? 1 : 0,
            };

            await supabase.from("site_analytics").insert(newRecord);
        }

        // Registrar referrer se for unique_visitor
        if (eventType === "unique_visitor" && referrer) {
            const referrerSource = extractReferrerSource(referrer);

            // Verificar se já existe registro de referrer para hoje
            const { data: existingReferrer } = await supabase
                .from("site_referrers")
                .select("id, count")
                .eq("site_id", siteId)
                .eq("date", today)
                .eq("referrer_source", referrerSource)
                .single();

            if (existingReferrer) {
                // Incrementar contador
                await supabase
                    .from("site_referrers")
                    .update({ count: (existingReferrer.count || 0) + 1 })
                    .eq("id", existingReferrer.id);
            } else {
                // Criar novo registro
                await supabase.from("site_referrers").insert({
                    site_id: siteId,
                    date: today,
                    referrer_source: referrerSource,
                    count: 1,
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking error:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

// Permitir GET para verificar se API está funcionando
export async function GET() {
    return NextResponse.json({
        status: "ok",
        message: "API de tracking ativa"
    });
}
