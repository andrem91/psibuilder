import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Cookies | PsicoSites",
    description: "Política de Cookies da plataforma PsicoSites",
};

export default function CookiesPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies</h1>

            <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                    Última atualização: Dezembro de 2024
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">1. O que são Cookies?</h2>
                    <p className="text-gray-600 mb-4">
                        Cookies são pequenos arquivos de texto armazenados no seu navegador quando você
                        visita um site. Eles são amplamente utilizados para fazer os sites funcionarem
                        de forma mais eficiente e fornecer informações aos proprietários do site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Como Usamos Cookies</h2>
                    <p className="text-gray-600 mb-4">
                        O PsicoSites utiliza cookies para:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li><strong>Autenticação:</strong> manter você logado</li>
                        <li><strong>Preferências:</strong> lembrar suas configurações</li>
                        <li><strong>Análise:</strong> entender como você usa a plataforma</li>
                        <li><strong>Segurança:</strong> proteger contra fraudes</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Tipos de Cookies</h2>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Essenciais</h3>
                        <p className="text-gray-600 text-sm">
                            Necessários para o funcionamento do site. Não podem ser desativados.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Análise</h3>
                        <p className="text-gray-600 text-sm">
                            Nos ajudam a entender como os visitantes usam o site.
                            Dados são coletados de forma anônima.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Funcionais</h3>
                        <p className="text-gray-600 text-sm">
                            Permitem funcionalidades aprimoradas como preferências de tema.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Gerenciar Cookies</h2>
                    <p className="text-gray-600 mb-4">
                        Você pode controlar e/ou excluir cookies através das configurações do seu navegador.
                        No entanto, a remoção de cookies pode afetar a funcionalidade do site.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Para mais informações sobre como gerenciar cookies, visite:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Chrome</a></li>
                        <li><a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Firefox</a></li>
                        <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Safari</a></li>
                        <li><a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Edge</a></li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies de Terceiros</h2>
                    <p className="text-gray-600 mb-4">
                        Utilizamos serviços de terceiros que podem definir seus próprios cookies:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li><strong>Supabase:</strong> autenticação e banco de dados</li>
                        <li><strong>Vercel:</strong> hospedagem e analytics</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Atualizações</h2>
                    <p className="text-gray-600 mb-4">
                        Esta política pode ser atualizada periodicamente. Recomendamos que você
                        reveja esta página regularmente para se manter informado.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contato</h2>
                    <p className="text-gray-600 mb-4">
                        Dúvidas sobre cookies? Entre em contato:
                        <a href="mailto:contato@psicosites.com.br" className="text-indigo-600 hover:underline ml-1">
                            contato@psicosites.com.br
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
