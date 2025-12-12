"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithEmail, loginWithMagicLink, type AuthResult } from "../actions";

function SubmitButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" isLoading={pending}>
            {children}
        </Button>
    );
}

export function LoginForm() {
    const [mode, setMode] = useState<"password" | "magic">("password");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        setSuccess(null);

        const result =
            mode === "password"
                ? await loginWithEmail(formData)
                : await loginWithMagicLink(formData);

        if (result && "error" in result && result.error) {
            setError(result.error);
        }
        if (result && "success" in result && result.success && "message" in result) {
            setSuccess(result.message);
        }
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
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                required
                autoComplete="email"
            />

            {mode === "password" && (
                <Input
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                />
            )}

            <SubmitButton>
                {mode === "password" ? "Entrar" : "Enviar link de acesso"}
            </SubmitButton>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">ou</span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setMode(mode === "password" ? "magic" : "password")}
            >
                {mode === "password"
                    ? "Entrar com link mágico (sem senha)"
                    : "Entrar com email e senha"}
            </Button>
        </form>
    );
}
