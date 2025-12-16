import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFAQSection } from "@/components/site/sections/site-faq";

const mockFAQs = [
    { id: "1", question: "Primeira pergunta?", answer: "Primeira resposta." },
    { id: "2", question: "Segunda pergunta?", answer: "Segunda resposta." },
];

describe("SiteFAQSection", () => {
    it("renders null when faqs is empty", () => {
        const { container } = render(
            <SiteFAQSection faqs={[]} primaryColor="#6366f1" />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders null when faqs is undefined", () => {
        const { container } = render(
            // @ts-expect-error testing undefined prop
            <SiteFAQSection faqs={undefined} primaryColor="#6366f1" />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders section with title", () => {
        render(
            <SiteFAQSection faqs={mockFAQs} primaryColor="#6366f1" />
        );

        expect(screen.getByText("Perguntas Frequentes")).toBeInTheDocument();
    });

    it("renders all FAQ questions", () => {
        render(
            <SiteFAQSection faqs={mockFAQs} primaryColor="#6366f1" />
        );

        expect(screen.getByText("Primeira pergunta?")).toBeInTheDocument();
        expect(screen.getByText("Segunda pergunta?")).toBeInTheDocument();
    });

    it("renders all FAQ answers", () => {
        render(
            <SiteFAQSection faqs={mockFAQs} primaryColor="#6366f1" />
        );

        expect(screen.getByText("Primeira resposta.")).toBeInTheDocument();
        expect(screen.getByText("Segunda resposta.")).toBeInTheDocument();
    });

    it("applies primary color to title", () => {
        render(
            <SiteFAQSection faqs={mockFAQs} primaryColor="#ff0000" />
        );

        const title = screen.getByText("Perguntas Frequentes");
        expect(title).toHaveStyle({ color: "#ff0000" });
    });

    it("uses details/summary for accordion behavior", () => {
        render(
            <SiteFAQSection faqs={mockFAQs} primaryColor="#6366f1" />
        );

        const details = document.querySelectorAll("details");
        expect(details).toHaveLength(2);
    });
});
