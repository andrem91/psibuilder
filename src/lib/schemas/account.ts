import * as z from "zod"

// Profile Schema
export const profileSchema = z.object({
    full_name: z.string().min(3, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    whatsapp: z.string(),
    crp: z.string(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

// Security Schema (Change Password)
export const securitySchema = z.object({
    current_password: z.string().min(1, "Senha atual obrigatória"),
    new_password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
    message: "Senhas não coincidem",
    path: ["confirm_password"],
})

export type SecurityFormData = z.infer<typeof securitySchema>

// Integrations Schema
export const integrationsSchema = z.object({
    google_analytics_id: z.string(),
    clarity_id: z.string(),
    facebook_pixel_id: z.string(),
    gtm_id: z.string(),
})

export type IntegrationsFormData = z.infer<typeof integrationsSchema>
