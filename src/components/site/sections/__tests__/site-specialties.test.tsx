import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteSpecialtiesSection } from "@/components/site/sections/site-specialties";

const mockSpecialtiesData = [
    { name: "Ansiedade", description: "Tratamento de ansiedade", icon: "brain" },
    { name: "Depressão", description: "Apoio para depressão", icon: "heart" },
];

describe("SiteSpecialtiesSection", () => {
    it("renders null when both specialties and specialtiesData are empty", () => {
        const { container } = render(
            <SiteSpecialtiesSection
                specialties={[]}
                specialtiesData={[]}
                primaryColor="#6366f1"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders null when both are undefined", () => {
        const { container } = render(
            <SiteSpecialtiesSection
                specialties={undefined}
                specialtiesData={undefined}
                primaryColor="#6366f1"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders section with title when has specialtiesData", () => {
        render(
            <SiteSpecialtiesSection
                specialtiesData={mockSpecialtiesData}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Áreas de Atuação")).toBeInTheDocument();
    });

    it("renders specialty names from specialtiesData", () => {
        render(
            <SiteSpecialtiesSection
                specialtiesData={mockSpecialtiesData}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Ansiedade")).toBeInTheDocument();
        expect(screen.getByText("Depressão")).toBeInTheDocument();
    });

    it("renders specialty descriptions", () => {
        render(
            <SiteSpecialtiesSection
                specialtiesData={mockSpecialtiesData}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Tratamento de ansiedade")).toBeInTheDocument();
        expect(screen.getByText("Apoio para depressão")).toBeInTheDocument();
    });

    it("falls back to specialties array when specialtiesData is empty", () => {
        render(
            <SiteSpecialtiesSection
                specialties={["Terapia de Casal", "Terapia Familiar"]}
                specialtiesData={[]}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Terapia de Casal")).toBeInTheDocument();
        expect(screen.getByText("Terapia Familiar")).toBeInTheDocument();
    });

    it("prefers specialtiesData over specialties when both are provided", () => {
        render(
            <SiteSpecialtiesSection
                specialties={["Fallback"]}
                specialtiesData={mockSpecialtiesData}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Ansiedade")).toBeInTheDocument();
        expect(screen.queryByText("Fallback")).not.toBeInTheDocument();
    });

    it("applies primary color to title", () => {
        render(
            <SiteSpecialtiesSection
                specialtiesData={mockSpecialtiesData}
                primaryColor="#ff0000"
            />
        );

        const title = screen.getByText("Áreas de Atuação");
        expect(title).toHaveStyle({ color: "#ff0000" });
    });
});
