import { SiteSectionProps, SiteTestimonial } from "@/types/site-types";

interface SiteTestimonialsProps extends SiteSectionProps {
    testimonials: SiteTestimonial[];
}

export function SiteTestimonialsSection({ testimonials, primaryColor }: SiteTestimonialsProps) {
    // Se não houver depoimentos, não renderizar
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2
                    className="text-3xl font-bold mb-10 text-center"
                    style={{ color: primaryColor }}
                >
                    O que dizem sobre mim
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                        >
                            {/* Estrelas */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`text-lg ${star <= testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Conteúdo */}
                            <p className="text-gray-600 italic mb-4">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>

                            {/* Autor */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    {testimonial.author_initials}
                                </div>
                                <span className="font-medium text-gray-900">
                                    {testimonial.author_name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
