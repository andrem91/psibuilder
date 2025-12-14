import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StatsPageClient } from "./stats-page-client";

export default async function EstatisticasPage() {
    const supabase = await createClient();

    // Verificar autenticação
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Buscar perfil e site
    const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (!profile) {
        redirect("/dashboard/onboarding");
    }

    const { data: site } = await supabase
        .from("sites")
        .select("id, subdomain")
        .eq("profile_id", profile.id)
        .single();

    if (!site) {
        redirect("/dashboard/site");
    }

    // Datas para os períodos
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);

    // Buscar estatísticas do período atual (últimos 7 dias)
    const { data: currentAnalytics } = await supabase
        .from("site_analytics")
        .select("date, page_views, unique_visitors, whatsapp_clicks, cta_clicks")
        .eq("site_id", site.id)
        .gte("date", sevenDaysAgo.toISOString().split("T")[0])
        .order("date", { ascending: true });

    // Buscar estatísticas do período anterior (7-14 dias atrás)
    const { data: previousAnalytics } = await supabase
        .from("site_analytics")
        .select("date, page_views, unique_visitors, whatsapp_clicks, cta_clicks")
        .eq("site_id", site.id)
        .gte("date", fourteenDaysAgo.toISOString().split("T")[0])
        .lt("date", sevenDaysAgo.toISOString().split("T")[0]);

    // Buscar referrers dos últimos 7 dias
    const { data: referrers } = await supabase
        .from("site_referrers")
        .select("referrer_source, count")
        .eq("site_id", site.id)
        .gte("date", sevenDaysAgo.toISOString().split("T")[0]);

    // Calcular totais do período atual
    const currentTotals = (currentAnalytics || []).reduce(
        (acc, day) => ({
            pageViews: acc.pageViews + (day.page_views || 0),
            uniqueVisitors: acc.uniqueVisitors + (day.unique_visitors || 0),
            whatsappClicks: acc.whatsappClicks + (day.whatsapp_clicks || 0),
            ctaClicks: acc.ctaClicks + (day.cta_clicks || 0),
        }),
        { pageViews: 0, uniqueVisitors: 0, whatsappClicks: 0, ctaClicks: 0 }
    );

    // Calcular totais do período anterior
    const previousTotals = (previousAnalytics || []).reduce(
        (acc, day) => ({
            pageViews: acc.pageViews + (day.page_views || 0),
            uniqueVisitors: acc.uniqueVisitors + (day.unique_visitors || 0),
            whatsappClicks: acc.whatsappClicks + (day.whatsapp_clicks || 0),
            ctaClicks: acc.ctaClicks + (day.cta_clicks || 0),
        }),
        { pageViews: 0, uniqueVisitors: 0, whatsappClicks: 0, ctaClicks: 0 }
    );

    // Função para calcular percentual de mudança
    const calcChange = (current: number, previous: number): string | null => {
        if (previous === 0 && current === 0) return null;
        if (previous === 0) return `+${current > 0 ? "100" : "0"}%`;
        const change = ((current - previous) / previous) * 100;
        const sign = change >= 0 ? "+" : "";
        return `${sign}${Math.round(change)}%`;
    };

    // Agrupar referrers e somar contagens
    const referrerMap = new Map<string, number>();
    (referrers || []).forEach((r) => {
        const current = referrerMap.get(r.referrer_source) || 0;
        referrerMap.set(r.referrer_source, current + r.count);
    });

    // Converter para array ordenado
    const topReferrers = Array.from(referrerMap.entries())
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Gerar dados para os últimos 7 dias (preenchendo dias sem dados)
    const dailyStats = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        const dayData = currentAnalytics?.find((a) => a.date === dateStr);

        dailyStats.push({
            date: date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
            views: dayData?.page_views || 0,
            visitors: dayData?.unique_visitors || 0,
        });
    }

    // Taxa de conversão
    const conversionRate = currentTotals.uniqueVisitors > 0
        ? (currentTotals.whatsappClicks / currentTotals.uniqueVisitors) * 100
        : 0;

    const stats = {
        pageViews: currentTotals.pageViews,
        uniqueVisitors: currentTotals.uniqueVisitors,
        whatsappClicks: currentTotals.whatsappClicks,
        ctaClicks: currentTotals.ctaClicks,
        conversionRate,
        topReferrers,
        dailyStats,
        // Percentuais de mudança
        changes: {
            pageViews: calcChange(currentTotals.pageViews, previousTotals.pageViews),
            uniqueVisitors: calcChange(currentTotals.uniqueVisitors, previousTotals.uniqueVisitors),
            whatsappClicks: calcChange(currentTotals.whatsappClicks, previousTotals.whatsappClicks),
            ctaClicks: calcChange(currentTotals.ctaClicks, previousTotals.ctaClicks),
        },
    };

    return (
        <div className="p-6 md:p-10">
            <StatsPageClient
                stats={stats}
                siteName={site.subdomain}
                dateRange="7 dias"
            />
        </div>
    );
}
