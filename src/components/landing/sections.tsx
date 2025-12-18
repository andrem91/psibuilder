// Ícone de check reutilizável
const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export function ProblemSolutionSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Problema */}
                    <div className="bg-white rounded-2xl p-8 border-2 border-red-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Sem site profissional</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-red-400 mt-1">✗</span>
                                <span>Pacientes pesquisam no Google e não te encontram</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-red-400 mt-1">✗</span>
                                <span>Depende apenas de indicações para crescer</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-red-400 mt-1">✗</span>
                                <span>Parece menos profissional que concorrentes</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-red-400 mt-1">✗</span>
                                <span>Agenda com horários vazios</span>
                            </li>
                        </ul>
                    </div>

                    {/* Solução */}
                    <div className="bg-white rounded-2xl p-8 border-2 border-green-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckIcon />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Com PsicoSites</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Apareça no Google para pacientes da sua cidade</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Atraia novos pacientes todos os dias</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Transmita credibilidade e profissionalismo</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Agenda cheia de novos pacientes</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ForWhoSection() {
    return (
        <section id="para-quem" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        O PsicoSites é para você se...
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Reconhece alguma dessas situações?
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                            📅
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Agenda com horários vazios
                        </h3>
                        <p className="text-gray-600">
                            Você depende de indicações que não vêm com frequência suficiente.
                            Quer atrair mais pacientes mas não sabe como.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-100">
                        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                            💸
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Cansado de agências caras
                        </h3>
                        <p className="text-gray-600">
                            Já pagou milhares para agências ou desenvolvedores que não
                            trouxeram resultados. Quer algo simples e acessível.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                            🌐
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Sem presença online
                        </h3>
                        <p className="text-gray-600">
                            Seus concorrentes aparecem no Google e você não.
                            Precisa construir sua presença digital do zero.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ROISection() {
    return (
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Faça as contas 🧮
                </h2>

                <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="text-green-200 text-sm mb-2">Valor médio de uma sessão</p>
                            <p className="text-4xl font-bold">R$ 200</p>
                        </div>
                        <div>
                            <p className="text-green-200 text-sm mb-2">Se 2 novos pacientes te encontrarem</p>
                            <p className="text-4xl font-bold">R$ 400/mês</p>
                        </div>
                        <div>
                            <p className="text-green-200 text-sm mb-2">Plano Pro do PsicoSites</p>
                            <p className="text-4xl font-bold">R$ 49/mês</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold mb-2">
                        Retorno de <span className="text-5xl">8x</span> o investimento
                    </p>
                    <p className="text-green-200 max-w-xl">
                        E se você conseguir 5 novos pacientes? Ou 10?
                        O site se paga logo no primeiro paciente que te encontra.
                    </p>
                </div>
            </div>
        </section>
    );
}
