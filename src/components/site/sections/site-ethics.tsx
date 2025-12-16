import { SiteSectionProps } from "@/types/site-types";

interface SiteEthicsProps extends SiteSectionProps {
    showEthicsSection?: boolean;
    ethicsContent?: string;
}

export function SiteEthicsSection({
    showEthicsSection,
    ethicsContent,
    primaryColor
}: SiteEthicsProps) {
    // Se desabilitado ou sem conteúdo, não renderizar
    if (showEthicsSection === false || !ethicsContent) {
        return null;
    }

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <h2
                    className="text-3xl font-bold mb-10 text-center"
                    style={{ color: primaryColor }}
                >
                    🤝 Compromisso Ético
                </h2>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                        {ethicsContent}
                    </p>
                </div>
            </div>
        </section>
    );
}
