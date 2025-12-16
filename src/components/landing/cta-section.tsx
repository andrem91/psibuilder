import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Pronto para ter seu site profissional?
                </h2>
                <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
                    Junte-se a centenas de psicólogos que já estão atraindo mais pacientes
                    com um site profissional e bonito.
                </p>
                <Link
                    href="/cadastro"
                    className="inline-block px-10 py-5 bg-white text-indigo-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors shadow-xl"
                >
                    Quero meu site agora
                </Link>

                <p className="mt-6 text-indigo-200 text-sm">
                    Sem cartão de crédito • Cancele quando quiser
                </p>
            </div>
        </section>
    );
}
