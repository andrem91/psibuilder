import * as z from "zod"

// Login Schema
export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha obrigatória"),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Signup Schema
export const signupSchema = z.object({
    fullName: z.string().min(3, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
})

export type SignupFormData = z.infer<typeof signupSchema>

// Password Recovery Schema
export const recoverPasswordSchema = z.object({
    email: z.string().email("Email inválido"),
})

export type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>

// Update Password Schema
export const updatePasswordSchema = z.object({
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
})

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>
