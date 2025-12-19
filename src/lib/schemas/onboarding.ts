import * as z from "zod"

// Tipos de gênero
export const genderValues = ['male', 'female', 'other', 'not_specified'] as const;
export type GenderType = typeof genderValues[number];

// Step 1: Dados básicos
export const onboardingStep1Schema = z.object({
    full_name: z.string().min(3, "Nome muito curto"),
    gender: z.enum(genderValues, { message: "Selecione uma opção" }),
    whatsapp: z.string().regex(/^\d{10,11}$/, "WhatsApp inválido (use só números, DDD + número)"),
})

export type OnboardingStep1Data = z.infer<typeof onboardingStep1Schema>

// Step 2: CRP
export const onboardingStep2Schema = z.object({
    crp: z.string().regex(/^\d{2}\/\d{4,6}$/, "Formato inválido. Use: 06/12345"),
})

export type OnboardingStep2Data = z.infer<typeof onboardingStep2Schema>

// Step 3: Bio
export const onboardingStep3Schema = z.object({
    bio_short: z.string().max(150, "Máximo 150 caracteres").optional().or(z.literal("")),
    bio: z.string().min(10, "Escreva uma breve descrição sobre você"),
})

export type OnboardingStep3Data = z.infer<typeof onboardingStep3Schema>

// Schema completo do onboarding (para validação final)
export const onboardingCompleteSchema = z.object({
    full_name: z.string().min(3, "Nome muito curto"),
    gender: z.enum(genderValues).optional().default('not_specified'),
    whatsapp: z.string().regex(/^\d{10,11}$/, "WhatsApp inválido"),
    crp: z.string().regex(/^\d{2}\/\d{4,6}$/, "Formato inválido"),
    bio_short: z.string().max(150).optional().or(z.literal("")),
    bio: z.string().min(10, "Escreva uma breve descrição"),
    specialties: z.array(z.string()).optional(),
})

export type OnboardingCompleteData = z.infer<typeof onboardingCompleteSchema>
