import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Confirme seu Email | PsiBuilder",
    description: "Verifique sua caixa de entrada para confirmar seu cadastro",
};

export default function ConfirmarEmailPage() {
    return (
        <div className="w-full max-w-md text-center">
            {/* Ícone de email */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            </div>

            {/* Título */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Verifique seu email
            </h1>

            {/* Descrição */}
            <p className="text-gray-600 mb-8">
                Enviamos um link de confirmação para o seu email.
                Clique no link para ativar sua conta e começar a criar seu site.
            </p>

            {/* Dicas */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
                <p className="text-amber-800 text-sm font-medium mb-2">
                    Não encontrou o email?
                </p>
                <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Verifique sua pasta de spam</li>
                    <li>• Confira se digitou o email corretamente</li>
                    <li>• Aguarde alguns minutos e tente novamente</li>
                </ul>
            </div>

            {/* Link para login */}
            <p className="text-gray-500 text-sm">
                Já confirmou?{" "}
                <Link
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                    Fazer login
                </Link>
            </p>
        </div>
    );
}
