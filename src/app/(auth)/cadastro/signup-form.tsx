"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { signupSchema, type SignupFormData } from "@/lib/schemas/auth";
import { signUp } from "../actions";

export function SignUpForm() {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: SignupFormData) {
        setServerError(null);

        // Convert to FormData for server action compatibility
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await signUp(formData);

        // Se houver erro, o redirect não acontece e recebemos o erro
        if (result && "error" in result && result.error) {
            setServerError(result.error as string);
        }
        // Se houver sucesso, a action faz redirect automaticamente
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {serverError}
                </div>
            )}

            <FieldGroup>
                <Controller
                    name="fullName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="fullName">Nome completo</FieldLabel>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Dr(a). Maria Silva"
                                autoComplete="name"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                autoComplete="email"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">Senha</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                autoComplete="new-password"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Repita a senha"
                                autoComplete="new-password"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Criar conta
            </Button>

            <p className="text-xs text-gray-500 text-center pt-2">
                Ao criar sua conta, você concorda com nossos{" "}
                <Link href="/termos" className="text-indigo-600 hover:underline">
                    Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-indigo-600 hover:underline">
                    Política de Privacidade
                </Link>
                .
            </p>
        </form>
    );
}
