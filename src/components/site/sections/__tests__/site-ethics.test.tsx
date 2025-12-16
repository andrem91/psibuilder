import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteEthicsSection } from "@/components/site/sections/site-ethics";

describe("SiteEthicsSection", () => {
    it("renders null when showEthicsSection is false", () => {
        const { container } = render(
            <SiteEthicsSection
                showEthicsSection={false}
                ethicsContent="Conteúdo ético"
                primaryColor="#6366f1"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders null when ethicsContent is empty", () => {
        const { container } = render(
            <SiteEthicsSection
                showEthicsSection={true}
                ethicsContent=""
                primaryColor="#6366f1"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders null when ethicsContent is undefined", () => {
        const { container } = render(
            <SiteEthicsSection
                showEthicsSection={true}
                ethicsContent={undefined}
                primaryColor="#6366f1"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders section with title when enabled", () => {
        render(
            <SiteEthicsSection
                showEthicsSection={true}
                ethicsContent="Compromisso ético do profissional."
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("🤝 Compromisso Ético")).toBeInTheDocument();
    });

    it("renders ethics content", () => {
        render(
            <SiteEthicsSection
                showEthicsSection={true}
                ethicsContent="Seguimos o código de ética do CRP."
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Seguimos o código de ética do CRP.")).toBeInTheDocument();
    });

    it("applies primary color to title", () => {
        render(
            <SiteEthicsSection
                showEthicsSection={true}
                ethicsContent="Conteúdo"
                primaryColor="#ff0000"
            />
        );

        const title = screen.getByText("🤝 Compromisso Ético");
        expect(title).toHaveStyle({ color: "#ff0000" });
    });

    it("renders when showEthicsSection is undefined but has content", () => {
        render(
            <SiteEthicsSection
                ethicsContent="Conteúdo disponível"
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Conteúdo disponível")).toBeInTheDocument();
    });
});
