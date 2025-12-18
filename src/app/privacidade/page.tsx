import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidade | PsicoSites",
    description: "Política de Privacidade da plataforma PsicoSites",
};

export default function PrivacidadePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>

            <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                    Última atualização: Dezembro de 2024
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introdução</h2>
                    <p className="text-gray-600 mb-4">
                        O PsicoSites está comprometido com a proteção de seus dados pessoais.
                        Esta política descreve como coletamos, usamos e protegemos suas informações,
                        em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Dados Coletados</h2>
                    <p className="text-gray-600 mb-4">
                        Coletamos os seguintes dados:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li><strong>Dados de cadastro:</strong> nome, email, CRP</li>
                        <li><strong>Dados do site:</strong> textos, imagens, configurações</li>
                        <li><strong>Dados de uso:</strong> acessos, cliques, preferências</li>
                        <li><strong>Dados de pagamento:</strong> processados por terceiros (Asaas)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Uso dos Dados</h2>
                    <p className="text-gray-600 mb-4">
                        Seus dados são usados para:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Fornecer e manter nossos serviços</li>
                        <li>Processar pagamentos</li>
                        <li>Enviar comunicações importantes</li>
                        <li>Melhorar a experiência do usuário</li>
                        <li>Cumprir obrigações legais</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Compartilhamento de Dados</h2>
                    <p className="text-gray-600 mb-4">
                        Não vendemos seus dados. Podemos compartilhar com:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Provedores de serviço (Supabase, Vercel, Asaas)</li>
                        <li>Autoridades, quando exigido por lei</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Segurança</h2>
                    <p className="text-gray-600 mb-4">
                        Utilizamos medidas de segurança como criptografia SSL/TLS,
                        autenticação segura e controle de acesso para proteger seus dados.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Seus Direitos (LGPD)</h2>
                    <p className="text-gray-600 mb-4">
                        Você tem direito a:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Confirmar a existência de tratamento de dados</li>
                        <li>Acessar seus dados</li>
                        <li>Corrigir dados incompletos ou desatualizados</li>
                        <li>Solicitar anonimização ou eliminação</li>
                        <li>Solicitar portabilidade</li>
                        <li>Revogar o consentimento</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Retenção de Dados</h2>
                    <p className="text-gray-600 mb-4">
                        Mantemos seus dados enquanto sua conta estiver ativa ou conforme
                        necessário para cumprir obrigações legais. Você pode solicitar
                        exclusão a qualquer momento.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contato do DPO</h2>
                    <p className="text-gray-600 mb-4">
                        Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
                        <a href="mailto:privacidade@psicosites.com.br" className="text-indigo-600 hover:underline ml-1">
                            privacidade@psicosites.com.br
                        </a>
                    </p>
                </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
                <Link href="/" className="text-indigo-600 hover:underline">
                    ← Voltar para a página inicial
                </Link>
            </div>
        </div>
    );
}
