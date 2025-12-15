import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { BlogEditor } from "@/components/blog/blog-editor";

interface EditBlogPostPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Buscar post
    const { data: post, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <a
                    href="/dashboard/blog"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar ao Blog
                </a>
                <h1 className="text-2xl font-bold text-gray-900">Editar Artigo</h1>
                <p className="text-gray-500 mt-1">
                    {post.is_published ? "Este artigo está publicado" : "Este artigo está em rascunho"}
                </p>
            </div>

            {/* Editor */}
            <BlogEditor post={post} />
        </div>
    );
}
