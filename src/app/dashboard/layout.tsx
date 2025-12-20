import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard";
import { DashboardThemeProvider, DashboardTheme } from "@/contexts/dashboard-theme-provider";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Buscar perfil do usuário com dados de tema
    const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, email, profile_image_url, logo_url, gender")
        .eq("user_id", user.id)
        .single();

    // Buscar configuração do site (cores, subdomain)
    const { data: site } = await supabase
        .from("sites")
        .select("subdomain, theme_config")
        .eq("user_id", user.id)
        .single();

    const userData = {
        name: profile?.full_name || user.email?.split("@")[0] || "Usuário",
        email: user.email || "",
        avatar: profile?.profile_image_url || undefined,
    };

    // Montar tema do dashboard
    const dashboardTheme: DashboardTheme = {
        primaryColor: site?.theme_config?.primaryColor || "#6366f1",
        logoUrl: profile?.logo_url || undefined,
        siteName: profile?.full_name || "Meu Site",
        subdomain: site?.subdomain || undefined,
        gender: profile?.gender || undefined,
    };

    return (
        <DashboardThemeProvider theme={dashboardTheme}>
            <DashboardShell user={userData} theme={dashboardTheme}>
                {children}
            </DashboardShell>
        </DashboardThemeProvider>
    );
}
