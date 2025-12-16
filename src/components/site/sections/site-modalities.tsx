import { SiteSectionProps } from "@/types/site-types";

interface SiteModalitiesProps extends SiteSectionProps {
    onlineService?: boolean;
    inPersonService?: boolean;
}

export function SiteModalitiesSection({
    onlineService,
    inPersonService,
    primaryColor
}: SiteModalitiesProps) {
    // Se nenhum serviço habilitado, não renderizar
    if (!onlineService && !inPersonService) {
        return null;
    }

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: primaryColor }}
                >
                    Modalidades de Atendimento
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {onlineService && (
                        <div className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: primaryColor + "15" }}
                            >
                                <svg
                                    className="w-7 h-7"
                                    style={{ color: primaryColor }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Atendimento Online
                            </h3>
                            <p className="text-gray-500">
                                Sessões por videochamada de qualquer lugar do Brasil. Flexibilidade e conforto para você.
                            </p>
                        </div>
                    )}
                    {inPersonService && (
                        <div className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: primaryColor + "15" }}
                            >
                                <svg
                                    className="w-7 h-7"
                                    style={{ color: primaryColor }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Atendimento Presencial
                            </h3>
                            <p className="text-gray-500">
                                Sessões no consultório. Um espaço acolhedor para suas sessões.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
