import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface SitePageProps {
    params: Promise<{ subdomain: string }>;
}

// Função para buscar dados do site
async function getSiteData(subdomain: string) {
    const supabase = await createClient();

    const { data: site, error } = await supabase
        .from("sites")
        .select(
            `
      *,
      profiles (
        full_name,
        email,
        whatsapp,
        crp,
        specialties,
        bio,
        profile_image_url
      )
    `
        )
        .or(`subdomain.eq.${subdomain},custom_domain.eq.${subdomain}`)
        .eq("is_published", true)
        .single();

    if (error || !site) {
        return null;
    }

    return site;
}

// Gerar metadata dinâmica
export async function generateMetadata({
    params,
}: SitePageProps): Promise<Metadata> {
    const { subdomain } = await params;
    const site = await getSiteData(subdomain);

    if (!site) {
        return {
            title: "Site não encontrado",
        };
    }

    const profile = site.profiles;

    return {
        title: site.site_title || `${profile?.full_name} - Psicólogo(a)`,
        description:
            site.meta_description ||
            profile?.bio ||
            `Site profissional de ${profile?.full_name}`,
        keywords: site.meta_keywords || profile?.specialties?.join(", "),
        openGraph: {
            title: site.site_title || profile?.full_name,
            description: site.meta_description || profile?.bio,
            images: profile?.profile_image_url ? [profile.profile_image_url] : [],
        },
    };
}

export default async function SiteHomePage({ params }: SitePageProps) {
    const { subdomain } = await params;
    const site = await getSiteData(subdomain);

    if (!site) {
        notFound();
    }

    const profile = site.profiles;
    const theme = site.theme_config || {};
    const primaryColor = theme.primaryColor || "#6366f1";

    return (
        <>
            {/* Hero Section */}
            <section
                className="relative py-24 px-4"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`,
                }}
            >
                <div className="max-w-4xl mx-auto text-center text-white">
                    {/* Foto */}
                    {profile?.profile_image_url && (
                        <div className="mb-6">
                            <img
                                src={profile.profile_image_url}
                                alt={profile.full_name}
                                className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-white shadow-2xl"
                            />
                        </div>
                    )}

                    {/* Nome */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {profile?.full_name}
                    </h1>

                    {/* CRP */}
                    {profile?.crp && (
                        <p className="text-lg opacity-90 mb-4">CRP: {profile.crp}</p>
                    )}

                    {/* Especialidades */}
                    {profile?.specialties && profile.specialties.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {profile.specialties.map((specialty: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    <a
                        href="#contato"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        Agendar Consulta
                    </a>
                </div>

                {/* Decoração */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* Sobre Section */}
            <section id="sobre" className="py-20 px-4 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2
                        className="text-3xl font-bold mb-8 text-center"
                        style={{ color: primaryColor }}
                    >
                        Sobre mim
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed text-center">
                        {profile?.bio ||
                            "Psicólogo(a) comprometido(a) com o bem-estar e a saúde mental dos meus pacientes. Ofereço um espaço seguro e acolhedor para que você possa expressar seus sentimentos e trabalhar em direção a uma vida mais equilibrada e feliz."}
                    </p>
                </div>
            </section>

            {/* Serviços / Especialidades */}
            {profile?.specialties && profile.specialties.length > 0 && (
                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-5xl mx-auto">
                        <h2
                            className="text-3xl font-bold mb-12 text-center"
                            style={{ color: primaryColor }}
                        >
                            Áreas de Atuação
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profile.specialties.map((specialty: string, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ backgroundColor: primaryColor + "15" }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            style={{ color: primaryColor }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        {specialty}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Atendimento especializado e humanizado.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contato Section */}
            <section id="contato" className="py-20 px-4 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2
                        className="text-3xl font-bold mb-6"
                        style={{ color: primaryColor }}
                    >
                        Entre em Contato
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Dê o primeiro passo para cuidar da sua saúde mental. Entre em contato
                        e agende sua consulta.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* WhatsApp */}
                        {profile?.whatsapp && (
                            <a
                                href={`https://wa.me/55${profile.whatsapp.replace(/\D/g, "")}?text=Olá! Vi seu site e gostaria de agendar uma consulta.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-full hover:opacity-90 transition-opacity"
                                data-track="whatsapp-click"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </a>
                        )}

                        {/* Email */}
                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="flex items-center gap-2 px-6 py-3 border-2 font-medium rounded-full hover:bg-gray-50 transition-colors"
                                style={{ borderColor: primaryColor, color: primaryColor }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
