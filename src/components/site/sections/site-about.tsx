import { SiteSectionProps } from "@/types/site-types";
import { sanitizeHtml } from "@/lib/sanitize";

interface SiteAboutProps extends SiteSectionProps {
    bio?: string;
}

export function SiteAboutSection({ bio, primaryColor }: SiteAboutProps) {
    return (
        <section id="sobre" className="py-20 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: primaryColor }}
                >
                    Sobre mim
                </h2>
                {bio ? (
                    <div
                        className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-800 prose-a:text-indigo-600 prose-blockquote:border-indigo-500 text-center [&_p]:text-center [&_h2]:text-center [&_h3]:text-center"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(bio) }}
                    />
                ) : (
                    <p className="text-gray-600 text-lg leading-relaxed text-center">
                        Psicólogo(a) comprometido(a) com o bem-estar e a saúde mental dos meus pacientes. Ofereço um espaço seguro e acolhedor para que você possa expressar seus sentimentos e trabalhar em direção a uma vida mais equilibrada e feliz.
                    </p>
                )}
            </div>
        </section>
    );
}
