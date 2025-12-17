"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Dashboard error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Algo deu errado
                </h2>

                <p className="text-gray-600 mb-6">
                    Ocorreu um erro ao carregar esta página. Por favor, tente novamente.
                </p>

                <div className="flex gap-3 justify-center">
                    <Button onClick={reset}>
                        Tentar novamente
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
                        Voltar ao início
                    </Button>
                </div>

                {process.env.NODE_ENV === "development" && (
                    <details className="mt-6 text-left">
                        <summary className="text-sm text-gray-500 cursor-pointer">
                            Detalhes do erro (dev)
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded-lg text-xs overflow-auto">
                            {error.message}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}
