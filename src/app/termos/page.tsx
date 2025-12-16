import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Termos de Uso | PsiBuilder",
    description: "Termos de Uso da plataforma PsiBuilder",
};

export default function TermosPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>

            <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                    Última atualização: Dezembro de 2024
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
                    <p className="text-gray-600 mb-4">
                        Ao acessar e usar a plataforma PsiBuilder, você concorda com estes Termos de Uso.
                        Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Descrição do Serviço</h2>
                    <p className="text-gray-600 mb-4">
                        O PsiBuilder é uma plataforma que permite a psicólogos e profissionais de saúde mental
                        criar e gerenciar sites profissionais de forma simples e rápida.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Cadastro e Conta</h2>
                    <p className="text-gray-600 mb-4">
                        Para usar nossos serviços, você precisa criar uma conta. Você é responsável por:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Manter a confidencialidade da sua senha</li>
                        <li>Todas as atividades que ocorrem em sua conta</li>
                        <li>Fornecer informações verdadeiras e atualizadas</li>
                        <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Uso Aceitável</h2>
                    <p className="text-gray-600 mb-4">
                        Você concorda em usar o PsiBuilder apenas para fins legais e de acordo com as
                        normas do Conselho Federal de Psicologia (CFP). É proibido:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Publicar conteúdo falso ou enganoso</li>
                        <li>Violar direitos de propriedade intelectual</li>
                        <li>Praticar qualquer ato que viole o Código de Ética do Psicólogo</li>
                        <li>Usar o serviço para spam ou atividades ilegais</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Conteúdo do Usuário</h2>
                    <p className="text-gray-600 mb-4">
                        Você mantém todos os direitos sobre o conteúdo que publica. Ao publicar, você nos
                        concede uma licença para exibir e distribuir seu conteúdo através da plataforma.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Pagamentos e Assinaturas</h2>
                    <p className="text-gray-600 mb-4">
                        Os planos pagos são cobrados de acordo com a periodicidade escolhida.
                        Cancelamentos podem ser feitos a qualquer momento, com acesso mantido até o
                        fim do período pago.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
                    <p className="text-gray-600 mb-4">
                        O PsiBuilder não se responsabiliza pelo conteúdo publicado pelos usuários ou
                        pela relação entre psicólogos e seus pacientes.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contato</h2>
                    <p className="text-gray-600 mb-4">
                        Em caso de dúvidas sobre estes termos, entre em contato através do email:
                        <a href="mailto:contato@psibuilder.com.br" className="text-indigo-600 hover:underline ml-1">
                            contato@psibuilder.com.br
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
