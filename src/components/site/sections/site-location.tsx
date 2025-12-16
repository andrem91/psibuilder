import { SiteSectionProps, SiteProfile } from "@/types/site-types";
import { sanitizeMapEmbed } from "@/lib/sanitize";

interface SiteLocationProps extends SiteSectionProps {
    profile: SiteProfile;
}

export function SiteLocationSection({ profile, primaryColor }: SiteLocationProps) {
    // Só renderizar se tem atendimento presencial e endereço
    if (!profile?.in_person_service || !profile?.street) {
        return null;
    }

    const fullAddress = `${profile.street}${profile.street_number ? ` ${profile.street_number}` : ""}, ${profile.neighborhood || ""}, ${profile.city}, ${profile.state}`;

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: primaryColor }}
                >
                    Localização
                </h2>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    {/* Endereço */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: primaryColor + "15" }}
                            >
                                <svg
                                    className="w-6 h-6"
                                    style={{ color: primaryColor }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">
                                    {profile.street}{profile.street_number && `, ${profile.street_number}`}
                                    {profile.complement && ` - ${profile.complement}`}
                                </p>
                                <p className="text-gray-500">
                                    {profile.neighborhood && `${profile.neighborhood} - `}
                                    {profile.city}{profile.state && ` - ${profile.state}`}
                                    {profile.zip_code && ` - CEP: ${profile.zip_code}`}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Google Maps Embed */}
                    <div className="aspect-video">
                        {profile.google_maps_embed ? (
                            <div
                                className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
                                dangerouslySetInnerHTML={{ __html: sanitizeMapEmbed(profile.google_maps_embed) }}
                            />
                        ) : (
                            <iframe
                                src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        )}
                    </div>
                    {/* Link para abrir no Google Maps */}
                    <div className="p-4 bg-gray-50">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-sm font-medium hover:underline"
                            style={{ color: primaryColor }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Abrir no Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
