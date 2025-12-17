"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError, FieldGroup, FieldDescription } from "@/components/ui/field";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { blogPostSchema, type BlogPostFormData } from "@/lib/schemas/blog";

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
    const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || "");

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting },
    } = useForm<BlogPostFormData>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            excerpt: post?.excerpt || "",
        },
    });

    const title = watch("title");

    // Gerar slug automaticamente do título
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    // Gerar slug automaticamente quando o título muda (apenas para novos posts)
    useEffect(() => {
        if (!post?.id && title) {
            setValue("slug", generateSlug(title));
        }
    }, [title, post?.id, setValue]);

    const onSubmit = async (data: BlogPostFormData, publish: boolean = false) => {
        startTransition(async () => {
            try {
                const method = post?.id ? "PUT" : "POST";
                const body = {
                    ...data,
                    id: post?.id,
                    featured_image_url: featuredImageUrl,
                    is_published: publish,
                };

                const res = await fetch("/api/blog", {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const responseData = await res.json();

                if (!res.ok) {
                    toast.error(responseData.error || "Erro ao salvar artigo");
                    return;
                }

                toast.success(publish ? "Artigo publicado!" : "Rascunho salvo!");

                setTimeout(() => {
                    router.push("/dashboard/blog");
                    router.refresh();
                }, 1000);
            } catch {
                toast.error("Erro ao salvar artigo");
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
                setFeaturedImageUrl(data.url);
            }
        } catch (error) {
            console.error("Erro no upload:", error);
        }
    };

    return (
        <div className="space-y-6">

            {/* Card principal */}
            <form className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <FieldGroup>
                    {/* Título */}
                    <Controller
                        name="title"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="title">Título do Artigo *</FieldLabel>
                                <Input
                                    id="title"
                                    placeholder="Ex: Como lidar com a ansiedade no dia a dia"
                                    aria-invalid={fieldState.invalid}
                                    {...field}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Slug */}
                    <Controller
                        name="slug"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="slug">URL do Artigo (slug)</FieldLabel>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400">/blog/</span>
                                    <Input
                                        id="slug"
                                        placeholder="como-lidar-com-ansiedade"
                                        aria-invalid={fieldState.invalid}
                                        className="flex-1"
                                        {...field}
                                        onChange={(e) => field.onChange(generateSlug(e.target.value))}
                                    />
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* Imagem de capa */}
                <Field>
                    <FieldLabel>Imagem de Capa</FieldLabel>
                    {featuredImageUrl ? (
                        <div className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={featuredImageUrl}
                                alt="Capa"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => setFeaturedImageUrl("")}
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
                </Field>

                {/* Resumo */}
                <Controller
                    name="excerpt"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="excerpt">Resumo (aparece na lista e SEO)</FieldLabel>
                            <Textarea
                                id="excerpt"
                                placeholder="Uma breve descrição do conteúdo do artigo..."
                                rows={3}
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Conteúdo */}
                <Controller
                    name="content"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Conteúdo do Artigo</FieldLabel>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <RichTextEditor
                                    content={field.value}
                                    onChange={field.onChange}
                                    placeholder="Escreva o conteúdo do seu artigo..."
                                />
                            </div>
                            <FieldDescription>
                                Use os controles para formatar o texto.
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </form>

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
                        onClick={handleSubmit((data) => onSubmit(data, false))}
                        isLoading={isPending || isSubmitting}
                    >
                        Salvar Rascunho
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit((data) => onSubmit(data, true))}
                        isLoading={isPending || isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Publicar Artigo
                    </Button>
                </div>
            </div>
        </div>
    );
}
