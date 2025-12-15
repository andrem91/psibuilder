import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET - Listar posts do usuário
export async function GET() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Buscar site do usuário
    const { data: site } = await supabase
        .from("sites")
        .select("id")
        .eq("profile_id", (
            await supabase.from("profiles").select("id").eq("user_id", user.id).single()
        ).data?.id)
        .single();

    if (!site) {
        return NextResponse.json({ posts: [] });
    }

    // Buscar posts
    const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("site_id", site.id)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: posts || [] });
}

// POST - Criar novo post
export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, featured_image_url, is_published } = body;

    if (!title || !slug) {
        return NextResponse.json({ error: "Título e slug são obrigatórios" }, { status: 400 });
    }

    // Buscar site do usuário
    const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

    const { data: site } = await supabase
        .from("sites")
        .select("id")
        .eq("profile_id", profile?.id)
        .single();

    if (!site) {
        return NextResponse.json({ error: "Site não encontrado" }, { status: 404 });
    }

    // Criar post
    const { data: post, error } = await supabase
        .from("blog_posts")
        .insert({
            site_id: site.id,
            title,
            slug: slug.toLowerCase().replace(/\s+/g, "-"),
            content,
            excerpt,
            featured_image_url,
            is_published: is_published || false,
            published_at: is_published ? new Date().toISOString() : null,
        })
        .select()
        .single();

    if (error) {
        if (error.code === "23505") {
            return NextResponse.json({ error: "Já existe um post com esse slug" }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post });
}

// PUT - Atualizar post
export async function PUT(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, slug, content, excerpt, featured_image_url, is_published } = body;

    if (!id) {
        return NextResponse.json({ error: "ID do post é obrigatório" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
        title,
        slug: slug?.toLowerCase().replace(/\s+/g, "-"),
        content,
        excerpt,
        featured_image_url,
        is_published,
    };

    // Se está publicando agora, definir published_at
    if (is_published) {
        const { data: existingPost } = await supabase
            .from("blog_posts")
            .select("published_at")
            .eq("id", id)
            .single();

        if (!existingPost?.published_at) {
            updateData.published_at = new Date().toISOString();
        }
    }

    const { data: post, error } = await supabase
        .from("blog_posts")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post });
}

// DELETE - Excluir post
export async function DELETE(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID do post é obrigatório" }, { status: 400 });
    }

    const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
