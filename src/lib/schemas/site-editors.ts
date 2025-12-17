import * as z from "zod"

// FAQ Item Schema
export const faqItemSchema = z.object({
    question: z.string().min(5, "Pergunta muito curta"),
    answer: z.string().min(10, "Resposta muito curta"),
})

export type FaqItemFormData = z.infer<typeof faqItemSchema>

// Testimonial Schema
export const testimonialSchema = z.object({
    author_name: z.string().min(2, "Nome muito curto"),
    content: z.string().min(20, "Depoimento muito curto"),
    rating: z.number().min(1).max(5),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>

// Specialty Schema
export const specialtySchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    description: z.string().optional().or(z.literal("")),
    icon: z.string().default("heart"),
})

export type SpecialtyFormData = z.infer<typeof specialtySchema>

// SEO Schema
export const seoSchema = z.object({
    site_title: z.string().min(3, "Título muito curto"),
    meta_description: z.string().max(160, "Máximo 160 caracteres"),
})

export type SeoFormData = z.infer<typeof seoSchema>

