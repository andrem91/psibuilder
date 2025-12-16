import { SiteSectionProps, SiteFAQ } from "@/types/site-types";

interface SiteFAQSectionProps extends SiteSectionProps {
    faqs: SiteFAQ[];
}

export function SiteFAQSection({ faqs, primaryColor }: SiteFAQSectionProps) {
    // Se não houver FAQs, não renderizar
    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <h2
                    className="text-3xl font-bold mb-10 text-center"
                    style={{ color: primaryColor }}
                >
                    Perguntas Frequentes
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details
                            key={faq.id}
                            className="group bg-white rounded-xl shadow-sm border border-gray-100"
                        >
                            <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-gray-900">
                                {faq.question}
                                <svg
                                    className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="px-6 pb-6 text-gray-600 whitespace-pre-wrap">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
