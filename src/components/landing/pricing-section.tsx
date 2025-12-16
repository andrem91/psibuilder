import Link from "next/link";

// Ícones SVG inline
const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export function PricingSection() {
    return (
        <section id="planos" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Planos que cabem no seu bolso
                    </h2>
                    <p className="text-xl text-gray-600">
                        Comece gratuito, evolua quando precisar
                    </p>
                </div>

                {/* Banner de Urgência */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-white text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <span className="animate-pulse">🔥</span>
                            <span className="font-bold">OFERTA DE LANÇAMENTO</span>
                            <span className="animate-pulse">🔥</span>
                        </div>
                        <p className="text-sm opacity-90">
                            Preço promocional por tempo limitado. Pode voltar ao valor original a qualquer momento.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Plano Gratuito */}
                    <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratuito</h3>
                        <p className="text-gray-600 mb-6">Perfeito para começar</p>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-bold text-gray-900">R$ 0</span>
                            <span className="text-gray-500">/mês</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="text-gray-700">Site profissional completo</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="text-gray-700">Subdomínio personalizado</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="text-gray-700">Até 3 especialidades</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="text-gray-700">WhatsApp integrado</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="text-gray-700">Estatísticas básicas</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <XIcon />
                                <span className="text-gray-400">Domínio próprio</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <XIcon />
                                <span className="text-gray-400">Remover marca PsiBuilder</span>
                            </li>
                        </ul>

                        <Link
                            href="/cadastro"
                            className="block w-full py-4 text-center bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Começar grátis
                        </Link>
                    </div>

                    {/* Plano Profissional */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                            Mais popular
                        </div>

                        <h3 className="text-2xl font-bold mb-2">Profissional</h3>
                        <p className="text-indigo-200 mb-4">Tudo que você precisa</p>

                        {/* Ancoragem de Preço */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">Oferta Especial</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold">R$ 49</span>
                                <span className="text-indigo-200">/mês</span>
                            </div>
                            <p className="text-xs text-indigo-300 mt-2">💎 Menos de 1/4 do valor de uma sessão</p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span>Tudo do plano gratuito</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span>Domínio próprio (.com.br)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span>Especialidades ilimitadas</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span>Blog integrado</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span>Estatísticas completas</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span>Remover marca PsiBuilder</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon />
                                <span>Suporte prioritário</span>
                            </li>
                        </ul>

                        <Link
                            href="/cadastro"
                            className="block w-full py-4 text-center bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            Começar agora
                        </Link>
                    </div>
                </div>

                {/* Garantia */}
                <div className="max-w-2xl mx-auto mt-12 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-50 border border-green-200 rounded-xl">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div className="text-left">
                            <p className="font-semibold text-green-800">Garantia total - Sem risco!</p>
                            <p className="text-sm text-green-700">Não gostou? Cancele quando quiser e volte para o plano gratuito. Sem burocracia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
