"use client";

import Link from "next/link";
import { BlogList } from "@/components/blog/blog-list";
import { BlogToggle } from "@/components/blog/blog-toggle";
import { UpgradeBanner } from "@/components/ui/upgrade-banner";
import { useSubscription } from "@/hooks/use-subscription";
import { PLAN_LIMITS } from "@/lib/constants";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image_url: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
}

interface BlogPageClientProps {
    posts: BlogPost[];
    siteId: string;
    subdomain: string;
    initialShowBlog: boolean;
}

export function BlogPageClient({ posts, siteId, subdomain, initialShowBlog }: BlogPageClientProps) {
    const { isPro, loading } = useSubscription();

    const postCount = posts.length;
    const limit = PLAN_LIMITS.free.blogPosts;
    const isAtLimit = !isPro && postCount >= limit;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
                    <p className="text-gray-500 mt-1">
                        Crie artigos para atrair mais pacientes
                    </p>
                </div>
                {isAtLimit ? (
                    <button
                        disabled
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                        title="Limite atingido"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Novo Artigo 🔒
                    </button>
                ) : (
                    <Link
                        href="/dashboard/blog/novo"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Novo Artigo
                    </Link>
                )}
            </div>

            {/* Banner de upgrade - sempre aparece para usuários Free */}
            {!loading && !isPro && (
                <UpgradeBanner
                    mode={isAtLimit ? "blocked" : "warning"}
                    feature="posts no blog"
                    current={postCount}
                    limit={limit}
                    className="mb-6"
                />
            )}


            {/* Toggle de visibilidade do Blog */}
            <div className="mb-6">
                <BlogToggle siteId={siteId} initialShowBlog={initialShowBlog} />
            </div>

            {/* Lista de posts */}
            <BlogList posts={posts} subdomain={subdomain} />
        </div>
    );
}
