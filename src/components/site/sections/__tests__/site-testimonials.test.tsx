import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteTestimonialsSection } from "@/components/site/sections/site-testimonials";

const mockTestimonials = [
    {
        id: "1",
        author_name: "João Silva",
        author_initials: "JS",
        content: "Excelente profissional!",
        rating: 5,
    },
    {
        id: "2",
        author_name: "Maria Santos",
        author_initials: "MS",
        content: "Muito atenciosa.",
        rating: 4,
    },
];

describe("SiteTestimonialsSection", () => {
    it("renders null when testimonials is empty", () => {
        const { container } = render(
            <SiteTestimonialsSection testimonials={[]} primaryColor="#6366f1" />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders null when testimonials is undefined", () => {
        const { container } = render(
            // @ts-expect-error testing undefined prop
            <SiteTestimonialsSection testimonials={undefined} primaryColor="#6366f1" />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders section with title", () => {
        render(
            <SiteTestimonialsSection testimonials={mockTestimonials} primaryColor="#6366f1" />
        );

        expect(screen.getByText("O que dizem sobre mim")).toBeInTheDocument();
    });

    it("renders testimonial content", () => {
        render(
            <SiteTestimonialsSection testimonials={mockTestimonials} primaryColor="#6366f1" />
        );

        expect(screen.getByText(/Excelente profissional/)).toBeInTheDocument();
        expect(screen.getByText(/Muito atenciosa/)).toBeInTheDocument();
    });

    it("renders author names", () => {
        render(
            <SiteTestimonialsSection testimonials={mockTestimonials} primaryColor="#6366f1" />
        );

        expect(screen.getByText("João Silva")).toBeInTheDocument();
        expect(screen.getByText("Maria Santos")).toBeInTheDocument();
    });

    it("renders author initials", () => {
        render(
            <SiteTestimonialsSection testimonials={mockTestimonials} primaryColor="#6366f1" />
        );

        expect(screen.getByText("JS")).toBeInTheDocument();
        expect(screen.getByText("MS")).toBeInTheDocument();
    });

    it("renders stars for each testimonial", () => {
        render(
            <SiteTestimonialsSection testimonials={mockTestimonials} primaryColor="#6366f1" />
        );

        // Check that testimonial cards exist
        const cards = document.querySelectorAll(".bg-gray-50.rounded-2xl");
        expect(cards).toHaveLength(2);
    });

    it("applies primary color to title", () => {
        render(
            <SiteTestimonialsSection testimonials={mockTestimonials} primaryColor="#ff0000" />
        );

        const title = screen.getByText("O que dizem sobre mim");
        expect(title).toHaveStyle({ color: "#ff0000" });
    });
});
