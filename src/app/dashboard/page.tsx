import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { signOut } from "../(auth)/actions";

export const metadata: Metadata = {
    title: "Dashboard | PsiBuilder",
    description: "Gerencie seu site profissional",
};

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Buscar perfil do usuário
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">PsiBuilder</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {profile?.full_name || user.email}
                        </span>
                        <form action={signOut}>
                            <Button variant="ghost" size="sm">
                                Sair
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Olá, {profile?.full_name?.split(" ")[0] || "Profissional"}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Bem-vindo ao seu painel. Vamos criar seu site profissional?
                    </p>
                </div>

                {/* Cards de ação rápida */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card: Completar perfil */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                            Completar Perfil
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Adicione suas informações profissionais, CRP e foto.
                        </p>
                        <Button size="sm" className="w-full">
                            Completar agora
                        </Button>
                    </div>

                    {/* Card: Personalizar site */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                            Personalizar Site
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Escolha cores, fontes e configure seu site.
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                            Personalizar
                        </Button>
                    </div>

                    {/* Card: Ver site */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Ver Meu Site</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Visualize como seu site aparece para os pacientes.
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                            Visualizar
                        </Button>
                    </div>
                </div>

                {/* Status do site */}
                <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Status do seu site</h3>
                            <p className="text-indigo-100 text-sm">
                                Complete seu perfil para publicar seu site
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                            <span className="text-sm font-medium">Rascunho</span>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Progresso</span>
                            <span>25%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all"
                                style={{ width: "25%" }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
