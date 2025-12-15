"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" isLoading={pending}>
            Criar conta
        </Button>
    );
}

export function SignUpForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        setSuccess(null);

        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        const result = await signUp(formData);

        // Se houver erro, o redirect não acontece e recebemos o erro
        if (result && "error" in result && result.error) {
            setError(result.error as string);
        }
        // Se houver sucesso, a action faz redirect automaticamente
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                    {success}
                </div>
            )}

            <Input
                name="fullName"
                type="text"
                label="Nome completo"
                placeholder="Dr(a). Maria Silva"
                required
                autoComplete="name"
            />

            <Input
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                required
                autoComplete="email"
            />

            <Input
                name="password"
                type="password"
                label="Senha"
                placeholder="Mínimo 6 caracteres"
                required
                autoComplete="new-password"
                minLength={6}
            />

            <Input
                name="confirmPassword"
                type="password"
                label="Confirmar senha"
                placeholder="Repita a senha"
                required
                autoComplete="new-password"
            />

            <SubmitButton />

            <p className="text-xs text-gray-500 text-center pt-2">
                Ao criar sua conta, você concorda com nossos{" "}
                <a href="/termos" className="text-indigo-600 hover:underline">
                    Termos de Uso
                </a>{" "}
                e{" "}
                <a href="/privacidade" className="text-indigo-600 hover:underline">
                    Política de Privacidade
                </a>
                .
            </p>
        </form>
    );
}
