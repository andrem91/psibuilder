import * as z from "zod"

// Contact Form Schema (site público)
export const contactFormSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional().or(z.literal("")),
    message: z.string().min(10, "Mensagem muito curta"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
