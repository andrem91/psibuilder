import * as z from "zod"

// Blog Post Form Schema (apenas campos controlados pelo form)
export const blogPostSchema = z.object({
    title: z.string().min(5, "Título muito curto"),
    slug: z.string()
        .min(3, "Slug muito curto")
        .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
    excerpt: z.string().max(300, "Máximo 300 caracteres"),
    content: z.string(),
})

export type BlogPostFormData = z.infer<typeof blogPostSchema>
