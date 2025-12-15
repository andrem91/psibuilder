import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BlogList } from "@/components/blog/blog-list";

export default async function BlogPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Buscar profile e site
    const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name")
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
        redirect("/dashboard/onboarding");
    }

    // Buscar posts do blog
    const { data: posts } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("site_id", site.id)
        .order("created_at", { ascending: false });

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
                    <p className="text-gray-500 mt-1">
                        Crie artigos para atrair mais pacientes
                    </p>
                </div>
                <a
                    href="/dashboard/blog/novo"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Novo Artigo
                </a>
            </div>

            {/* Lista de posts */}
            <BlogList posts={posts || []} subdomain={site.subdomain} />
        </div>
    );
}
