"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/ui/scroll-link";

export function LandingFooter() {
    return (
        <footer className="py-12 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg" />
                            <span className="text-xl font-bold text-white">PsicoSites</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            A plataforma mais fácil para psicólogos criarem sites profissionais.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Produto</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <ScrollLink to="para-quem" className="text-gray-400 hover:text-white cursor-pointer">
                                    Para quem
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink to="como-funciona" className="text-gray-400 hover:text-white cursor-pointer">
                                    Como funciona
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink to="planos" className="text-gray-400 hover:text-white cursor-pointer">
                                    Planos
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink to="faq" className="text-gray-400 hover:text-white cursor-pointer">
                                    FAQ
                                </ScrollLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/termos" className="text-gray-400 hover:text-white">Termos de Uso</Link></li>
                            <li><Link href="/privacidade" className="text-gray-400 hover:text-white">Privacidade</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Contato</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="mailto:contato@psicosites.com.br" className="text-gray-400 hover:text-white">contato@psicosites.com.br</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} PsicoSites. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
