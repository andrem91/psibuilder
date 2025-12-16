import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BlogEditor } from "@/components/blog/blog-editor";
import Link from "next/link";

export default async function NewBlogPostPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Buscar profile e site
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
        .select("id")
        .eq("profile_id", profile.id)
        .single();

    if (!site) {
        redirect("/dashboard/onboarding");
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/dashboard/blog"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar ao Blog
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Novo Artigo</h1>
                <p className="text-gray-500 mt-1">
                    Escreva conteúdo de qualidade para atrair pacientes
                </p>
            </div>

            {/* Editor */}
            <BlogEditor />
        </div>
    );
}
