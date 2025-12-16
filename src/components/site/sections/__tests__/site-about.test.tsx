import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteAboutSection } from "@/components/site/sections/site-about";

describe("SiteAboutSection", () => {
    it("renders section with title", () => {
        render(
            <SiteAboutSection bio="Minha biografia." primaryColor="#6366f1" />
        );

        expect(screen.getByText("Sobre mim")).toBeInTheDocument();
    });

    it("renders default text when bio is empty", () => {
        render(
            <SiteAboutSection bio="" primaryColor="#6366f1" />
        );

        // Should render default text
        expect(screen.getByText(/Psicólogo\(a\) comprometido/)).toBeInTheDocument();
    });

    it("renders bio content when provided", () => {
        render(
            <SiteAboutSection bio="Sou um psicólogo experiente." primaryColor="#6366f1" />
        );

        expect(screen.getByText("Sou um psicólogo experiente.")).toBeInTheDocument();
    });

    it("renders bio as HTML", () => {
        render(
            <SiteAboutSection
                bio="<p>Biografia com <strong>formatação</strong></p>"
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText(/formatação/)).toBeInTheDocument();
    });

    it("has section with id 'sobre'", () => {
        render(
            <SiteAboutSection bio="Bio content" primaryColor="#6366f1" />
        );

        const section = document.getElementById("sobre");
        expect(section).toBeInTheDocument();
    });
});
