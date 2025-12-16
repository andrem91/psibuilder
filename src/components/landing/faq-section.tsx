export function FAQSection() {
    return (
        <section id="faq" className="py-20">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Perguntas frequentes
                    </h2>
                </div>

                <div className="space-y-4">
                    {/* FAQ 1 */}
                    <details className="group bg-gray-50 rounded-xl">
                        <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900">
                            Preciso saber programar?
                            <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <p className="px-6 pb-6 text-gray-600">
                            Não! O PsiBuilder foi feito para ser fácil. Você só precisa preencher
                            suas informações e escolher as cores. Tudo é visual, como editar um documento do Word.
                        </p>
                    </details>

                    {/* FAQ 2 */}
                    <details className="group bg-gray-50 rounded-xl">
                        <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900">
                            Posso usar meu próprio domínio?
                            <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <p className="px-6 pb-6 text-gray-600">
                            Sim! No plano Profissional você pode conectar seu próprio domínio (ex: www.seusite.com.br).
                            Nós até ajudamos você a configurar.
                        </p>
                    </details>

                    {/* FAQ 3 */}
                    <details className="group bg-gray-50 rounded-xl">
                        <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900">
                            Posso cancelar quando quiser?
                            <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <p className="px-6 pb-6 text-gray-600">
                            Com certeza! Não existe fidelidade. Você pode cancelar quando quiser
                            e seu site volta para o plano gratuito automaticamente.
                        </p>
                    </details>

                    {/* FAQ 4 */}
                    <details className="group bg-gray-50 rounded-xl">
                        <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900">
                            O site fica fora do ar alguma vez?
                            <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <p className="px-6 pb-6 text-gray-600">
                            Nossos servidores têm 99,9% de disponibilidade. Usamos a mesma
                            infraestrutura de grandes empresas como Netflix e Airbnb.
                        </p>
                    </details>

                    {/* FAQ 5 */}
                    <details className="group bg-gray-50 rounded-xl">
                        <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900">
                            Como funciona o suporte?
                            <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <p className="px-6 pb-6 text-gray-600">
                            Temos suporte por email para todos os planos. No plano Profissional,
                            você tem prioridade e resposta em até 4 horas úteis.
                        </p>
                    </details>
                </div>
            </div>
        </section>
    );
}
