import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BlogPageClient } from "./blog-page-client";

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
        .select("id, subdomain, show_blog")
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
        <BlogPageClient
            posts={posts || []}
            siteId={site.id}
            subdomain={site.subdomain}
            initialShowBlog={site.show_blog !== false}
        />
    );
}
