"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image_url: string;
    is_published: boolean;
}

interface BlogEditorProps {
    post?: BlogPost;
}

export function BlogEditor({ post }: BlogEditorProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState<BlogPost>({
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        excerpt: post?.excerpt || "",
        featured_image_url: post?.featured_image_url || "",
        is_published: post?.is_published || false,
    });

    // Gerar slug automaticamente do título
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            // Só gera slug automaticamente se é novo post ou slug está vazio
            slug: !post?.id ? generateSlug(title) : formData.slug,
        });
    };

    const handleSubmit = async (publish: boolean = false) => {
        setError(null);
        setSuccess(null);

        if (!formData.title.trim()) {
            setError("O título é obrigatório");
            return;
        }

        if (!formData.slug.trim()) {
            setError("O slug é obrigatório");
            return;
        }

        startTransition(async () => {
            try {
                const method = post?.id ? "PUT" : "POST";
                const body = {
                    ...formData,
                    id: post?.id,
                    is_published: publish,
                };

                const res = await fetch("/api/blog", {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Erro ao salvar artigo");
                    return;
                }

                setSuccess(publish ? "Artigo publicado!" : "Rascunho salvo!");

                // Redirecionar após um breve delay
                setTimeout(() => {
                    router.push("/dashboard/blog");
                    router.refresh();
                }, 1000);
            } catch {
                setError("Erro ao salvar artigo");
            }
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        formDataUpload.append("type", "blog");

        try {
            const res = await fetch("/api/upload-profile-image", {
                method: "POST",
                body: formDataUpload,
            });

            const data = await res.json();
            if (data.url) {
                setFormData({ ...formData, featured_image_url: data.url });
            }
        } catch (error) {
            console.error("Erro no upload:", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Alertas */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                    {success}
                </div>
            )}

            {/* Card principal */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                {/* Título */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título do Artigo *
                    </label>
                    <Input
                        placeholder="Ex: Como lidar com a ansiedade no dia a dia"
                        value={formData.title}
                        onChange={handleTitleChange}
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL do Artigo (slug)
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">/blog/</span>
                        <Input
                            placeholder="como-lidar-com-ansiedade"
                            value={formData.slug}
                            onChange={(e) =>
                                setFormData({ ...formData, slug: generateSlug(e.target.value) })
                            }
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Imagem de capa */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagem de Capa
                    </label>
                    {formData.featured_image_url ? (
                        <div className="relative">
                            <img
                                src={formData.featured_image_url}
                                alt="Capa"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, featured_image_url: "" })}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-500 mt-2">Clique para fazer upload</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Resumo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resumo (aparece na lista e SEO)
                    </label>
                    <textarea
                        placeholder="Uma breve descrição do conteúdo do artigo..."
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 resize-none"
                        rows={3}
                    />
                </div>

                {/* Conteúdo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conteúdo do Artigo
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <RichTextEditor
                            content={formData.content}
                            onChange={(html) => setFormData({ ...formData, content: html })}
                            placeholder="Escreva o conteúdo do seu artigo..."
                        />
                    </div>
                </div>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/blog")}
                >
                    Cancelar
                </Button>
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSubmit(false)}
                        isLoading={isPending && !formData.is_published}
                    >
                        Salvar Rascunho
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleSubmit(true)}
                        isLoading={isPending && formData.is_published}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Publicar Artigo
                    </Button>
                </div>
            </div>
        </div>
    );
}
