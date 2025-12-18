export function TestimonialsSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        O que nossos clientes dizem
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Depoimento 1 */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-6">
                            &quot;Finalmente consegui ter um site profissional sem gastar uma fortuna.
                            Em 10 minutos meu site estava no ar e já recebi meu primeiro contato no mesmo dia!&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                                AP
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Ana Paula</p>
                                <p className="text-sm text-gray-500">Psicóloga Clínica - SP</p>
                            </div>
                        </div>
                    </div>

                    {/* Depoimento 2 */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-6">
                            &quot;O que mais gostei foi a integração com WhatsApp. Meus pacientes
                            clicam e já conversam comigo direto. Aumentou muito meus atendimentos.&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                                RS
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Ricardo Santos</p>
                                <p className="text-sm text-gray-500">Psicólogo Organizacional - RJ</p>
                            </div>
                        </div>
                    </div>

                    {/* Depoimento 3 */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-6">
                            &quot;Tentei fazer um site sozinha e desisti. Com o PsicoSites foi
                            tão fácil que até minha mãe conseguiria. Recomendo demais!&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                                ML
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Mariana Lima</p>
                                <p className="text-sm text-gray-500">Neuropsicóloga - MG</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
